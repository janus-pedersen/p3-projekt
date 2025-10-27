import { Box, Button, Group, Paper, Text } from "@mantine/core";
import { Header } from "../../components/Header/Header";
import {
  useDevice,
  type LapsusAdvertisement,
} from "../../contexts/Device/DeviceContext";
import { useEffect, useState } from "react";

export function DevicePage() {
  const { device, listen } = useDevice();

  const [adverts, setAdverts] = useState<LapsusAdvertisement[]>([]);

  useEffect(() => {
    if (device) return;

    const unsubscribe = listen((devices) => {
      setAdverts(devices);
    });

    return () => {
      unsubscribe();
    };
  }, [device, listen]);

  return (
    <>
      {device ? (
        <>
          <Box></Box>
        </>
      ) : (
        <>
          <Header
            title={"Device"}
            subtitle={"Manage your device settings here."}
          />
          <Paper withBorder>
            <Text p="md">No device connected</Text>
            {adverts
              .sort((a, b) => b.id.localeCompare(a.id))
              .map((advert) => (
                <Group w={"100%"} px={"xl"} justify={"space-between"}>
                  <Group>
                    <Text>{advert.name}</Text>
                    <Text c={"dimmed"} size="xs">
                      {advert.rssi}
                    </Text>
                  </Group>

                  <Button size="xs" onClick={() => advert.connect()}>
                    Connect
                  </Button>
                </Group>
              ))}
            <Text p="md" size="xs" c="dimmed">
              {adverts.length} devices
            </Text>
          </Paper>
        </>
      )}
    </>
  );
}
