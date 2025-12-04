#include <NimBLEDevice.h>

#define SERVICE_UUID "5f9c2a60-8f9b-4e5b-bae0-bb2e7b9d2c4f"
#define WRITE_CHARACTERISTIC_UUID "0d1a6b9e-7c3f-4cb7-8a29-72d0b3df02ab"
#define READ_CHARACTERISTIC_UUID "b1d4a2a3-c68d-4a1f-9328-7f1b3db23a1c"

int number = 0;
int numDelay = 1000;
NimBLECharacteristic* pCharacteristic1;
NimBLECharacteristic* pCharacteristic2;

// Run when pCharacteristic1 changes. Remember to use UINT 32 (little-endian)
class MyCharacteristicCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pCharacteristic, NimBLEConnInfo &connInfo) override {
    auto valueContainer = pCharacteristic->getValue();

    size_t len = valueContainer.size();
    const uint8_t* data = valueContainer.data();

    if (len >= sizeof(int)) {
      memcpy(&numDelay, data, sizeof(int));
    }

    Serial.print("Delay written: ");
    Serial.println(numDelay);
  }
};

void setup() {
  Serial.begin(115200);
  Serial.println("Start");

  // uint8_t id8 = ESP.getEfuseMac() & 0xFF;
  // Create a semi-unique name with the device's chip id (truncated)
  std::string name = "Lapsus " + std::to_string(ESP.getEfuseMac() & 0xFF);
  NimBLEDevice::init(name);
  
  NimBLEServer *pServer = NimBLEDevice::createServer();
  NimBLEService *pService = pServer->createService(SERVICE_UUID);
  NimBLECharacteristic *pCharacteristic1 = pService->createCharacteristic(WRITE_CHARACTERISTIC_UUID, NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::WRITE);
  pCharacteristic2 = pService->createCharacteristic(READ_CHARACTERISTIC_UUID, NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY);
  
  pCharacteristic1->setValue(1000);

  pCharacteristic2->setValue(number);

  pCharacteristic1->setCallbacks(new MyCharacteristicCallbacks());

  pService->start();

  NimBLEAdvertising *pAdvertising = NimBLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setName(name);
  pAdvertising->start();

  Serial.println("BLE server started and advertising");
}

void loop() {
  number++;
  pCharacteristic2->setValue(number);
  pCharacteristic2->notify();
  delay(numDelay);
}