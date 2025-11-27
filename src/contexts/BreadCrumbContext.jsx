import { createContext, useState, useContext, useMemo } from "react";

const BreadCrumbContext = createContext();

const INITIAL_STATIC_BREADCRUMB = {
    home: {
        type: "path",
        items: [
            { title: "projects", id: "projects" },
            { title: "about", id: "about" },
            { title: "blog", id: "blog" },
            { title: "example-style", id: "example-style" }
        ]
    },
    about: {
        type: "hash",
        items: [
            {title: "Bio", id: "bio"},
            {title: "Hobbies", id: "hobbies"},
            {title: "Study and Experience", id: "study-and-experience"},
            {title: "TechSkills", id: "tech-skills"}
        ]
    },
    projects: {
        type: "path",
        items: [
            {title: "CodexPane", id: "codexpane"},
            {title: "GamesLog", id: "gameslog"},
            {title: "Portfolio", id: "portfolio"}
        ]
    }
};

export function BreadCrumbProvider({ children }) {
    const [breadcrumb, setBreadcrumb] = useState(INITIAL_STATIC_BREADCRUMB);

    const value = useMemo(() => ({
        breadcrumb,
        setBreadcrumb
    }), [breadcrumb]);

    return (
        <BreadCrumbContext.Provider value={value}>
            {children}
        </BreadCrumbContext.Provider>
    );
}

export const useBreadcrumb = () => useContext(BreadCrumbContext);
