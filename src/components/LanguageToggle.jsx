import TranslateIcon from "@mui/icons-material/Translate";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import IconMenu from "./IconMenu";

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    const languages = [
        { title: "IT", label: "it" },
        { title: "EN", label: "en" },
    ];

    const handleLanguageSelect = (item) => {
        toggleLanguage(item.label);
    };

    return (
        <IconMenu
            items={languages}
            onItemClick={handleLanguageSelect}
            buttonId="translate-button"
            menuId="translate-menu"
            icon={<TranslateIcon />}
        />
    );
}
