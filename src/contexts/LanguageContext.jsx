import {createContext, useContext, useState, useMemo} from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export function LanguageContextProvider({ children })  {
    const [language, setLanguage] = useState(navigator.language === 'it-IT' ? 'it' : 'en');

    const toggleLanguage = (lang) => {
        setLanguage(lang);
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