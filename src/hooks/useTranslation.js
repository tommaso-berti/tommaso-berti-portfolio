import { useLanguage } from "../contexts/LanguageContext.jsx";
import { translations } from "../i18n";

export function useTranslation(baseKey) {
    const { language } = useLanguage();

    const t = (key, options = {}) => {
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

        return fullKey;
    };

    return { t };
}