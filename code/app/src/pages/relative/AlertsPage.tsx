import { useTranslation } from "react-i18next";
import { Header } from "../../components/Header/Header";
import { Stack, Text } from "@mantine/core";
import { useAlerts } from "../../hooks/useAlerts";
import { FallAlert } from "../../components/Alert/Alert";

export function AlertsPage() {
  const { t } = useTranslation();

  const { alerts } = useAlerts();

  return (
    <>
      <Header title={t("navigation.alerts")} subtitle={t("alerts.subtitle")} />

      <Stack mt={"md"}>
        {alerts.map((alert) => (
          <FallAlert key={alert.id} alert={alert} />
        ))}

        {alerts.length === 0 && (
          <Text ta={"center"} mt={"xl"} c={"dimmed"}>
            {t("alerts.noAlerts")}
          </Text>
        )}
      </Stack>
    </>
  );
}
