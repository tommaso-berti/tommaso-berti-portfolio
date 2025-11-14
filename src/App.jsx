import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ExampleStyle from './pages/ExampleStyle.jsx';
import Projects from './pages/Projects.jsx';
import { ThemeModeProvider } from "./contexts/ThemeContext.jsx";
import { LanguageContextProvider } from "./contexts/LanguageContext.jsx";

function App() {
    return (
        <LanguageContextProvider>
            <ThemeModeProvider>
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
            </ThemeModeProvider>
        </LanguageContextProvider>
    )
}

export default App
