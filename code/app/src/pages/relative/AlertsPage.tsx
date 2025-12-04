import { useTranslation } from "react-i18next";
import { Header } from "../../components/Header/Header";

export function AlertsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t("navigation.alerts")} subtitle={t("alerts.subtitle")} />
    </>
  );
}
