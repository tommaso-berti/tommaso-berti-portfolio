import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const LanguageContext = createContext();
const LANGUAGE_STORAGE_KEY = "app-language";
const DEFAULT_LANGUAGE = "en";

function normalizeLanguage(input) {
    if (typeof input !== "string") return DEFAULT_LANGUAGE;
    const lower = input.toLowerCase();
    if (lower.startsWith("it")) return "it";
    if (lower.startsWith("en")) return "en";
    return DEFAULT_LANGUAGE;
}

export const useLanguage = () => useContext(LanguageContext);

export function LanguageContextProvider({ children })  {
    const [language, setLanguageState] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
                if (saved) return normalizeLanguage(saved);
            } catch {
                // Ignore read errors and continue with browser fallback.
            }
        }

        if (typeof navigator !== "undefined") {
            return normalizeLanguage(navigator.language);
        }

        return DEFAULT_LANGUAGE;
    });

    const setLanguage = useCallback((nextLanguage) => {
        const normalized = normalizeLanguage(nextLanguage);
        setLanguageState(normalized);
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
        } catch {
            // Ignore persistence errors to keep language switch working.
        }
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguageState((previous) => {
            const next = previous === "en" ? "it" : "en";
            try {
                localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
            } catch {
                // Ignore persistence errors to keep language switch working.
            }
            return next;
        });
    }, []);

    const value = useMemo(() => ({
        language,
        toggleLanguage,
        setLanguage
    }), [language, toggleLanguage, setLanguage]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}
