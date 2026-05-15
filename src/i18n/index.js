import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { buildPagesNamespace } from "./buildPagesNamespace.js";
import commonEn from "./locales/en/common.json";
import pagesAboutEn from "./locales/en/pages/about.json";
import pagesBlogEn from "./locales/en/pages/blog.json";
import pagesContactEn from "./locales/en/pages/contact.json";
import pagesCvEn from "./locales/en/pages/cv.json";
import pagesHomeEn from "./locales/en/pages/home.json";
import pagesProjectsEn from "./locales/en/pages/projects.json";
import releaseNotesEn from "./locales/en/releaseNotes.json";
import seoEn from "./locales/en/seo.json";
import commonIt from "./locales/it/common.json";
import pagesAboutIt from "./locales/it/pages/about.json";
import pagesBlogIt from "./locales/it/pages/blog.json";
import pagesContactIt from "./locales/it/pages/contact.json";
import pagesCvIt from "./locales/it/pages/cv.json";
import pagesHomeIt from "./locales/it/pages/home.json";
import pagesProjectsIt from "./locales/it/pages/projects.json";
import releaseNotesIt from "./locales/it/releaseNotes.json";
import seoIt from "./locales/it/seo.json";

const LANGUAGE_STORAGE_KEY = "app-language";
const SUPPORTED_LANGUAGES = new Set(["it", "en"]);

function normalizeLanguage(input) {
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

void i18n.use(initReactI18next).init({
    resources: {
        it: {
            common: commonIt,
            pages: buildPagesNamespace({
                home: pagesHomeIt,
                contact: pagesContactIt,
                about: pagesAboutIt,
                projects: pagesProjectsIt,
                blog: pagesBlogIt,
                cv: pagesCvIt,
            }),
            releaseNotes: releaseNotesIt,
            seo: seoIt,
        },
        en: {
            common: commonEn,
            pages: buildPagesNamespace({
                home: pagesHomeEn,
                contact: pagesContactEn,
                about: pagesAboutEn,
                projects: pagesProjectsEn,
                blog: pagesBlogEn,
                cv: pagesCvEn,
            }),
            releaseNotes: releaseNotesEn,
            seo: seoEn,
        },
    },
    lng: detectInitialLanguage(),
    fallbackLng: "en",
    supportedLngs: ["it", "en"],
    load: "languageOnly",
    interpolation: {
        escapeValue: false,
    },
    defaultNS: "common",
});

i18n.on("languageChanged", (nextLanguage) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizeLanguage(nextLanguage));
});

export default i18n;
