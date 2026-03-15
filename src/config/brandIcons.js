import {
    SiCaddy,
    SiCss,
    SiGit,
    SiGithub,
    SiGnubash,
    SiHtml5,
    SiJavascript,
    SiMongodb,
    SiMui,
    SiNodedotjs,
    SiNginx,
    SiOpenai,
    SiPostgresql,
    SiPostman,
    SiReact,
    SiRedux,
    SiSimpleicons,
    SiTailwindcss,
    SiVscodium,
    SiWebstorm,
    SiYaml,
} from "react-icons/si";

/**
 * @typedef {Object} BrandIconDefinition
 * @property {string} id
 * @property {import("react-icons").IconType} component
 * @property {string} color
 * @property {string} [title]
 * @property {"brand" | "fallback"} [colorPolicy]
 */

/** @type {Record<string, BrandIconDefinition>} */
const BRAND_ICON_REGISTRY = {
    html: { id: "html", component: SiHtml5, color: "#E34F26", title: "HTML5" },
    css: { id: "css", component: SiCss, color: "#663399", title: "CSS" },
    tailwindcss: {
        id: "tailwindcss",
        component: SiTailwindcss,
        color: "#06B6D4",
        title: "Tailwind CSS",
    },
    mui: { id: "mui", component: SiMui, color: "#007FFF", title: "MUI" },
    javascript: {
        id: "javascript",
        component: SiJavascript,
        color: "#F7DF1E",
        title: "JavaScript",
    },
    react: { id: "react", component: SiReact, color: "#61DAFB", title: "React" },
    redux: { id: "redux", component: SiRedux, color: "#764ABC", title: "Redux" },
    mongodb: {
        id: "mongodb",
        component: SiMongodb,
        color: "#47A248",
        title: "MongoDB",
    },
    postgresql: {
        id: "postgresql",
        component: SiPostgresql,
        color: "#336791",
        title: "PostgreSQL",
    },
    nodejs: {
        id: "nodejs",
        component: SiNodedotjs,
        color: "#339933",
        title: "Node.js",
    },
    nginx: {
        id: "nginx",
        component: SiNginx,
        color: "#009639",
        title: "Nginx",
    },
    yaml: {
        id: "yaml",
        component: SiYaml,
        color: "#CB171E",
        title: "YAML",
    },
    sql: {
        id: "sql",
        component: SiSimpleicons,
        color: "#2563EB",
        title: "SQL",
        colorPolicy: "fallback",
    },
    codex: { id: "codex", component: SiOpenai, color: "#10A37F", title: "Codex" },
    git: { id: "git", component: SiGit, color: "#F05032", title: "Git" },
    github: { id: "github", component: SiGithub, color: "#181717", title: "GitHub" },
    postman: { id: "postman", component: SiPostman, color: "#FF6C37", title: "Postman" },
    webstorm: {
        id: "webstorm",
        component: SiWebstorm,
        color: "#000000",
        title: "WebStorm",
    },
    vscode: {
        id: "vscode",
        component: SiVscodium,
        color: "#2F80ED",
        title: "VS Code",
        colorPolicy: "fallback",
    },
    chatgpt: { id: "chatgpt", component: SiOpenai, color: "#412991", title: "ChatGPT" },
    bash: { id: "bash", component: SiGnubash, color: "#4EAA25", title: "Bash" },
    caddy: { id: "caddy", component: SiCaddy, color: "#1F88C0", title: "Caddy" },
    minisearch: {
        id: "minisearch",
        component: SiJavascript,
        color: "#F7DF1E",
        title: "MiniSearch (fallback to JavaScript)",
        colorPolicy: "fallback",
    },
};

const FALLBACK_ICON = {
    id: "fallback",
    component: SiSimpleicons,
    color: "#6B7280",
    title: "Technology",
    colorPolicy: "fallback",
};

export function getBrandIconDefinition(iconId) {
    return BRAND_ICON_REGISTRY[iconId] || FALLBACK_ICON;
}
