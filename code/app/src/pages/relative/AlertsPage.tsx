import { useTranslation } from "react-i18next";
import { Header } from "../../components/Header/Header";
import { Stack } from "@mantine/core";
import { useAlerts } from "../../hooks/useAlerts";
import { FallAlert } from "../../components/Alert/Alert";

export function AlertsPage() {
  const { t } = useTranslation();

  const { alerts } = useAlerts();

  return (
    <>
      <Header title={t("navigation.alerts")} subtitle={t("alerts.subtitle")} />

      {t("alerts.send_test_alert")}
      <Stack mt={"md"}>
        {alerts.map((alert) => (
          <FallAlert key={alert.id} alert={alert} />
        ))}
      </Stack>
    </>
  );
}
