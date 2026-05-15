import { useTranslation } from "react-i18next";
import ItFlag from "../../assets/icons/italy.png";
import EnFlag from "../../assets/icons/united-kingdom.png";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

export default function LanguageToggle() {
    const { i18n, t } = useTranslation("common");
    const language = i18n.language?.toLowerCase().startsWith("it") ? "it" : "en";

    const handleLanguageSelect = () => {
        void i18n.changeLanguage(language === "en" ? "it" : "en");
    };

    const label = language === "it"
        ? t("a11y.toggleLanguageToEn")
        : t("a11y.toggleLanguageToIt");

    return (
        <IconButton
            onClick={handleLanguageSelect}
            aria-label={label}
            sx={{
                mr: 0.25,
            }}
        >
            <Box
                component="img"
                src={language === "it" ? ItFlag : EnFlag}
                alt=""
                aria-hidden
                sx={{
                    width: 24,
                    height: 24,
                    display: "block",
                    borderRadius: "4px"
                }}
            />
        </IconButton>

    );
}
