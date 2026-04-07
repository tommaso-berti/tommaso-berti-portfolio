import {
    SiCaddy,
    SiCloudflare,
    SiCss,
    SiExpress,
    SiGit,
    SiGithubactions,
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
    SiReactrouter,
    SiReact,
    SiRedux,
    SiSimpleicons,
    SiIgdb,
    SiTailwindcss,
    SiSwagger,
    SiVite,
    SiWebstorm,
    SiYaml,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

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
    igdb: {
        id: "igdb",
        component: SiIgdb,
        color: "#9147FF",
        title: "IGDB",
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
    express: {
        id: "express",
        component: SiExpress,
        color: "#000000",
        title: "Express",
    },
    passport: {
        id: "passport",
        component: SiSimpleicons,
        color: "#3B82F6",
        title: "Passport",
        colorPolicy: "fallback",
    },
    "express-session": {
        id: "express-session",
        component: SiSimpleicons,
        color: "#0EA5E9",
        title: "express-session",
        colorPolicy: "fallback",
    },
    vite: {
        id: "vite",
        component: SiVite,
        color: "#646CFF",
        title: "Vite",
    },
    "react-router": {
        id: "react-router",
        component: SiReactrouter,
        color: "#CA4245",
        title: "React Router",
    },
    "tanstack-query": {
        id: "tanstack-query",
        component: SiSimpleicons,
        color: "#FF4154",
        title: "TanStack Query",
        colorPolicy: "fallback",
    },
    "framer-motion": {
        id: "framer-motion",
        component: SiSimpleicons,
        color: "#0055FF",
        title: "Framer Motion",
        colorPolicy: "fallback",
    },
    i18next: {
        id: "i18next",
        component: SiSimpleicons,
        color: "#26A69A",
        title: "i18next",
        colorPolicy: "fallback",
    },
    typescript: {
        id: "typescript",
        component: SiSimpleicons,
        color: "#3178C6",
        title: "TypeScript",
        colorPolicy: "fallback",
    },
    fastify: {
        id: "fastify",
        component: SiSimpleicons,
        color: "#000000",
        title: "Fastify",
        colorPolicy: "fallback",
    },
    zod: {
        id: "zod",
        component: SiSimpleicons,
        color: "#3E67B1",
        title: "Zod",
        colorPolicy: "fallback",
    },
    "github-actions": {
        id: "github-actions",
        component: SiGithubactions,
        color: "#2088FF",
        title: "GitHub Actions",
    },
    "swagger-openapi": {
        id: "swagger-openapi",
        component: SiSwagger,
        color: "#85EA2D",
        title: "Swagger / OpenAPI",
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
        component: VscVscode,
        color: "#2F80ED",
        title: "VS Code",
        colorPolicy: "fallback",
    },
    chatgpt: { id: "chatgpt", component: SiOpenai, color: "#412991", title: "ChatGPT" },
    bash: { id: "bash", component: SiGnubash, color: "#4EAA25", title: "Bash" },
    caddy: { id: "caddy", component: SiCaddy, color: "#1F88C0", title: "Caddy" },
    cloudflare: {
        id: "cloudflare",
        component: SiCloudflare,
        color: "#F38020",
        title: "Cloudflare",
    },
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
