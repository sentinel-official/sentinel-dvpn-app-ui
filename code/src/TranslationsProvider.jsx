import i18n from "i18next";
import React, { createContext, useEffect, useState } from "react";
import ar from "./languages/ar";
import de from "./languages/de";
import en from "./languages/en";
import es from "./languages/es";
import fr from "./languages/fr";
import hi from "./languages/hi";
import ja from "./languages/ja";
import ko from "./languages/ko";
import pt from "./languages/pt";
import ru from "./languages/ru";
import tr from "./languages/tr";
import zh from "./languages/zh";

// import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";

export const TranslationContext = createContext();

const getLanguages = (langs = {}) => {
  const l = {};
  Object.keys(langs).forEach((i) => {
    l[i] = { translation: langs[i] };
  });
  return l;
};

const TranslationsProvider = ({ children }) => {
  // const showAlerts = useAlerts();
  const [isTranslationsInitiated, setIsTranslationsInitiated] =
    React.useState(false);
  const [language, setLanguage] = useState(i18n.language);
  useEffect(() => {
    const langs = getLanguages({
      ar,
      de,
      en,
      es,
      fr,
      hi,
      ja,
      ko,
      pt,
      ru,
      tr,
      zh,
    });
    const initTranslations = async () => {
      await i18n.init({
        resources: langs,
        fallbackLng: "en",
      });
      const lanaguage = window.localStorage.getItem("language") || "en";
      await i18n.changeLanguage(lanaguage);
      setLanguage(lanaguage);
      setIsTranslationsInitiated(true);
      return;
    };

    initTranslations();

    const handleLanguageChanged = (lng) => {
      window.localStorage.setItem("language", lng);
      setLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng);
      return true;
    } catch (e) {
      // showAlerts({
      //   type: ALERT_TYPES.error,
      //   message: "error_changing_language",
      // });
      return false;
    }
  };

  const translate = (key, data) => {
    if (i18n.exists(key)) {
      return i18n.t(key, data);
    }
    return key;
  };

  return (
    <TranslationContext.Provider
      value={{ language, changeLanguage, translate }}
    >
      {isTranslationsInitiated && children}
    </TranslationContext.Provider>
  );
};

export default TranslationsProvider;
