import { useState, useMemo } from 'react'
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import makeTheme from './styles/theme.js'
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ExampleStyle from './pages/ExampleStyle.jsx';
import Projects from './pages/Projects.jsx';

function App() {
    let mode = 'light';
    const theme = useMemo(() => makeTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline >
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<Home />} />
                                <Route path="/example-style" element={<ExampleStyle />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CssBaseline>
        </ThemeProvider>
    )
}

export default App
