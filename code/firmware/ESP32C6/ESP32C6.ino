/**
 * Lapsus wristband firmware
 */

#include <Arduino.h>
#include <NimBLEDevice.h>
#include "OneButton.h"

#include <math.h>
#include <Wire.h>
#include "SensorQMI8658.hpp"

#define ALERT_SERVICE_UUID "5f9c2a60-8f9b-4e5b-bae0-bb2e7b9d2c4f"
#define FALL_CHARACTERISTIC_UUID "0d1a6b9e-7c3f-4cb7-8a29-72d0b3df02ab"
#define IMPACT_CHARACTERISTIC_UUID "ebf911a7-e385-49ef-a0f5-0133b3845bcf"
#define BUTTON_CHARACTERISTIC_UUID "3a4b7c12-9fde-4b91-8c3a-1e2f4d6a8b9c"
#define BATT_CHARACTERISTIC_UUID "180F"

#define I2C_SDA 8  // Display Wire SDA Pin
#define I2C_SCL 7  // Display Wire SCL Pin

#define LED_BL 6  // Display backlight

static NimBLEServer* pServer;
static NimBLEService *pServiceAlert, *pServiceBatt;
static NimBLECharacteristic *pCharacteristicFall, *pCharacteristicImpact, *pCharacteristicButton, *pCharacteristicBatt;

SensorQMI8658 qmi;

unsigned long lastHardImpactTime = 0;
volatile bool alertBtnPressed = false;

enum class FallState : uint8_t {
  Idle,
  FreeFall,
  Impact,
};

// constexpr = this value can be evaluated at compile time (saves memory)
static constexpr float FREE_FALL_G = 0.45f;
static constexpr float IMPACT_G = 4.0f;
static constexpr float HARD_IMPACT_G = 7.0f;
static constexpr float REST_MIN_G = 0.85f;
static constexpr float REST_MAX_G = 1.25f;

static constexpr uint32_t FREE_FALL_MAX_MS = 300;
static constexpr uint32_t IMPACT_TO_REST_IGNORE_MS = 500;
static constexpr uint32_t REST_CONFIRM_MS = 300;
static constexpr uint32_t IMPACT_TIMEOUT_MS = 3000;

static constexpr float REST_JERK_MAX_G2 = 0.35f;  // max | |a|^2 delta | during rest

FallState fallState = FallState::Idle;
uint32_t freeFallTime = 0;
uint32_t impactTime = 0;
uint32_t restStableStartTime = 0;
float lastMag2 = NAN;


/** Battery enable pin */
#define BAT_EN 15
#define BAT_ADC_PIN 0
#define BAT_INTERVAL 60000  // Every 60 sec
unsigned long last_bat = millis();

/** Battery level estimation stuff */
#define VREF 3.2
#define R1 200000.0
#define R2 100000.0
#define V_MIN 2.0
#define V_MAX 3.8

/** Emergency button */
#define BTN_PIN 9  // The "BOOT" button, because it's the middle one
OneButton EmergencyButton(BTN_PIN, true);

// /**  None of these are required as they will be handled by the library with defaults. **
//  **                       Remove as you see fit for your needs                        */
class ServerCallbacks : public NimBLEServerCallbacks {
  void onConnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo) override {
    Serial.printf("Client address: %s\n", connInfo.getAddress().toString().c_str());
  }

  void onDisconnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo, int reason) override {
    Serial.printf("Client disconnected - start advertising\n");
    NimBLEDevice::startAdvertising();
  }
} serverCallbacks;

void setup(void) {
  Serial.begin(115200);
  //Serial.end(); // Disable debugging for for powersaving
  Serial.printf("Starting NimBLE Server\n");

  /** Emergency button listener */
  EmergencyButton.attachLongPressStart(emergencyPress);

  /** Latch the battery enable pin to always stay powered on */
  pinMode(BAT_EN, OUTPUT);
  digitalWrite(BAT_EN, HIGH);
  delay(5);

  // Keep the display off to save power
  pinMode(LED_BL, OUTPUT);
  digitalWrite(LED_BL, LOW);
  delay(5);

  /** Initialize NimBLE and set the device name */
  uint64_t mac = ESP.getEfuseMac();
  char name[20];
  snprintf(name, sizeof(name), "Lapsus-%04X", (uint16_t)mac);
  NimBLEDevice::init(name);

  pServer = NimBLEDevice::createServer();
  pServer->setCallbacks(&serverCallbacks);

  /** Create the battery service and characteristics (using the default / correct uuids) */
  pServiceBatt = pServer->createService("180F");
  pCharacteristicBatt = pServiceBatt->createCharacteristic("2A19", NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY);

  // pCharacteristicBatt->setCallbacks(&chrCallbacks);
  pCharacteristicBatt->setValue((uint8_t)getBatteryP());

  pServiceBatt->start();

  /** Create the alert service responsible for alerting the phone for different approach */
  pServiceAlert = pServer->createService(ALERT_SERVICE_UUID);
  pCharacteristicFall = pServiceAlert->createCharacteristic(FALL_CHARACTERISTIC_UUID, NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::WRITE | NIMBLE_PROPERTY::NOTIFY);
  pCharacteristicFall->setValue((uint8_t)0);

  pCharacteristicImpact = pServiceAlert->createCharacteristic(IMPACT_CHARACTERISTIC_UUID, NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::WRITE | NIMBLE_PROPERTY::NOTIFY);
  pCharacteristicImpact->setValue((uint8_t)0);

  pCharacteristicButton = pServiceAlert->createCharacteristic(BUTTON_CHARACTERISTIC_UUID, NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::WRITE | NIMBLE_PROPERTY::NOTIFY);
  pCharacteristicButton->setValue((uint8_t)0);

  pServiceAlert->start();

  delay(100);

  /** Create an advertising instance and add the services to the advertised data */
  NimBLEAdvertising* pAdvertising = pServer->getAdvertising();
  pAdvertising->addServiceUUID(ALERT_SERVICE_UUID);
  pAdvertising->addServiceUUID(BATT_CHARACTERISTIC_UUID);
  pAdvertising->start();

  Serial.printf("Advertising Started\n");


  /** Sensor setup */
  bool ret = false;
  ret = qmi.begin(Wire, QMI8658_L_SLAVE_ADDRESS, I2C_SDA, I2C_SCL);
  if (!ret) {
    Serial.println("Failed to find QMI8658 - check your wiring!");
    while (1) {
      delay(1000);
    }
  }

  if (qmi.selfTestAccel()) {
    Serial.println("Accelerometer self-test successful");
  } else {
    Serial.println("Accelerometer self-test failed!");
  }

  if (qmi.selfTestGyro()) {
    Serial.println("Gyroscope self-test successful");
  } else {
    Serial.println("Gyroscope self-test failed!");
  }

  qmi.configAccelerometer(
    /*
         * ACC_RANGE_2G
         * ACC_RANGE_4G
         * ACC_RANGE_8G
         * ACC_RANGE_16G
         * */
    SensorQMI8658::ACC_RANGE_4G,
    /*
         * ACC_ODR_1000H
         * ACC_ODR_500Hz
         * ACC_ODR_250Hz
         * ACC_ODR_125Hz
         * ACC_ODR_62_5Hz
         * ACC_ODR_31_25Hz
         * ACC_ODR_LOWPOWER_128Hz
         * ACC_ODR_LOWPOWER_21Hz
         * ACC_ODR_LOWPOWER_11Hz
         * ACC_ODR_LOWPOWER_3H
        * */
    SensorQMI8658::ACC_ODR_LOWPOWER_128Hz,
    /*
        *  LPF_MODE_0     //2.66% of ODR
        *  LPF_MODE_1     //3.63% of ODR
        *  LPF_MODE_2     //5.39% of ODR
        *  LPF_MODE_3     //13.37% of ODR
        *  LPF_OFF        // OFF Low-Pass Fitter
        * */
    SensorQMI8658::LPF_MODE_2);

  qmi.configGyroscope(
    /*
        * GYR_RANGE_16DPS
        * GYR_RANGE_32DPS
        * GYR_RANGE_64DPS
        * GYR_RANGE_128DPS
        * GYR_RANGE_256DPS
        * GYR_RANGE_512DPS
        * GYR_RANGE_1024DPS
        * */
    SensorQMI8658::GYR_RANGE_64DPS,
    /*
         * GYR_ODR_7174_4Hz
         * GYR_ODR_3587_2Hz
         * GYR_ODR_1793_6Hz
         * GYR_ODR_896_8Hz
         * GYR_ODR_448_4Hz
         * GYR_ODR_224_2Hz
         * GYR_ODR_112_1Hz
         * GYR_ODR_56_05Hz
         * GYR_ODR_28_025H
         * */
    SensorQMI8658::GYR_ODR_896_8Hz,
    /*
        *  LPF_MODE_0     //2.66% of ODR
        *  LPF_MODE_1     //3.63% of ODR
        *  LPF_MODE_2     //5.39% of ODR
        *  LPF_MODE_3     //13.37% of ODR
        *  LPF_OFF        // OFF Low-Pass Fitter
        * */
    SensorQMI8658::LPF_MODE_3);

  /*
  * If both the accelerometer and gyroscope sensors are turned on at the same time,
  * the output frequency will be based on the gyroscope output frequency.
  * The example configuration is 896.8HZ output frequency,
  * so the acceleration output frequency is also limited to 896.8HZ
  * */
  //qmi.enableGyroscope();
  qmi.enableAccelerometer();

  // Print register configuration information
  qmi.dumpCtrlRegister();

  Serial.println("Read data now...");
}

void loop() {
  IMUdata acc;
  //IMUdata gyr;
  if (qmi.getDataReady()) {
    if (qmi.getAccelerometer(acc.x, acc.y, acc.z)) {
      // Print to serial plotter
      // Serial.printf("%f %f %f\n", acc.x, acc.y, acc.z);

      float mag2 = acc.x * acc.x + acc.y * acc.y + acc.z * acc.z;
      unsigned long now = millis();

      // Fall detection state machine:
      // 1) brief free-fall (|a| drops), 2) impact spike, 3) rest (|a| ~ 1g and low variation).
      const float freeFallThr2 = FREE_FALL_G * FREE_FALL_G;
      const float impactThr2 = IMPACT_G * IMPACT_G;
      const float restMin2 = REST_MIN_G * REST_MIN_G;
      const float restMax2 = REST_MAX_G * REST_MAX_G;

      const float mag2Delta = isnan(lastMag2) ? INFINITY : fabsf(mag2 - lastMag2);

      switch (fallState) {
        case FallState::Idle:
          // IDLE: wait for a brief drop in acceleration magnitude (near-weightlessness).
          if (mag2 < freeFallThr2) {
            fallState = FallState::FreeFall;
            freeFallTime = now;
          }
          break;

        case FallState::FreeFall:
          // FREE-FALL: must see an impact spike shortly after the free-fall trigger,
          // otherwise reset to IDLE to avoid "stuck" free-fall on low-g motion.
          if (mag2 > impactThr2) {
            fallState = FallState::Impact;
            impactTime = now;
            restStableStartTime = 0;
          } else if ((now - freeFallTime) > FREE_FALL_MAX_MS) {
            fallState = FallState::Idle;
          }
          break;

        case FallState::Impact: {
          // IMPACT: after the spike, confirm the person is "down" by looking for a stable
          // resting magnitude (~1g) with low variation for REST_CONFIRM_MS.
          const uint32_t sinceImpact = now - impactTime;
          if (sinceImpact > IMPACT_TIMEOUT_MS) {
            // Too long without reaching rest: abandon this sequence.
            fallState = FallState::Idle;
            restStableStartTime = 0;
            break;
          }

          if (sinceImpact < IMPACT_TO_REST_IGNORE_MS) {
            // Ignore the immediate post-impact ringing/vibration before checking rest.
            restStableStartTime = 0;
            break;
          }

          const bool isRestMagnitude = (mag2 >= restMin2) && (mag2 <= restMax2);
          const bool isLowJerk = mag2Delta <= REST_JERK_MAX_G2;
          if (isRestMagnitude && isLowJerk) {
            // Start (or continue) timing a stable "rest" period.
            if (restStableStartTime == 0) restStableStartTime = now;
            if ((now - restStableStartTime) >= REST_CONFIRM_MS) {
              Serial.println("FALL DETECTED!");
              pCharacteristicFall->setValue((uint8_t)1);
              pCharacteristicFall->notify();

              // Fall sequence completed; reset for the next detection.
              fallState = FallState::Idle;
              restStableStartTime = 0;
            }
          } else {
            // Not stable rest yet; restart the confirmation timer.
            restStableStartTime = 0;
          }
          break;
        }
      }

      lastMag2 = mag2;

      // Hard impact detection
      if (mag2 > HARD_IMPACT_G * HARD_IMPACT_G && (now - lastHardImpactTime) > 1000) {
        Serial.println("HARD IMPACT DETECTED!");
        pCharacteristicImpact->setValue((uint8_t)1);
        pCharacteristicImpact->notify();
        
        lastHardImpactTime = now;
      }
    }
  }

  EmergencyButton.tick();

  if(last_bat + BAT_INTERVAL < millis()) {
    last_bat = millis();
    pCharacteristicBatt->setValue((uint8_t)getBatteryP());
    pCharacteristicBatt->notify();
  }

  if (alertBtnPressed) {
    alertBtnPressed = false;
    Serial.println("EMERGENCY BUTTON PRESSED!");
    pCharacteristicButton->setValue((uint8_t)1);
    pCharacteristicButton->notify();
  }
}

/** Called when the emergency button is pressed */
void emergencyPress() {
  alertBtnPressed = true;
}

/** Gets the battery level as a percentage */
float getBatteryP() {
  float v = getBatteryV();
  float p = (v - V_MIN) / (V_MAX - V_MIN) * 100;

  if(p > 100) p = 100; // Clamp it for good measure

  return p;
}

/** Get the estimated battery voltage */
float getBatteryV() {
  uint32_t sum = 0;
  for(int i = 0; i < 32; i++) {
    sum += analogReadMilliVolts(BAT_ADC_PIN);
  }

  float mv = sum / 32;

  return 3 * mv / 1000.0;
}
