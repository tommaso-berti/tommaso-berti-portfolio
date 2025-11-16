import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ExampleStyle from './pages/ExampleStyle.jsx';
import Projects from './pages/Projects.jsx';
import { ThemeModeProvider } from "./contexts/ThemeContext.jsx";
import { LanguageContextProvider } from "./contexts/LanguageContext.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";

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
                                <Route path="/about" element={<About />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeModeProvider>
        </LanguageContextProvider>
    )
}

export default App
