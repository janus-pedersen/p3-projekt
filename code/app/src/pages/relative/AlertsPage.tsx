import { useTranslation } from "react-i18next";
import { Header } from "../../components/Header/Header";
import { Button, Stack } from "@mantine/core";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
import { useAlerts } from "../../hooks/useAlerts";
import { FallAlert } from "../../components/Alert/Alert";
import { Geolocation } from "@capacitor/geolocation";

export function AlertsPage() {
  const { t } = useTranslation();

  const { alerts } = useAlerts();

  return (
    <>
      <Header title={t("navigation.alerts")} subtitle={t("alerts.subtitle")} />
      <Button
        fullWidth
        onClick={async () => {
          const position = await Geolocation.getCurrentPosition({
            timeout: 10000,
            enableHighAccuracy: true,
          });

          FirebaseFunctions.callByName({
            name: "alert",
            data: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          })
            .then(() => {
              console.log("Test alert sent successfully");
            })
            .catch((error) => {
              console.error("Error sending test alert:", error);
            });
        }}
      >
        {t("alerts.send_test_alert")}
      </Button>
      <Stack mt={"md"}>
        {alerts.map((alert) => (
          <FallAlert key={alert.id} alert={alert} />
        ))}
      </Stack>
    </>
  );
}
