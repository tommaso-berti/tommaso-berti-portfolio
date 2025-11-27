import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { useThemeMode } from '../contexts/ThemeContext.jsx'

export default function DarkModeToggle() {
    const { mode, toggleTheme } = useThemeMode();

    return (
        <IconButton
            onClick={toggleTheme}
            sx={{
                transition: "0.25s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                }
            }}
        >
            { mode === 'light' ? <LightModeIcon /> : <DarkModeIcon /> }
        </IconButton>
    )
}