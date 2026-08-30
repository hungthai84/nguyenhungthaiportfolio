import React from "react";
import { useLanguage as useI18nLanguage } from "../i18n";

export function useLanguage() {
  const { lang, setLang, t } = useI18nLanguage();
  return {
    language: lang,
    lang,
    setLanguage: setLang,
    setLang,
    t,
  };
}
