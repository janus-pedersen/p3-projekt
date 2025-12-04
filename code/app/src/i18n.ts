import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

export const locales = {
  en: {
    title: "English",
    emoji: "🇺🇸",
  },
  dk: {
    title: "English",
    emoji: "🇩🇰",
  },
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
});

export default i18n;
