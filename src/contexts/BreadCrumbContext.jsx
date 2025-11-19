import { createContext, useState, useContext } from "react";

const BreadCrumbContext = createContext();

const INITIAL_STATIC_BREADCRUMB = {
    home: {
        type: "path",
        items: [
            { title: "projects", label: "projects" },
            { title: "about", label: "about" },
            { title: "blog", label: "blog" },
            { title: "example-style", label: "example-style" }
        ],
    },
    about: {
        type: "hash",
        items: [
            {title: "Bio", label: "bio"},
            {title: "Hobbies", label: "hobbies"},
            {title: "Study and Experience", label: "study-and-experience"},
            {title: "TechSkills", label: "techskills"}
        ],
    },
    projects: {
        type: "path",
        items: [
            {title: "CodexPane", label: "codexpane"},
            {title: "GamesLog", label: "gameslog"},
            {title: "Portfolio", label: "portfolio"}
        ]
    }
};

export function BreadCrumbProvider({ children }) {
    const [breadcrumb, setBreadcrumb] = useState(INITIAL_STATIC_BREADCRUMB);
    return (
        <BreadCrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
            {children}
        </BreadCrumbContext.Provider>
    );
}

export const useBreadcrumb = () => useContext(BreadCrumbContext);
