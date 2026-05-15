import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from "react-i18next";
import { useThemeMode } from '../../contexts/ThemeContext.jsx'

export default function DarkModeToggle() {
    const { mode, toggleTheme } = useThemeMode();
    const { t } = useTranslation("common");

    const label = mode === "light"
        ? t("a11y.toggleThemeDark")
        : t("a11y.toggleThemeLight");

    return (
        <IconButton
            onClick={toggleTheme}
            aria-label={label}
            sx={{
                ml: 0.25,
            }}
        >
            { mode === 'light' ? <LightModeIcon /> : <DarkModeIcon /> }
        </IconButton>
    )
}
