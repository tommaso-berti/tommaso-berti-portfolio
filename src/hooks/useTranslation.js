import { useLanguage } from "../contexts/LanguageContext.jsx";
import { translations } from "../i18n";

export function useTranslation() {
    const { language } = useLanguage();

    const t = (key) => translations[language][key] || key;

    return { t };
}