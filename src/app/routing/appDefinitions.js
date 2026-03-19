import { matchPath } from "react-router-dom";

import Home from "../../pages/home/Home.jsx";
import Projects from "../../pages/projects/Projects.jsx";
import ProjectPage from "../../pages/projects/projectsPages/ProjectPage.jsx";
import About from "../../pages/about/About.jsx";
import Blog from "../../pages/blog/Blog.jsx";
import Contact from "../../pages/contact/Contact.jsx";
import { projects } from "../../pages/projects/projectsPages/projects.js";

/**
 * @typedef {Object} BreadcrumbItemDefinition
 * @property {string} id
 * @property {string} titleKey
 * @property {string} [fallback]
 */

/**
 * @typedef {Object} BreadcrumbContextDefinition
 * @property {"path" | "hash"} type
 * @property {string} basePath
 * @property {BreadcrumbItemDefinition[]} items
 */

/**
 * @typedef {Object} PageDefinition
 * @property {string} id
 * @property {string} path
 * @property {boolean} [index]
 * @property {import("react").ComponentType<any>} [component]
 * @property {string} [redirectTo]
 * @property {boolean} [replace]
 * @property {string} [breadcrumbContext]
 * @property {string} [navKey]
 * @property {boolean} [showInHomeMenu]
 * @property {boolean} [experimental]
 */

/** @type {PageDefinition[]} */
export const PAGE_DEFINITIONS = [
    {
        id: "home",
        path: "/",
        index: true,
        component: Home,
        breadcrumbContext: "home",
        navKey: "home",
        showInHomeMenu: false,
        experimental: false,
    },
    {
        id: "projects",
        path: "/projects",
        component: Projects,
        breadcrumbContext: "projects",
        navKey: "projects",
        showInHomeMenu: true,
        experimental: false,
    },
    {
        id: "project-details",
        path: "/projects/:project",
        component: ProjectPage,
        breadcrumbContext: "projects",
        experimental: false,
    },
    {
        id: "about",
        path: "/about",
        component: About,
        breadcrumbContext: "about",
        navKey: "about",
        showInHomeMenu: true,
        experimental: false,
    },
    {
        id: "blog",
        path: "/blog",
        component: Blog,
        breadcrumbContext: "home",
        navKey: "blog",
        showInHomeMenu: true,
        experimental: false,
    },
    {
        id: "contact",
        path: "/contact",
        component: Contact,
        breadcrumbContext: "home",
        navKey: "contact",
        showInHomeMenu: true,
        experimental: false,
    },
    {
        id: "not-found",
        path: "*",
        redirectTo: "/",
        replace: true,
        experimental: false,
    },
];

const HOME_ITEMS = PAGE_DEFINITIONS.filter((page) => page.showInHomeMenu).map((page) => ({
    id: page.id,
    titleKey: `nav.${page.navKey}`,
    fallback: page.id,
}));

const ABOUT_ITEMS = [
    { id: "bio", titleKey: "pages.about.bio.title", fallback: "bio" },
    { id: "hobbies", titleKey: "pages.about.hobbies.title", fallback: "hobbies" },
    {
        id: "study-and-experience",
        titleKey: "pages.about.experience.title",
        fallback: "study and experience",
    },
    { id: "tech-skills", titleKey: "pages.about.tech-skills.title", fallback: "tech skills" },
    { id: "certifications", titleKey: "pages.about.certifications.title", fallback: "certifications" },
];

const PROJECT_ITEMS = projects.map((project) => ({
    id: project.id,
    titleKey: `pages.projects.${project.id}.title`,
    fallback: project.id,
}));

/** @type {Record<string, BreadcrumbContextDefinition>} */
export const BREADCRUMB_CONTEXT_DEFINITIONS = {
    home: {
        type: "path",
        basePath: "/",
        items: HOME_ITEMS,
    },
    about: {
        type: "hash",
        basePath: "/about",
        items: ABOUT_ITEMS,
    },
    projects: {
        type: "path",
        basePath: "/projects",
        items: PROJECT_ITEMS,
    },
};

function normalizeSegment(value) {
    return decodeURIComponent(`${value ?? ""}`).replace(/^\/+|\/+$/g, "");
}

export function resolvePageDefinition(pathname) {
    const safePath = pathname || "/";

    return PAGE_DEFINITIONS.find((page) => {
        if (!page.component) return false;
        if (page.index) return safePath === "/";
        return Boolean(matchPath({ path: page.path, end: true }, safePath));
    });
}

export function resolveBreadcrumbContextId(pathname, currentId, breadcrumb) {
    if (breadcrumb[currentId]) return currentId;

    const matchedPage = resolvePageDefinition(pathname);
    if (matchedPage?.breadcrumbContext && breadcrumb[matchedPage.breadcrumbContext]) {
        return matchedPage.breadcrumbContext;
    }

    const firstSegment = normalizeSegment(pathname.split("/").filter(Boolean)[0]);
    if (breadcrumb[firstSegment]) return firstSegment;

    return "home";
}

export function getBreadcrumbContextBasePath(contextId, currentCrumb) {
    return (
        BREADCRUMB_CONTEXT_DEFINITIONS[contextId]?.basePath ||
        currentCrumb?.to?.split("#")[0] ||
        "/"
    );
}
