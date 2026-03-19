import { BrowserRouter } from "react-router-dom";

import { ThemeModeProvider } from "../contexts/ThemeContext.jsx";
import { LanguageContextProvider } from "../contexts/LanguageContext.jsx";
import { BreadCrumbProvider } from "../contexts/BreadCrumbContext.jsx";
import ScrollToTop from "./layout/ScrollToTop.jsx";
import SeoMetaManager from "./layout/SeoMetaManager.jsx";

export default function AppProviders({ children }) {
    return (
        <LanguageContextProvider>
            <BreadCrumbProvider>
                <ThemeModeProvider>
                    <BrowserRouter>
                        <SeoMetaManager />
                        <ScrollToTop />
                        {children}
                    </BrowserRouter>
                </ThemeModeProvider>
            </BreadCrumbProvider>
        </LanguageContextProvider>
    );
}
