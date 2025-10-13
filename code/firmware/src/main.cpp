#include <Arduino.h>

int counter = 0;

void setup()
{
    // put your setup code here, to run once:

    Serial.begin(9600);
    Serial.println("Hello, World!");
}

void loop()
{
    // put your main code here, to run repeatedly:

    Serial.print("Counter: ");
    Serial.println(counter++);
    delay(1000);
}
