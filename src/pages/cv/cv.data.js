import { CERTIFICATIONS } from "../../features/certifications/certifications.data.js";
import { SKILL_GROUPS } from "../../features/skills/skillGroups.js";
import { projects } from "../projects/projectsPages/projects.js";

/**
 * @typedef {Object} CvProfile
 * @property {string} name
 * @property {string} role
 * @property {string} location
 * @property {string} email
 * @property {string} phone
 * @property {string} websiteLabel
 * @property {string} websiteUrl
 * @property {string} linkedinLabel
 * @property {string} linkedinUrl
 * @property {string} githubLabel
 * @property {string} githubUrl
 * @property {string} summary
 * @property {string} compactSummary
 */

/**
 * @typedef {Object} CvExperienceItem
 * @property {string} year
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} CvEducationItem
 * @property {string} period
 * @property {string} title
 * @property {string} institution
 * @property {string} description
 */

/**
 * @typedef {Object} CvLanguageItem
 * @property {string} name
 * @property {string} level
 */

/**
 * @typedef {Object} CvControlsState
 * @property {"full" | "compact"} density
 * @property {boolean} showExperience
 * @property {boolean} showProjects
 * @property {boolean} showCertifications
 */

const PROFILE_BY_LANGUAGE = {
    en: {
        name: "Tommaso Berti",
        role: "Software Developer and Delivery Expert",
        location: "Veneto, Italy",
        email: "tommaso.berti.15@gmail.com",
        phone: "+39 3401534203",
        websiteLabel: "tommasoberti.com",
        websiteUrl: "https://www.tommasoberti.com",
        linkedinLabel: "linkedin.com/in/tommasoberti",
        linkedinUrl: "https://www.linkedin.com/in/tommasoberti/",
        githubLabel: "github.com/tommaso-berti",
        githubUrl: "https://github.com/tommaso-berti",
        summary:
            "Software developer focused on practical product delivery, quality improvements, and maintainable web applications. I work across frontend, backend, APIs, and integrations in fashion-tech contexts, translating customer needs into reliable features.",
        compactSummary:
            "Software developer delivering reliable web features across frontend, backend, APIs, and integrations.",
    },
    it: {
        name: "Tommaso Berti",
        role: "Software Developer e Delivery Expert",
        location: "Veneto, Italia",
        email: "tommaso.berti.15@gmail.com",
        phone: "+39 3401534203",
        websiteLabel: "tommasoberti.com",
        websiteUrl: "https://www.tommasoberti.com",
        linkedinLabel: "linkedin.com/in/tommasoberti",
        linkedinUrl: "https://www.linkedin.com/in/tommasoberti/",
        githubLabel: "github.com/tommaso-berti",
        githubUrl: "https://github.com/tommaso-berti",
        summary:
            "Sviluppatore software orientato alla delivery concreta, al miglioramento della qualità e alla manutenzione di web application solide. Lavoro su frontend, backend, API e integrazioni in contesti fashion-tech, traducendo le esigenze del cliente in funzionalità affidabili.",
        compactSummary:
            "Sviluppatore software orientato alla delivery di funzionalità affidabili su frontend, backend, API e integrazioni.",
    },
};

const EDUCATION_BY_LANGUAGE = {
    en: [
        {
            period: "2016",
            title: "High School Diploma (Scientific Lyceum)",
            institution: "Italy",
            description: "Scientific path with focus on mathematics, physics, and analytical problem solving.",
        },
        {
            period: "2016-2020",
            title: "Computer Science / Engineering Studies",
            institution: "University of Padua and University of Venice",
            description: "Coursework in algorithms, systems, databases, and web development.",
        },
    ],
    it: [
        {
            period: "2016",
            title: "Diploma di Liceo Scientifico",
            institution: "Italia",
            description: "Percorso scientifico con focus su matematica, fisica e problem solving analitico.",
        },
        {
            period: "2016-2020",
            title: "Studi in Informatica / Ingegneria Informatica",
            institution: "Università di Padova e Università di Venezia",
            description: "Formazione su algoritmi, sistemi, database e sviluppo web.",
        },
    ],
};

const LANGUAGES_BY_LANGUAGE = {
    en: [
        { name: "Italian", level: "Native" },
        { name: "English", level: "Professional working proficiency" },
    ],
    it: [
        { name: "Italiano", level: "Madrelingua" },
        { name: "Inglese", level: "Livello professionale" },
    ],
};

/**
 * @param {string} language
 * @returns {CvProfile}
 */
export function getCvProfile(language) {
    return PROFILE_BY_LANGUAGE[language] || PROFILE_BY_LANGUAGE.en;
}

/**
 * @returns {Array<{ titleKey: string, items: string[] }>}
 */
export function getCvSkillGroups() {
    return SKILL_GROUPS.map((group) => ({
        titleKey: group.titleKey,
        items: group.skills.map((item) => item.label),
    }));
}

/**
 * @param {string} language
 * @returns {CvEducationItem[]}
 */
export function getCvEducation(language) {
    return EDUCATION_BY_LANGUAGE[language] || EDUCATION_BY_LANGUAGE.en;
}

/**
 * @param {string} language
 * @returns {CvLanguageItem[]}
 */
export function getCvLanguages(language) {
    return LANGUAGES_BY_LANGUAGE[language] || LANGUAGES_BY_LANGUAGE.en;
}

/**
 * @param {CvExperienceItem[]} experiences
 * @returns {CvExperienceItem[]}
 */
export function getCvExperiences(experiences) {
    if (!Array.isArray(experiences)) return [];
    return [...experiences].reverse();
}

/**
 * @param {(key: string, options?: any) => string} t
 */
export function getCvProjects(t) {
    return projects
        .filter((item) => item.category === "main")
        .slice(0, 2)
        .map((item) => ({
            id: item.id,
            title: t(`pages.projects.${item.id}.title`),
            description: t(`pages.projects.${item.id}.description`),
            url: item.secondaryAction?.href || item.githubHref || "",
            label: item.secondaryAction?.href
                ? t("pages.cv.projectLive")
                : t("pages.cv.projectRepo"),
        }));
}

function toDateValue(issuedAt) {
    if (typeof issuedAt !== "string") return 0;
    const [year = "0", month = "01"] = issuedAt.split("-");
    return Number(`${year}${month.padStart(2, "0")}`);
}

export function getCvCertifications() {
    return [...CERTIFICATIONS]
        .sort((a, b) => toDateValue(b.issuedAt) - toDateValue(a.issuedAt));
}
