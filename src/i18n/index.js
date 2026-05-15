import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { registerLanguageBundles } from "./loadLocale.js";

const LANGUAGE_STORAGE_KEY = "app-language";
const SUPPORTED_LANGUAGES = new Set(["it", "en"]);
const loadedLanguages = new Set();

export function normalizeLanguage(input) {
    if (typeof input !== "string") return "en";
    const normalized = input.trim().toLowerCase();
    if (normalized.startsWith("it")) return "it";
    if (normalized.startsWith("en")) return "en";
    return "en";
}

function detectInitialLanguage() {
    if (typeof window === "undefined") return "en";
    const fromStorage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (fromStorage && SUPPORTED_LANGUAGES.has(normalizeLanguage(fromStorage))) {
        return normalizeLanguage(fromStorage);
    }
    return normalizeLanguage(window.navigator.language);
}

export async function ensureLanguageLoaded(lang) {
    const normalized = normalizeLanguage(lang);
    if (loadedLanguages.has(normalized)) {
        return;
    }

    await registerLanguageBundles(i18n, normalized, { includeProjects: false });
    loadedLanguages.add(normalized);
}

const initialLanguage = detectInitialLanguage();

void i18n.use(initReactI18next).init({
    resources: {},
    lng: initialLanguage,
    fallbackLng: "en",
    supportedLngs: ["it", "en"],
    load: "languageOnly",
    interpolation: {
        escapeValue: false,
    },
    defaultNS: "common",
});

const i18nReady = ensureLanguageLoaded(initialLanguage);

i18n.on("languageChanged", (nextLanguage) => {
    if (typeof window === "undefined") return;
    const normalized = normalizeLanguage(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
});

export function waitForI18n() {
    return i18nReady;
}

export default i18n;
