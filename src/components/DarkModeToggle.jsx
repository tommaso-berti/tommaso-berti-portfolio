import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { useThemeMode } from '../contexts/ThemeContext.jsx'

export default function DarkModeToggle() {
    const { mode, toggleTheme } = useThemeMode();

    return (
        <IconButton onClick={toggleTheme}>
            { mode === 'light' ? <LightModeIcon /> : <DarkModeIcon /> }
        </IconButton>
    )
}