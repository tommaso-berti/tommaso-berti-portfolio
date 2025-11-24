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
        technologies: ["React", "Vite", "HTML", "CSS", "MUI", "JS"],
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
                { id: "react", icon: "react", level: 85 },
                { id: "mui", icon: "mui", level: 80 },
                { id: "javascript", icon: "javascript", level: 90 },
                { id: "nextjs", icon: "nextjs", level: 40 },
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
        technologies: ["React", "Vite", "HTML", "CSS", "MUI", "JS", "minisearch"],
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
                { id: "react", icon: "react", level: 90 },
                { id: "node", icon: "node", level: 70 },
                { id: "mongodb", icon: "mongodb", level: 60 },
                { id: "vsc", icon: "vsc", level: 75 },
            ],
            roadmapIds: ["v1", "v2", "v3"],
        },
    },
];
