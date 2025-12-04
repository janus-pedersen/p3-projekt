import { useTranslation } from "react-i18next";
import { Header } from "../../components/Header/Header";

export function SchedulePage() {
  const { t } = useTranslation();

  return (
    <>
      <Header
        title={t("navigation.schedule")}
        subtitle="Set your weekly schedule and timers"
      />
    </>
  );
}
