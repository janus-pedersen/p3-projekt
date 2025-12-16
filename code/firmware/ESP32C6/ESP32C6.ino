
/**
 * Lapsus wristband firmware
 */

#include <Arduino.h>
#include <NimBLEDevice.h>
#include "OneButton.h"

#define ALERT_SERVICE_UUID "5f9c2a60-8f9b-4e5b-bae0-bb2e7b9d2c4f"
#define FALL_CHARACTERISTIC_UUID "0d1a6b9e-7c3f-4cb7-8a29-72d0b3df02ab"
#define IMPACT_CHARACTERISTIC_UUID "ebf911a7-e385-49ef-a0f5-0133b3845bcf"
#define BUTTON_CHARACTERISTIC_UUID "3a4b7c12-9fde-4b91-8c3a-1e2f4d6a8b9c"
#define BATT_CHARACTERISTIC_UUID "180F"

static NimBLEServer* pServer;
static NimBLEService *pServiceAlert, *pServiceBatt;
static NimBLECharacteristic *pCharacteristicFall, *pCharacteristicImpact, *pCharacteristicButton, *pCharacteristicBatt;

bool alertBtnPressed = false;


/** Battery enable pin */
#define BAT_EN 15
#define BAT_V_PIN 0
#define BAT_INTERVAL 30000  // Every 30 minutes
unsigned long last_bat = millis();

/** Battery level estimation stuff */
#define VREF 3.3
#define R1 200000.0
#define R2 100000.0
#define V_MIN 2.0

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

// /** Handler class for characteristic actions */
// class CharacteristicCallbacks : public NimBLECharacteristicCallbacks {
//     void onRead(NimBLECharacteristic* pCharacteristic, NimBLEConnInfo& connInfo) override {
//         Serial.printf("%s : onRead(), value: %s\n",
//                       pCharacteristic->getUUID().toString().c_str(),
//                       pCharacteristic->getValue().c_str());
//     }

//     void onWrite(NimBLECharacteristic* pCharacteristic, NimBLEConnInfo& connInfo) override {
//         Serial.printf("%s : onWrite(), value: %s\n",
//                       pCharacteristic->getUUID().toString().c_str(),
//                       pCharacteristic->getValue().c_str());
//     }

//     /**
//      *  The value returned in code is the NimBLE host return code.
//      */
//     void onStatus(NimBLECharacteristic* pCharacteristic, int code) override {
//         Serial.printf("Notification/Indication return code: %d, %s\n", code, NimBLEUtils::returnCodeToString(code));
//     }

//     /** Peer subscribed to notifications/indications */
//     void onSubscribe(NimBLECharacteristic* pCharacteristic, NimBLEConnInfo& connInfo, uint16_t subValue) override {
//         std::string str  = "Client ID: ";
//         str             += connInfo.getConnHandle();
//         str             += " Address: ";
//         str             += connInfo.getAddress().toString();
//         if (subValue == 0) {
//             str += " Unsubscribed to ";
//         } else if (subValue == 1) {
//             str += " Subscribed to notifications for ";
//         } else if (subValue == 2) {
//             str += " Subscribed to indications for ";
//         } else if (subValue == 3) {
//             str += " Subscribed to notifications and indications for ";
//         }
//         str += std::string(pCharacteristic->getUUID());

//         Serial.printf("%s\n", str.c_str());
//     }
// } chrCallbacks;

// /** Handler class for descriptor actions */
// class DescriptorCallbacks : public NimBLEDescriptorCallbacks {
//     void onWrite(NimBLEDescriptor* pDescriptor, NimBLEConnInfo& connInfo) override {
//         std::string dscVal = pDescriptor->getValue();
//         Serial.printf("Descriptor written value: %s\n", dscVal.c_str());
//     }

//     void onRead(NimBLEDescriptor* pDescriptor, NimBLEConnInfo& connInfo) override {
//         Serial.printf("%s Descriptor read\n", pDescriptor->getUUID().toString().c_str());
//     }
// } dscCallbacks;

void setup(void) {
  Serial.begin(115200);
  Serial.printf("Starting NimBLE Server\n");

  /** Emergency button listener */
  EmergencyButton.attachLongPressStart(emergencyPress);

  /** Latch the battery enable pin to always stay powered on */
  pinMode(BAT_EN, OUTPUT);
  digitalWrite(BAT_EN, HIGH);

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
  pAdvertising->start();

  Serial.printf("Advertising Started\n");
}

void loop() {
  EmergencyButton.tick();

  /** Loop here and send notifications to connected peers */
  // delay(2000);

  // if (pServer->getConnectedCount()) {
  //     pCharacteristicButton->notify();
  // }

  if (last_bat + BAT_INTERVAL > millis()) {
    last_bat = millis();
    pCharacteristicBatt->setValue((uint8_t)getBatteryP());
    pCharacteristicBatt->notify();
  }


  if (alertBtnPressed) {
    alertBtnPressed = false;
    pCharacteristicButton->setValue((uint8_t)1);
    pCharacteristicButton->notify();
  }
}

/** Called when the emergency button is pressed */
void emergencyPress() {
  Serial.println("Emergency button pressed!");
  alertBtnPressed = true;
}

/** Gets the battery level as a percentage */
float getBatteryP() {
  float v = getBatteryV();
  float p = (v - V_MIN) / (VREF - V_MIN) * 100;

  Serial.print(v);
  Serial.print(" = ");
  Serial.print(p);
  Serial.println("%");

  return p;
}

/** Get the estimated battery voltage */
float getBatteryV() {
  // Read ADC value
  int adcValue = analogRead(BAT_V_PIN);

  // Convert to voltage
  float voltage = (float)adcValue * (VREF / 4095.0);

  // Apply the voltage divider formula to calculate the actual voltage
  float actualVoltage = voltage * ((R1 + R2) / R2);

  //   Print the actual voltage
  Serial.print("Actual Voltage: ");
  Serial.print(actualVoltage);
  Serial.println(" V");

  return actualVoltage;
}