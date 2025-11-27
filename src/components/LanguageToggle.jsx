import { useLanguage } from "../contexts/LanguageContext.jsx";
import ItFlag from "../assets/icons/italy.png";
import EnFlag from "../assets/icons/united-kingdom.png";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    const languages = [
        { title: "IT", id: "it" },
        { title: "EN", id: "en" },
    ];

    const handleLanguageSelect = () => {
        toggleLanguage();
    };

    return (
        <IconButton
            onClick={handleLanguageSelect}
            sx={{
                transition: "0.25s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                }
            }}
        >
            <Box
                component="img"
                src={language === "it" ? ItFlag : EnFlag}
                alt="language"
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
