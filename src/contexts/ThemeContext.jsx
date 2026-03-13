import {createContext, useContext, useState, useMemo} from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import makeTheme from "../styles/theme.js";

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

export function ThemeModeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        if (typeof window === "undefined") return "light";
        try {
            return localStorage.getItem("mui-mode") || "light";
        } catch {
            return "light";
        }
    });
    const theme = useMemo(() => makeTheme(mode), [mode]);

    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        try {
            localStorage.setItem('mui-mode', newMode);
        } catch {
            // Ignore storage write failures to keep the UI responsive.
        }
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
