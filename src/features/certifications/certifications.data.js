/**
 * @typedef {Object} Certification
 * @property {string} id
 * @property {string} title
 * @property {string} platform
 * @property {string} areaKey
 * @property {string} issuedAt
 * @property {"completed" | "in-progress" | string} status
 * @property {string} url
 * @property {boolean} featured
 * @property {string} [credentialId]
 */

const PROFILE_PLACEHOLDER_URL = "https://www.codecademy.com/profiles/Tommi97";

/** @type {Certification[]} */
export const CERTIFICATIONS = [
    {
        id: "codecademy-html-css-github-pages",
        title: "Build a Website with HTML, CSS, and GitHub Pages Skill Path",
        platform: "Codecademy",
        areaKey: "frontend",
        issuedAt: "2025-08",
        status: "completed",
        url: "https://www.codecademy.com/profiles/Tommi97/certificates/5cadfefe5f1de806e9704577",
        featured: true,
    },
    {
        id: "codecademy-intermediate-javascript",
        title: "Learn Intermediate JavaScript Course",
        platform: "Codecademy",
        areaKey: "javascript",
        issuedAt: "2024-12",
        status: "completed",
        url: "https://www.codecademy.com/profiles/Tommi97/certificates/512386fdc7f6c934f98b01e6afa8285a",
        featured: true,
    },
    {
        id: "codecademy-github-best-practices",
        title: "Learn GitHub: Best Practices Course",
        platform: "Codecademy",
        areaKey: "tooling-workflow",
        issuedAt: "2024-12",
        status: "completed",
        url: "https://www.codecademy.com/profiles/Tommi97/certificates/38d1b4a390d74a37af5cb1177556d047",
        featured: true,
    },
    {
        id: "codecademy-command-line",
        title: "Learn the Command Line Course",
        platform: "Codecademy",
        areaKey: "tooling-workflow",
        issuedAt: "2024-11",
        status: "completed",
        url: "https://www.codecademy.com/profiles/Tommi97/certificates/c87ba0541f8be78bc2f4ba1128233f6f",
        featured: false,
    },
    {
        id: "codecademy-learn-css",
        title: "Learn CSS Course",
        platform: "Codecademy",
        areaKey: "frontend",
        issuedAt: "2024-10",
        status: "completed",
        url: "https://www.codecademy.com/profiles/Tommi97/certificates/9a5bb1fc45b4281af1fffec93b0aaf05",
        featured: false,
    },
    {
        id: "codecademy-learn-html",
        title: "Learn HTML Course",
        platform: "Codecademy",
        areaKey: "frontend",
        issuedAt: "2024-10",
        status: "completed",
        url: "https://www.codecademy.com/profiles/Tommi97/certificates/9eb0741e5ebef1f9f58a53bfac67d3a7",
        featured: false,
    },
    {
        id: "codecademy-learn-javascript",
        title: "Learn JavaScript Course",
        platform: "Codecademy",
        areaKey: "javascript",
        issuedAt: "2024-09",
        status: "completed",
        url: "https://www.codecademy.com/profiles/Tommi97/certificates/705dcb15de0da4dd9d9fc4f3274b430e",
        featured: false,
    },
    {
        id: "codecademy-learn-mongodb",
        title: "Learn MongoDB Course",
        platform: "Codecademy",
        areaKey: "database",
        issuedAt: "2024-09",
        status: "completed",
        url: "https://www.codecademy.com/profiles/Tommi97/certificates/808a989d563e4e85ba3495d4d14dce5d",
        featured: false,
        credentialId: "66DEF771D0",
    },
];

export const FEATURED_CERTIFICATIONS = CERTIFICATIONS.filter((item) => item.featured).slice(0, 3);
