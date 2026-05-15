import { buildPagesNamespace } from "./buildPagesNamespace.js";
import { buildProjectsNamespace, PROJECT_IDS } from "./buildProjectsNamespace.js";

const PAGE_SECTION_LOADERS = {
    home: (lang) => import(`./locales/${lang}/pages/home.json`),
    contact: (lang) => import(`./locales/${lang}/pages/contact.json`),
    about: (lang) => import(`./locales/${lang}/pages/about.json`),
    blog: (lang) => import(`./locales/${lang}/pages/blog.json`),
    cv: (lang) => import(`./locales/${lang}/pages/cv.json`),
};

async function loadCoreNamespaces(lang) {
    const [common, releaseNotes, seo] = await Promise.all([
        import(`./locales/${lang}/common.json`),
        import(`./locales/${lang}/releaseNotes.json`),
        import(`./locales/${lang}/seo.json`),
    ]);

    const pageSections = await Promise.all(
        Object.entries(PAGE_SECTION_LOADERS).map(async ([key, loader]) => {
            const mod = await loader(lang);
            return [key, mod.default];
        })
    );

    return {
        common: common.default,
        releaseNotes: releaseNotes.default,
        seo: seo.default,
        pages: buildPagesNamespace({
            ...Object.fromEntries(pageSections),
            projects: {},
        }),
    };
}

export async function loadProjectsNamespace(lang) {
    const [sharedMod, ...projectMods] = await Promise.all([
        import(`./locales/${lang}/pages/projects/shared.json`),
        ...PROJECT_IDS.map((id) => import(`./locales/${lang}/pages/projects/${id}.json`)),
    ]);

    const projectFragments = Object.fromEntries(
        PROJECT_IDS.map((id, index) => [id, projectMods[index].default])
    );

    return buildProjectsNamespace(sharedMod.default, projectFragments);
}

export async function registerLanguageBundles(i18n, lang, { includeProjects = false } = {}) {
    const bundles = await loadCoreNamespaces(lang);

    i18n.addResourceBundle(lang, "common", bundles.common, true, true);
    i18n.addResourceBundle(lang, "releaseNotes", bundles.releaseNotes, true, true);
    i18n.addResourceBundle(lang, "seo", bundles.seo, true, true);
    i18n.addResourceBundle(lang, "pages", bundles.pages, true, true);

    if (includeProjects) {
        await ensureProjectsNamespace(i18n, lang);
    }
}

export async function ensureProjectsNamespace(i18n, lang) {
    const normalized = lang?.toLowerCase().startsWith("it") ? "it" : "en";
    const existing = i18n.getResource(normalized, "pages")?.projects ?? {};
    if (existing.logra?.title) {
        return;
    }

    const projects = await loadProjectsNamespace(normalized);
    i18n.addResourceBundle(normalized, "pages", { projects }, true, true);
}
