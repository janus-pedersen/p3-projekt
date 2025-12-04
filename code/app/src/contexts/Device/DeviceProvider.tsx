import { useCallback, useMemo, useState } from "react";
import {
  DeviceContext,
  type LapsusDevice,
  type DeviceContextType,
  type LapsusAdvertisement,
} from "./DeviceContext";
import { BleClient } from "@capacitor-community/bluetooth-le";

const SERVICES = {
  FALL_DETECTION: {
    uuid: "5f9c2a60-8f9b-4e5b-bae0-bb2e7b9d2c4f",
    WRITE: "0d1a6b9e-7c3f-4cb7-8a29-72d0b3df02ab",
    READ: "b1d4a2a3-c68d-4a1f-9328-7f1b3db23a1c",
  },
};

export function DeviceProvider(props: React.PropsWithChildren) {
  const [device, setDevice] = useState<LapsusDevice | undefined>();
  const state = useMemo<DeviceContextType["state"]>(() => {
    if (device) return "CONNECTED";
    return "DISCONNECTED";
  }, [device]);

  const createDevice = useCallback(
    async (id: string): Promise<LapsusDevice> => {
      await BleClient.initialize();

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

      // Build device object and store in state
      const lapsusDevice: LapsusDevice = {
        id: id,
        name: deviceInfo?.name || "Unknown",
        battery: 100,
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
        await BleClient.startNotifications(
          id,
          SERVICES.FALL_DETECTION.uuid,
          SERVICES.FALL_DETECTION.READ,
          async (value) => {
            // Handle incoming data
            console.log("Notification received:", value);
          }
        );
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

    await BleClient.initialize();
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
