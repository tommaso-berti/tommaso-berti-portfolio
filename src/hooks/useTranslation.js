import { useLanguage } from "../contexts/LanguageContext.jsx";
import { translations } from "../i18n";

export function useTranslation() {
    const { language } = useLanguage();

    const t = (key) => {
        return key.split('.').reduce((obj, k) => (obj ? obj[k] : undefined), translations[language]) || key;
    };

    return { t };
}