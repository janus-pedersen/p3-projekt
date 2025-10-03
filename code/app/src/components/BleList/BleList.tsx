import { BleClient, ScanMode } from "@capacitor-community/bluetooth-le";
import { Group, Paper, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import SignalStrength from "../SignalStrength/SignalStrength";

export interface BleDevice {
  name: string;
  id: string;
  timestamp: Date;
  rssi?: number;
}

export interface BleListProps {
  timeout?: number;
}

export function BleList(props: BleListProps) {
  const [devices, setDevices] = useState<BleDevice[]>([]);

  useEffect(() => {
    (async () => {
      await BleClient.initialize({ androidNeverForLocation: true });

      BleClient.requestLEScan(
        {
          allowDuplicates: true,
          scanMode: ScanMode.SCAN_MODE_LOW_LATENCY,
        },
        (device) => {
          if (!device.device.name) return;

          setDevices((oldDevices) =>
            [
              ...oldDevices.filter((d) => d.id !== device.device.deviceId),
              {
                id: device.device.deviceId,
                name:
                  device.device.name ??
                  device.localName ??
                  device.device.deviceId,
                timestamp: new Date(),
                rssi: device.rssi,
              },
            ].sort((a, b) => a.name.localeCompare(b.name))
          );
        }
      );
    })();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDevices((oldDevices) =>
        oldDevices
          .filter((device) => {
            const now = new Date();
            const diff = now.getTime() - device.timestamp.getTime();
            return diff < (props.timeout ?? 2500);
          })
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      );
    }, props.timeout ?? 2500);

    return () => clearInterval(timer);
  }, [props.timeout]);

  return (
    <>
      <Paper h={"100%"} withBorder p={"md"} shadow={"sm"} pos={"relative"}>
        <Stack pb={"xl"} mah={"100%"} gap={"xs"} style={{ overflowY: "auto" }}>
          {devices.map((device) => (
            <Group justify={"space-between"} key={device.id}>
              <Text size={"sm"}>{device.name}</Text>

              <SignalStrength rssi={device.rssi} />
            </Group>
          ))}
        </Stack>

        <Text
          pos={"absolute"}
          size={"xs"}
          c={"dimmed"}
          top={"100%"}
          left={"100%"}
          style={{ transform: "translate(-100%, -100%)" }}
          p={"sm"}
          w={"100%"}
          ta={"right"}
        >
          {devices.length} device{devices.length !== 1 ? "s" : ""} found
        </Text>
      </Paper>
    </>
  );
}
