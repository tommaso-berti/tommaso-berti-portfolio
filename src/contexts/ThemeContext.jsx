import {createContext, useContext, useState, useMemo} from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import makeTheme from "../styles/theme.js";

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

export function ThemeModeProvider({ children }) {
    const [mode, setMode] = useState(localStorage.getItem('mui-mode') || 'light');
    const theme = useMemo(() => makeTheme(mode), [mode]);

    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('mui-mode', newMode);
    }

    return (
        <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    {children}
                </CssBaseline>
            </ThemeProvider>
        </ThemeModeContext.Provider>
    )
}