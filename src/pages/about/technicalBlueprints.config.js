const node = (id, iconId, side, dotX, dotY) => ({ id, iconId, side, dotX, dotY });

/**
 * Blueprint data stays separate from rendering so the visual map can be tuned
 * against the original drawings without mixing coordinates with UI logic.
 */
export const TECH_BLUEPRINTS = [
    {
        id: "frontend",
        asset: "/assets/blueprints/iss.png",
        nodes: [
            node("react", "react", "left", 17, 31),
            node("typescript", "typescript", "right", 83, 31),
            node("mui", "mui", "left", 36, 43),
            node("html", "html", "right", 64, 43),
            node("css", "css", "left", 27, 51),
            node("javascript", "javascript", "right", 50, 47),
        ],
    },
    {
        id: "runtime",
        asset: "/assets/blueprints/artemis.png",
        nodes: [
            node("nodejs", "nodejs", "left", 38, 45),
            node("express", "express", "right", 54, 45),
            node("fastify", "fastify", "left", 42, 58),
            node("caddy", "caddy", "right", 72, 24),
            node("nginx", "nginx", "left", 88, 40),
            node("cloudflare", "cloudflare", "right", 76, 59),
        ],
    },
    {
        id: "database",
        asset: "/assets/blueprints/lso.png",
        nodes: [
            node("mongodb", "mongodb", "left", 29, 34),
            node("postgresql", "postgresql", "right", 72, 34),
            node("sql", "sql", "left", 50, 35),
            node("yaml", "yaml", "right", 22, 45),
            node("igdb", "igdb", "left", 78, 45),
            node("zod", "zod", "right", 78, 69),
        ],
    },
    {
        id: "languages",
        asset: "/assets/blueprints/saturn-V.png",
        nodes: [
            node("typescript", "typescript", "left", 47, 22),
            node("javascript", "javascript", "right", 47, 34),
            node("html", "html", "left", 47, 49),
            node("css", "css", "right", 47, 63),
            node("bash", "bash", "left", 47, 76),
            node("sql", "sql", "right", 81, 25),
        ],
    },
    {
        id: "tools",
        asset: "/assets/blueprints/dyson-sphere.png",
        nodes: [
            node("git", "git", "left", 22, 24),
            node("github", "github", "right", 35, 30),
            node("github-actions", "github-actions", "left", 36, 43),
            node("postman", "postman", "right", 82, 24),
            node("webstorm", "webstorm", "left", 80, 42),
            node("codex", "codex", "right", 83, 57),
        ],
    },
];

export function getTechnicalBlueprint(id) {
    return TECH_BLUEPRINTS.find((blueprint) => blueprint.id === id) || TECH_BLUEPRINTS[0];
}
