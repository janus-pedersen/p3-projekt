#include <NimBLEDevice.h>


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

  NimBLEDevice::init("Test ESP32");
  
  NimBLEServer *pServer = NimBLEDevice::createServer();
  NimBLEService *pService = pServer->createService("ABCD");
  NimBLECharacteristic *pCharacteristic1 = pService->createCharacteristic("1234", NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::WRITE);
  pCharacteristic2 = pService->createCharacteristic("ABCD", NIMBLE_PROPERTY::READ);
  
  pCharacteristic1->setValue(1000);

  pCharacteristic2->setValue(number);

  pCharacteristic1->setCallbacks(new MyCharacteristicCallbacks());

  pService->start();

  NimBLEAdvertising *pAdvertising = NimBLEDevice::getAdvertising();
  pAdvertising->addServiceUUID("ABCD");
  pAdvertising->setName("Test ESP32");
  pAdvertising->start();

  Serial.println("BLE server started and advertising");
}

void loop() {
  number++;
  pCharacteristic2->setValue(number);
  delay(numDelay);
}