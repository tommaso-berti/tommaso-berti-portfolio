import { getBrandIconDefinition } from "../../config/brandIcons.js";

const AREA_ICON_ID_MAP = {
    frontend: ["html"],
    fullstack: ["react", "nodejs"],
    javascript: ["javascript"],
    "tooling-workflow": ["git"],
    database: ["mongodb"],
};

const CERT_ICON_OVERRIDE_MAP = {
    "codecademy-html-css-github-pages": ["html", "css", "github"],
    "codecademy-learn-css": ["css"],
    "codecademy-intermediate-javascript": ["javascript"],
    "codecademy-learn-javascript": ["javascript"],
    "codecademy-github-best-practices": ["github"],
    "codecademy-command-line": ["bash"],
    "codecademy-full-stack-engineer-career-path": [
        "html",
        "css",
        "javascript",
        "react",
        "nodejs",
        "redux",
        "git",
        "github",
        "bash",
        "express",
        "postgresql",
        "sql",
        "yaml",
        "postman",
    ],
};

function getIconIdsForCertification(certification) {
    if (!certification) {
        return ["certification-fallback"];
    }

    return (
        CERT_ICON_OVERRIDE_MAP[certification.id] ||
        AREA_ICON_ID_MAP[certification.areaKey] ||
        ["certification-fallback"]
    );
}

export function getCertificationIconDefinitions(certification) {
    return getIconIdsForCertification(certification).map((iconId) => getBrandIconDefinition(iconId));
}
