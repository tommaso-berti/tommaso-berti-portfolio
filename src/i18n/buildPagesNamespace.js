/**
 * Assembles the `pages` i18next namespace from per-route locale fragments.
 * Keeps `useTranslation("pages", { keyPrefix })` unchanged in components.
 */
export function buildPagesNamespace(sections) {
    return {
        home: sections.home,
        contact: sections.contact,
        about: sections.about,
        projects: sections.projects,
        blog: sections.blog,
        cv: sections.cv,
    };
}
