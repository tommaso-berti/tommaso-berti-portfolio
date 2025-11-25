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
                { id: "react", icon: "react", level: 85, label: "React", category: "Frontend" },
                { id: "mui", icon: "mui", level: 80, label: "MUI", category: "Frontend" },
                { id: "javascript", icon: "javascript", level: 90, label: "JavaScript", category: "Frontend" },
                { id: "github", icon: "github", level: 90, label: "GitHub", category: "Tooling" },
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
                { id: "react", icon: "react", level: 90, label: "React", category: "Frontend" },
                { id: "node", icon: "node", level: 70, label: "Node", category: "Backend" },
                { id: "mongodb", icon: "mongodb", level: 60, label: "Mongo", category: "Database" },
                { id: "vsc", icon: "vsc", level: 75, label: "Vsc", category: "Tooling" },
            ],
            roadmapIds: ["v1", "v2", "v3"],
        },
    },
];
