#include <NimBLEDevice.h>

void setup() {
  NimBLEDevice::init("Test ESP32");
  
  NimBLEServer *pServer = NimBLEDevice::createServer();
  NimBLEService *pService = pServer->createService("ABCD");
  NimBLECharacteristic *pCharacteristic = pService->createCharacteristic("1234");
  
  pService->start();
  pCharacteristic->setValue("Hello BLE");

  NimBLEAdvertising *pAdvertising = NimBLEDevice::getAdvertising();
  pAdvertising->addServiceUUID("ABCD");
  pAdvertising->setName("Test ESP32");
  pAdvertising->start();
}

void loop() {
}
