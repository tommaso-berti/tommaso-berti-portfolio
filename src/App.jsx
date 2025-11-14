import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ExampleStyle from './pages/ExampleStyle.jsx';
import Projects from './pages/Projects.jsx';
import { ThemeModeProvider } from "./contexts/ThemeContext.jsx";

function App() {
    return (
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
    )
}

export default App
