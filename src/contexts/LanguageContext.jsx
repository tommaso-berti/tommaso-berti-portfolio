import {createContext, useContext, useState, useMemo} from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export function LanguageContextProvider({ children })  {
    const [language, setLanguage] = useState(() => {
        if (typeof navigator === "undefined") return "en";
        return navigator.language === "it-IT" ? "it" : "en";
    });

    const toggleLanguage = () => {
        language === 'en' ? setLanguage('it') : setLanguage('en');
    }

    const value = useMemo(() => ({
        language,
        toggleLanguage
    }), [language]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}
