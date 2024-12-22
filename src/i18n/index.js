import { createI18n } from "vue-i18n";
import en from "./en";
import es from "./es";
import ja from "./ja";


const messages = {
  en,
  es,
  ja,
};

const navigatorLang = navigator.language.split("-")[0];

if (!localStorage.getItem("language")) {
  localStorage.setItem("language", navigatorLang);
}

const i18n = createI18n({
  locale: localStorage.getItem("language") || "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
