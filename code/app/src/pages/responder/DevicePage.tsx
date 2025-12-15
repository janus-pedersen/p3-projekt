import { Box, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { Header } from "../../components/Header/Header";
import {
  useDevice,
  type LapsusAdvertisement,
} from "../../contexts/Device/DeviceContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BatteryIndicator } from "../../components/BatteryIndicator/BatteryIndicator";

export function DevicePage() {
  const { device, listen } = useDevice();

  const [adverts, setAdverts] = useState<LapsusAdvertisement[]>([]);

  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  useEffect(() => {
    if (!device) return;

    const updateBattery = () => {
      device
        .battery()
        .then((level) => {
          if (isNaN(level)) return;
          setBatteryLevel(level);
        })
        .catch((err) => {
          console.error("Failed to get battery level:", err);
          setBatteryLevel(null);
        });
    };

    const interval = setInterval(updateBattery, 60000); // Update every minute
    updateBattery(); // Initial fetch

    return () => clearInterval(interval);
  }, [device]);

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
          >
            <Group
              pos={"absolute"}
              top={"var(--safe-top)"}
              right={24}
              c={"white"}
              gap={"xs"}
            >
              {batteryLevel && (
                <>
                  <BatteryIndicator level={batteryLevel} />
                  <Text size={"sm"}>{batteryLevel}%</Text>
                </>
              )}
            </Group>
          </Box>
          <Stack mt={"330"}>
            <Header title={device.name} subtitle={t("device.subtitle")} />
          </Stack>
        </>
      ) : (
        <>
          <Header
            title={t("navigation.device")}
            subtitle={t("device.subtitle")}
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
