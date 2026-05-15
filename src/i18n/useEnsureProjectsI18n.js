import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import i18n from "./index.js";
import { ensureProjectsNamespace } from "./loadLocale.js";

/**
 * Loads the heavy `pages.projects` bundle on demand for Projects routes.
 */
export function useEnsureProjectsI18n() {
    const { i18n: i18nInstance } = useTranslation();
    const [ready, setReady] = useState(() => {
        const lang = i18nInstance.language?.toLowerCase().startsWith("it") ? "it" : "en";
        return Boolean(i18nInstance.getResource(lang, "pages")?.projects?.logra?.title);
    });

    useEffect(() => {
        let cancelled = false;

        void ensureProjectsNamespace(i18n, i18nInstance.language).then(() => {
            if (!cancelled) {
                setReady(true);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [i18nInstance.language]);

    return ready;
}
