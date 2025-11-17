import { createContext, useState, useContext } from "react";

const BreadCrumbContext = createContext();

export function BreadCrumbProvider({ children }) {
    const [breadcrumb, setBreadcrumb] = useState({});
    return (
        <BreadCrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
            {children}
        </BreadCrumbContext.Provider>
    );
}

export const useBreadcrumb = () => useContext(BreadCrumbContext);
