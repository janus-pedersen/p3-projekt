#include <NimBLEDevice.h>
#include <Wire.h>
#include "SensorQMI8658.hpp"

#define SERVICE_UUID "5f9c2a60-8f9b-4e5b-bae0-bb2e7b9d2c4f"
#define FALL_CHARACTERISTIC_UUID "0d1a6b9e-7c3f-4cb7-8a29-72d0b3df02ab"

#define I2C_SDA 8  // Display Wire SDA Pin
#define I2C_SCL 7  // Display Wire SCL Pin

#define LED_BL 6 // Display backlight

// Battery enable pin
#define BAT_EN 15
#define BAT_V_PIN 0

// Power supply voltage of ESP32-S3 (unit: volts)
#define VREF 3.3
// Resistance value of the first resistor (unit: ohms)
#define R1 200000.0
// Resistance value of the second resistor (unit: ohms)
#define R2 100000.0

unsigned long lastsBat = millis();

SensorQMI8658 qmi;


bool freeFall, impactDetected;
int freeFallTime, impactTime;

NimBLECharacteristic *pCharacteristicFall;
NimBLECharacteristic *pBattCharacteristic;

void setup() {
  Serial.begin(115200);
  Serial.println("Start");

  // Latch the battery pin to high, to keep the battery enabled
  pinMode(BAT_EN, OUTPUT);
  digitalWrite(BAT_EN, HIGH);

  // Keep the display off to save power
  pinMode(LED_BL, OUTPUT);
  digitalWrite(LED_BL, LOW);

  // uint8_t id8 = ESP.getEfuseMac() & 0xFF;
  // Create a semi-unique name with the device's chip id (truncated)
  std::string name = "Lapsus " + std::to_string(ESP.getEfuseMac() & 0xFF);
  NimBLEDevice::init(name);
  
  NimBLEServer *pServer = NimBLEDevice::createServer();
  NimBLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristicFall = pService->createCharacteristic(FALL_CHARACTERISTIC_UUID, NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::WRITE | NIMBLE_PROPERTY::NOTIFY);
  pCharacteristicFall->setValue(0);
  pService->start();

  NimBLEService *pBattService = pServer->createService("180F"); // Battery service
  pBattCharacteristic = pBattService->createCharacteristic("2A19", NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY);
  pBattCharacteristic->setValue((uint8_t)getBatteryP());
  pBattService->start();


  NimBLEAdvertising *pAdvertising = NimBLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->addServiceUUID("180F");
  pAdvertising->setName(name);
  pAdvertising->start();

  Serial.println("BLE server started and advertising");

  bool ret = false;
  ret = qmi.begin(Wire, QMI8658_L_SLAVE_ADDRESS, I2C_SDA, I2C_SCL);
  if (!ret) {
    Serial.println("Failed to find QMI8658 - check your wiring!");
    while (1) {
      delay(1000);
    }
  }
  
  /* Get chip id*/
  Serial.print("Device ID:");
  Serial.println(qmi.getChipID(), HEX);


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
    SensorQMI8658::ACC_ODR_1000Hz,
    /*
        *  LPF_MODE_0     //2.66% of ODR
        *  LPF_MODE_1     //3.63% of ODR
        *  LPF_MODE_2     //5.39% of ODR
        *  LPF_MODE_3     //13.37% of ODR
        *  LPF_OFF        // OFF Low-Pass Fitter
        * */
    SensorQMI8658::LPF_MODE_0);

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

      float mag = sqrt(acc.x*acc.x + acc.y*acc.y + acc.z*acc.z);
      unsigned long now = millis();

      // Free-fall detection
      if (mag < 0.45) {
        // Serial.println("Free-fall detection");
        freeFall = true;
        freeFallTime = now;
      }

      // Impact detection
      if (freeFall && mag > 3 && (now - freeFallTime) < 300) {
        // Serial.println("Impact detection");
        impactDetected = true;
        impactTime = now;
        freeFall = false;
      }

      // Stillness detection
      if (impactDetected && mag < 0.8 && (now - impactTime) > 500) {
        Serial.println("FALL DETECTED!");
        impactDetected = false;
        pCharacteristicFall->setValue(1);
      }
    }
  }


  if((millis() - lastsBat) > 30000) {
    // Report battery charge every 30 seconds


    float f = getBatteryP();                  // 0–100 float
    uint8_t lvl = (uint8_t)f;       // BLE Battery Level expects a u8

    pBattCharacteristic->setValue(lvl);

    lastsBat = millis();
  }
}

float getBatteryP() {
  float minV = 2.0; // The minimum expected voltage of the battery
  float maxV = 3.3; // The maximum expected voltage

  float v = getBatteryV();

  return (v - minV) / (maxV - minV) * 100;
}

float getBatteryV() {
   // Read ADC value
  int adcValue = analogRead(BAT_V_PIN);

  // Convert to voltage
  float voltage = (float)adcValue * (VREF / 4095.0);

  // Apply the voltage divider formula to calculate the actual voltage
  float actualVoltage = voltage * ((R1 + R2) / R2);

  // Print the actual voltage
  Serial.print("Actual Voltage: ");
  Serial.print(actualVoltage);
  Serial.println(" V");

  return actualVoltage;
}
