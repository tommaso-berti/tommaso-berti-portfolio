import { BrowserRouter } from "react-router-dom";

import { ThemeModeProvider } from "../contexts/ThemeContext.jsx";
import { BreadCrumbProvider } from "../contexts/BreadCrumbContext.jsx";
import ScrollToTop from "./layout/ScrollToTop.jsx";
import SeoMetaManager from "./layout/SeoMetaManager.jsx";
import JsonLd from "./layout/JsonLd.jsx";

export default function AppProviders({ children }) {
    return (
        <BreadCrumbProvider>
            <ThemeModeProvider>
                <BrowserRouter>
                    <JsonLd />
                    <SeoMetaManager />
                    <ScrollToTop />
                    {children}
                </BrowserRouter>
            </ThemeModeProvider>
        </BreadCrumbProvider>
    );
}
