import { Box, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { Header } from "../../components/Header/Header";
import {
  useDevice,
  type LapsusAdvertisement,
} from "../../contexts/Device/DeviceContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function DevicePage() {
  const { device, listen } = useDevice();

  const [adverts, setAdverts] = useState<LapsusAdvertisement[]>([]);

  useEffect(() => {
    if (device) return;

    const unsubscribe = listen((devices) => {
      setAdverts(devices);
    });

    return () => {
      unsubscribe.then((unsub) => {
        unsub();
      });
    };
  }, [device, listen]);

  const { t } = useTranslation();

  return (
    <>
      {device ? (
        <>
          <Box
            pos={"absolute"}
            top={0}
            left={0}
            w={"100%"}
            h={"400"}
            style={{
              background:
                "linear-gradient(0deg, var(--mantine-color-primary-5), var(--mantine-color-primary-9))",
            }}
          ></Box>
          <Stack mt={"330"}>
            <Header title={device.name} subtitle={t("device.settings")} />
          </Stack>
        </>
      ) : (
        <>
          <Header
            title={t("navigation.device")}
            subtitle={t("device.settings")}
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
                    {t("device.connect")}
                  </Button>
                </Group>
              ))}
            <Text p="md" size="xs" c="dimmed">
              {t("device.devices", { count: adverts.length })}
            </Text>
          </Paper>
        </>
      )}
    </>
  );
}
