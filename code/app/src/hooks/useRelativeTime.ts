import { useInterval } from "@mantine/hooks";
import { useState } from "react";
import { relativeTime } from "../utils/relativeTime";
import { useTranslation } from "react-i18next";

export const useRelativeTime = (target: Date) => {
  const { i18n } = useTranslation();

  const locale = {
    en: "en",
    dk: "da-DK",
  }[i18n.language];

  console.log("Language");

  const [result, setResult] = useState(relativeTime(target, locale));

  useInterval(
    () => {
      setResult(relativeTime(target, locale));
    },
    1000,
    { autoInvoke: true }
  );

  return result;
};
