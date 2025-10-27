import { useMemo, useState } from "react";
import {
  DeviceContext,
  type LapsusDevice,
  type DeviceContextType,
  type LapsusAdvertisement,
} from "./DeviceContext";
import { BleClient } from "@capacitor-community/bluetooth-le";

export function DeviceProvider(props: React.PropsWithChildren) {
  const [device, setDevice] = useState<LapsusDevice | undefined>();
  const state = useMemo<DeviceContextType["state"]>(() => {
    if (device) return "CONNECTED";
    return "DISCONNECTED";
  }, [device]);

  const listen = (update: (devices: LapsusAdvertisement[]) => void) => {
    const ttl = 5000;
    let adverts = [] as (LapsusAdvertisement & { timestamp: number })[];

    BleClient.initialize();
    BleClient.requestLEScan(
      {
        allowDuplicates: true,
        namePrefix: "Lapsus",
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
              await BleClient.connect(advert.device.deviceId, () => {
                setDevice(undefined);
              });

              const device = {
                id: advert.device.deviceId,
                battery: 100,
                disconnect: async () => {
                  await BleClient.disconnect(advert.device.deviceId);
                  setDevice(undefined);
                },
              };
              setDevice(device);

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
