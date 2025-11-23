export const projects = [
    {
        id: "portfolio",
        category: "main",
        overlineKey: "main_overline",
        titleKey: "portfolio.title",
        descriptionKey: "portfolio.description",
        reversed: false,
        primaryAction: { labelKey: "primaryAction", path: "portfolio" },
        secondaryAction: { labelKey: "secondaryAction", href: "https://www.tommasoberti.com" },
        technologies: ['React', 'Vite', 'HTML', 'CSS', 'MUI', 'JS'],
        previewProps: {
            url: "https://www.tommasoberti.com",
            titleKey: "portfolio.title",
            overlayLabelKey: "live_preview",
            width: "100%",
            height: 360,
            scale: 0.8
        }
    },
    {
        id: "codexpane",
        category: "main",
        overlineKey: "main_overline",
        titleKey: "codexpane.title",
        descriptionKey: "codexpane.description",
        reversed: true,
        primaryAction: { labelKey: "primaryAction", path: "codexpane" },
        secondaryAction: { labelKey: "secondaryAction", href: "https://www.codexpane.tommasoberti.com" },
        technologies: ['React', 'Vite', 'HTML', 'CSS', 'MUI', 'JS', 'minisearch'],
        previewProps: {
            url: "https://www.codexpane.tommasoberti.com",
            titleKey: "codexpane.title",
            overlayLabelKey: "live_preview",
            width: "100%",
            height: 360,
            scale: 0.8
        }
    }
];