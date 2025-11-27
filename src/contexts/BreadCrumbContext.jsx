import { createContext, useContext, useMemo } from "react";
import { useTranslation } from "../hooks/useTranslation.js";

const BreadCrumbContext = createContext(null);

export function BreadCrumbProvider({ children }) {
    const { t: tNav } = useTranslation("nav");
    const { t: tAbout } = useTranslation("pages.about");

    const breadcrumb = useMemo(
        () => ({
            home: {
                type: "path",
                items: [
                    { title: tNav("projects"), id: "projects" },
                    { title: tNav("about"), id: "about" },
                    { title: tNav("blog"), id: "blog" },
                    //{ title: tNav("example-style"), id: "example-style" },
                ],
            },
            about: {
                type: "hash",
                items: [
                    { title: tAbout("bio.title"), id: "bio" },
                    { title: tAbout("hobbies.title"), id: "hobbies" },
                    {
                        title: tAbout("experience.title"),
                        id: "study-and-experience",
                    },
                    { title: tAbout("tech-skills.title"), id: "tech-skills" },
                ],
            },
            projects: {
                type: "path",
                items: [
                    { title: "CodexPane", id: "codexpane" },
                    { title: "GamesLog", id: "gameslog" },
                    { title: "Portfolio", id: "portfolio" },
                ],
            },
        }),
        [tNav, tAbout]
    );

    const value = useMemo(
        () => ({ breadcrumb }),
        [breadcrumb]
    );

    return (
        <BreadCrumbContext.Provider value={value}>
            {children}
        </BreadCrumbContext.Provider>
    );
}

export const useBreadcrumb = () => useContext(BreadCrumbContext);
