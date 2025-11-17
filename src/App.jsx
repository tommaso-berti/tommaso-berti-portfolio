import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Layout from './components/Layout.jsx';
import Home from './pages/home/Home.jsx';
import ExampleStyle from './pages/exampleStyles/ExampleStyle.jsx';
import Projects from './pages/projects/Projects.jsx';
import { ThemeModeProvider } from "./contexts/ThemeContext.jsx";
import { LanguageContextProvider } from "./contexts/LanguageContext.jsx";
import { BreadCrumbProvider } from "./contexts/BreadCrumbContext.jsx";

import About from "./pages/about/About.jsx";
import Blog from "./pages/blog/Blog.jsx";

function App() {
    return (
        <LanguageContextProvider>
            <BreadCrumbProvider>
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
            </BreadCrumbProvider>
        </LanguageContextProvider>
    )
}

export default App
