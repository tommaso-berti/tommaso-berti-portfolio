export const projects = [
    {
        id: "portfolio",
        category: "main",
        overlineKey: "main_overline",
        titleKey: "portfolio.title",
        descriptionKey: "portfolio.description",
        reversed: false,
        primaryAction: { labelKey: "primaryAction", path: "portfolio" },
        secondaryAction: {
            labelKey: "secondaryAction",
            href: "https://www.tommasoberti.com",
        },
        previewProps: {
            url: "https://www.tommasoberti.com",
            titleKey: "portfolio.title",
            overlayLabelKey: "live_preview",
            width: "100%",
            height: 360,
            scale: 0.8,
        },
        details: {
            technologies: [
                { id: "react", icon: "react", level: 85, label: "React", category: "frontend" },
                { id: "mui", icon: "mui", level: 80, label: "MUI", category: "frontend" },
                { id: "javascript", icon: "javascript", level: 90, label: "JavaScript", category: "frontend" },
                { id: "github", icon: "github", level: 65, label: "GitHub", category: "tooling" },
                { id: "webstorm", icon: "webstorm", level: 55, label: "Webstorm", category: "tooling" },
                { id: "caddy", icon: "caddy", level: 60, label: "Caddy", category: "hosting" }
            ],
            roadmapIds: ["v1", "v2", "v3"],
        },
    },
    {
        id: "codexpane",
        category: "main",
        overlineKey: "main_overline",
        titleKey: "codexpane.title",
        descriptionKey: "codexpane.description",
        reversed: true,
        primaryAction: { labelKey: "primaryAction", path: "codexpane" },
        secondaryAction: {
            labelKey: "secondaryAction",
            href: "https://www.codexpane.tommasoberti.com",
        },
        previewProps: {
            url: "https://www.codexpane.tommasoberti.com",
            titleKey: "codexpane.title",
            overlayLabelKey: "live_preview",
            width: "100%",
            height: 360,
            scale: 0.8,
        },
        details: {
            technologies: [
                { id: "react", icon: "react", level: 85, label: "React", category: "frontend" },
                { id: "mui", icon: "mui", level: 80, label: "MUI", category: "frontend" },
                { id: "javascript", icon: "javascript", level: 90, label: "JavaScript", category: "frontend" },
                { id: "github", icon: "github", level: 65, label: "GitHub", category: "tooling" },
                { id: "webstorm", icon: "webstorm", level: 55, label: "Webstorm", category: "tooling" },
                { id: "caddy", icon: "caddy", level: 60, label: "Caddy", category: "hosting" },
                { id: "minisearch", icon: "minisearch", level: 50, label: "Minisearch", category: "libraries" },
                { id: "tailwindcss", icon: "tailwindcss", level: 10, label: "TailwindCSS", category: "frontend" },
                { id: "css", icon: "css", level: 15, label: "CSS", category: "frontend" },

            ],
            roadmapIds: ["v1", "v2", "v3", "v4"],
        },
    },
];
