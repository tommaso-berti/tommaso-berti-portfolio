import { createContext, useState, useContext } from "react";

const BreadcrumbContext = createContext();

export function BreadcrumbProvider({ children }) {
    const [breadcrumb, setBreadcrumb] = useState({});
    return (
        <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

export const useBreadcrumb = () => useContext(BreadcrumbContext);
