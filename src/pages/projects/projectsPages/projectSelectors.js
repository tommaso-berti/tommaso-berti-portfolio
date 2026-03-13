import { projects } from "./projects.js";
import { TECHNOLOGIES } from "./technologies.config.js";

export function getProjectsByCategory(categoryId) {
    if (categoryId === "all") return projects;
    return projects.filter((project) => project.category === categoryId);
}

export function getProjectById(projectId) {
    return projects.find((project) => project.id === projectId);
}

export function buildProjectPreviewModel(project, tProjects) {
    return {
        id: project.id,
        overline: `${tProjects(project.overlineKey)} · ${tProjects(project.titleKey)}`,
        title: tProjects(project.titleKey),
        description: tProjects(project.descriptionKey),
        reversed: project.reversed,
        primaryAction: {
            label: tProjects(project.primaryAction.labelKey),
            path: project.primaryAction.path,
        },
        secondaryAction: {
            label: tProjects(project.secondaryAction.labelKey),
            href: project.secondaryAction.href,
        },
        technologies: project.details.technologies.map(({ id }) =>
            tProjects(`technologies.${id}.label`, id)
        ),
        previewProps: {
            url: project.previewProps.url,
            title: tProjects(project.previewProps.titleKey),
            overlayLabel: tProjects(project.previewProps.overlayLabelKey),
            width: project.previewProps.width,
            height: project.previewProps.height,
            scale: project.previewProps.scale,
        },
    };
}

export function buildProjectDetailsModel(projectConfig, tProject, tProjects) {
    const details = projectConfig?.details ?? {};
    const detailsTechnologies = Array.isArray(details.technologies) ? details.technologies : [];
    const detailsRoadmapIds = Array.isArray(details.roadmapIds) ? details.roadmapIds : [];

    const introductionParagraphsRaw = tProject("introduction.description", {
        returnObjects: true,
    });
    const difficultiesRaw = tProject("difficulties_faced", { returnObjects: true });

    return {
        introductionTitle: tProject("introduction.title"),
        introductionParagraphs: Array.isArray(introductionParagraphsRaw)
            ? introductionParagraphsRaw
            : [],
        difficulties: Array.isArray(difficultiesRaw) ? difficultiesRaw : [],
        technologies: detailsTechnologies.map(({ id, level }) => {
            const base = TECHNOLOGIES[id];

            return {
                icon: base?.icon,
                level,
                category: base?.category,
                label: tProjects(`technologies.${id}.label`, id),
                description: tProjects(`technologies.${id}.description`),
            };
        }),
        roadmap: detailsRoadmapIds.map((stepId) => ({
            title: tProject(`roadmap.${stepId}.title`),
            content: tProject(`roadmap.${stepId}.content`, { returnObjects: true }),
        })),
    };
}
