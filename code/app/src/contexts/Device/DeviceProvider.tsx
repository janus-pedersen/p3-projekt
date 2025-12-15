import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DeviceContext,
  type LapsusDevice,
  type DeviceContextType,
  type LapsusAdvertisement,
} from "./DeviceContext";
import { BleClient } from "@capacitor-community/bluetooth-le";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
import { Geolocation } from "@capacitor/geolocation";
import { LocalNotifications } from "@capacitor/local-notifications";

const SERVICES = {
  BATTERY_SERVICE: {
    uuid: "0000180f-0000-1000-8000-00805f9b34fb",
    LEVEL: "00002a19-0000-1000-8000-00805f9b34fb",
  },
  FALL_DETECTION: {
    uuid: "5f9c2a60-8f9b-4e5b-bae0-bb2e7b9d2c4f",
    FALL: "0d1a6b9e-7c3f-4cb7-8a29-72d0b3df02ab",
    IMPACT: "ebf911a7-e385-49ef-a0f5-0133b3845bcf",
    MANUAL: "3a4b7c12-9fde-4b91-8c3a-1e2f4d6a8b9c",
  },
};

export function DeviceProvider(props: React.PropsWithChildren) {
  const [device, setDevice] = useState<LapsusDevice | undefined>();
  const state = useMemo<DeviceContextType["state"]>(() => {
    if (device) return "CONNECTED";
    return "DISCONNECTED";
  }, [device]);

  useEffect(() => {
    BleClient.initialize();
  }, []);

  const createDevice = useCallback(
    async (id: string): Promise<LapsusDevice> => {
      // Stop scanning before connecting — scanning can interfere with connect on some platforms
      try {
        await BleClient.stopLEScan();
      } catch (e) {
        // ignore if no scan was running; but log for diagnostics
        console.warn("stopLEScan() failed or no scan running:", e);
      }

      // Attempt connect with a timeout so we don't hang forever
      try {
        await Promise.race([
          BleClient.connect(id, () => {
            // disconnect listener: clear stored device
            setDevice(undefined);
            console.error("Device disconnected:", id);

            LocalNotifications.schedule({
              notifications: [
                {
                  title: "Device disconnected",
                  body: "Your wristband has disconnected.",
                  id: new Date().getTime(),
                },
              ],
            });
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Connect timeout")), 15000)
          ),
        ]);
      } catch (err) {
        console.error("Failed to connect to device", id, err);
        throw err;
      }

      const deviceInfo = await BleClient.getDevices([id]).then(
        (devices) => devices[0]
      );

      // Build device object and store in stat
      const lapsusDevice: LapsusDevice = {
        id: id,
        name: deviceInfo?.name || "Unknown",
        battery: async () => {
          try {
            const result = await BleClient.read(
              id,
              SERVICES.BATTERY_SERVICE.uuid,
              SERVICES.BATTERY_SERVICE.LEVEL
            );
            const batteryLevel = result ? result.getUint8(0) : 0;

            return batteryLevel;
          } catch (e) {
            console.warn("Failed to read battery level:", e);
            return -1;
          }
        },
        disconnect: async () => {
          try {
            await BleClient.disconnect(id);
          } catch (e) {
            console.warn("disconnect failed:", e);
          } finally {
            setDevice(undefined);
          }
        },
      };

      setDevice(lapsusDevice);

      // Start notifications, but don't let failures prevent returning the device; log for debugging
      try {
        const characteristics = [
          SERVICES.FALL_DETECTION.FALL,
          SERVICES.FALL_DETECTION.IMPACT,
          SERVICES.FALL_DETECTION.MANUAL,
        ];

        for (const char of characteristics) {
          const type = Object.keys(SERVICES.FALL_DETECTION).find(
            (key) =>
              SERVICES.FALL_DETECTION[
                key as keyof typeof SERVICES.FALL_DETECTION
              ] === char
          ) as keyof typeof SERVICES.FALL_DETECTION;

          await BleClient.startNotifications(
            id,
            SERVICES.FALL_DETECTION.uuid,
            char,
            async (value) => {
              // Handle incoming data

              await LocalNotifications.schedule({
                notifications: [
                  {
                    title: `${
                      type.charAt(0).toUpperCase() + type.slice(1)
                    } detected!`,
                    body: `Your wristband has detected a ${type} event, an alert has been sent to your relatives.`,
                    id: new Date().getTime(),
                  },
                ],
              });

              const position = await Geolocation.getCurrentPosition({
                timeout: 10000,
                enableHighAccuracy: true,
              });

              FirebaseFunctions.callByName({
                name: "alert",
                data: {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                  type,
                },
              })
                .then(() => {
                  console.log("Test alert sent successfully");
                })
                .catch((error) => {
                  console.error("Error sending test alert:", error);
                });

              console.log("Notification received:", value);
            }
          );
        }
      } catch (e) {
        console.warn("startNotifications failed:", e);
      }

      return lapsusDevice;
    },
    []
  );

  const listen = async (update: (devices: LapsusAdvertisement[]) => void) => {
    const ttl = 5000;
    let adverts = [] as (LapsusAdvertisement & { timestamp: number })[];

    BleClient.requestLEScan(
      {
        allowDuplicates: true,
        namePrefix: "Lapsus",
        services: [SERVICES.FALL_DETECTION.uuid],
      },
      (advert) => {
        adverts = [
          ...adverts.filter(
            (a) =>
              Date.now() - a.timestamp < ttl && a.id !== advert.device.deviceId
          ),
          {
            id: advert.device.deviceId,
            name: advert.device.name || "Unknown",
            rssi: advert.rssi ?? 0,
            timestamp: Date.now(),
            connect: async () => {
              const device = await createDevice(advert.device.deviceId);
              if (!device)
                throw new Error(
                  "Failed to create device, " + advert.device.deviceId
                );

              return device;
            },
          },
        ];
        update(adverts);
      }
    );

    const interval = setInterval(() => {
      adverts = adverts.filter((a) => Date.now() - a.timestamp < ttl);
      update(adverts);
    }, 1000);

    return () => {
      clearInterval(interval);
      BleClient.stopLEScan();
    };
  };

  return (
    <DeviceContext.Provider
      value={{
        device,
        state,
        listen,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
}
