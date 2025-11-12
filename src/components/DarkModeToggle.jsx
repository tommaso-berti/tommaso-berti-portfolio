import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';

export default function DarkModeToggle() {
    let mode = localStorage.getItem('mui-mode') || 'light';

    const handleClick = () => {
        if(mode === 'light') {
            localStorage.setItem('mui-mode', 'dark');
        }
        else
            localStorage.setItem('mui-mode', 'light');
    }

    return (
        <IconButton onClick={handleClick}>
            { mode === 'light' ? <LightModeIcon /> : <DarkModeIcon /> }
        </IconButton>
    )
}