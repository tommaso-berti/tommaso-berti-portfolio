import { useState, useMemo } from 'react'
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import makeTheme from './styles/theme.js'
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';

function App() {
    let mode = 'light';
    const theme = useMemo(() => makeTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        {
                        <Route index element={<Home />} />
                            /* <Route path=":docs" element={} />
                             <Route path=":docs/:section" element={} />
                             <Route path="*" element={<Navigate to="/" replace />} />*/
                        }
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
