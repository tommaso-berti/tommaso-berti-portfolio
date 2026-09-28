import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ensureProjectsNamespace } from "./loadLocale.js";

/**
 * Loads the heavy `pages.projects` bundle on demand for Projects routes.
 */
export function useEnsureProjectsI18n() {
    const { i18n: i18nInstance } = useTranslation();
    const language = i18nInstance.language?.toLowerCase().startsWith("it") ? "it" : "en";
    const [readyLanguage, setReadyLanguage] = useState(() => {
        const initialLanguage = i18nInstance.language?.toLowerCase().startsWith("it") ? "it" : "en";
        return i18nInstance.getResource(initialLanguage, "pages")?.projects?.logra?.title
            ? initialLanguage
            : null;
    });

    useEffect(() => {
        let cancelled = false;

        if (i18nInstance.getResource(language, "pages")?.projects?.logra?.title) {
            setReadyLanguage(language);
            return undefined;
        }

        setReadyLanguage(null);
        void ensureProjectsNamespace(i18nInstance, language).then(() => {
            if (!cancelled) {
                setReadyLanguage(language);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [i18nInstance, language]);

    return readyLanguage === language;
}
