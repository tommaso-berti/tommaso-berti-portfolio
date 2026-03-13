import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMemo } from "react";

import TechnologySection from "./TechnologySection.jsx";
import RoadmapSection from "./RoadmapSection.jsx";
import DifficultiesFacedSection from "./DifficultiesFacedSection.jsx";
import { useTranslation } from "../../../hooks/useTranslation.js";
import { projects } from "./projects.js";
import { TECHNOLOGIES } from "./technologies.config.js";

export default function ProjectPage() {
    const { project } = useParams();
    const { t: tProject } = useTranslation(`pages.projects.${project}.details`);
    const { t: tProjects } = useTranslation("pages.projects");

    const projectConfig = useMemo(
        () => projects.find((p) => p.id === project),
        [project]
    );

    if (!projectConfig) {
        return (
            <Stack component="article">
                <Typography variant="h3">
                    {tProjects("project_not_found", "Project not found")}
                </Typography>
            </Stack>
        );
    }

    const { details } = projectConfig;
    const detailsTechnologies = Array.isArray(details.technologies) ? details.technologies : [];
    const detailsRoadmapIds = Array.isArray(details.roadmapIds) ? details.roadmapIds : [];

    const introductionTitle = tProject("introduction.title");
    const introductionParagraphsRaw = tProject("introduction.description", {
        returnObjects: true,
    });
    const introductionParagraphs = Array.isArray(introductionParagraphsRaw)
        ? introductionParagraphsRaw
        : [];
    const difficultiesRaw = tProject('difficulties_faced', { returnObjects: true });
    const difficulties = Array.isArray(difficultiesRaw) ? difficultiesRaw : [];

    const technologies = detailsTechnologies.map(({ id, level }) => {
        const base = TECHNOLOGIES[id];

        return {
            icon: base?.icon,
            level,
            category: base?.category,
            label: tProjects(`technologies.${id}.label`, id),
            description: tProjects(`technologies.${id}.description`),
        };
    });

    const roadmap = detailsRoadmapIds.map((stepId) => ({
        title: tProject(`roadmap.${stepId}.title`),
        content: tProject(`roadmap.${stepId}.content`, { returnObjects: true }),
    }));

    return (
        <Stack id={project} component="article">
            <Stack sx={{ flex: 1 }} spacing={4}>
                <Box component="section" id="introduction">
                    <Typography variant="h3" sx={{ mb: 4 }}>
                        {introductionTitle}
                    </Typography>

                    <Stack spacing={1}>
                        {introductionParagraphs.map((para, index) => (
                            <Typography key={index}>{para}</Typography>
                        ))}
                    </Stack>
                </Box>

                <DifficultiesFacedSection difficulties={difficulties} />
                <TechnologySection technologies={technologies} />
                <RoadmapSection
                    roadmapTitle={tProjects("roadmap")}
                    roadmap={roadmap}
                    backLabel={tProjects("back")}
                    nextLabel={tProjects("next")}
                />
            </Stack>
        </Stack>
    );
}
