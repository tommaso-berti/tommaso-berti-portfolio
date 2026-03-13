import { useLanguage } from "../contexts/LanguageContext.jsx";
import { translations } from "../i18n";

export function useTranslation(baseKey) {
    const { language } = useLanguage();

    const t = (key, optionsOrFallback = {}) => {
        const options =
            typeof optionsOrFallback === "object" &&
            optionsOrFallback !== null &&
            !Array.isArray(optionsOrFallback)
                ? optionsOrFallback
                : {};
        const fallbackValue =
            typeof optionsOrFallback === "string" || typeof optionsOrFallback === "number"
                ? optionsOrFallback
                : options.defaultValue;
        const fullKey = baseKey ? `${baseKey}.${key}` : key;

        let value = fullKey
            .split('.')
            .reduce((obj, k) => (obj ? obj[k] : undefined), translations[language]);

        if (value === undefined) {
            value = fullKey
                .split('.')
                .reduce((obj, k) => (obj ? obj[k] : undefined), translations['en']);
        }

        if (options.returnObjects) {
            return value;
        }

        if (typeof value === "string" || typeof value === "number") {
            return value;
        }

        if (fallbackValue !== undefined) {
            return fallbackValue;
        }

        return fullKey;
    };

    return { t };
}
