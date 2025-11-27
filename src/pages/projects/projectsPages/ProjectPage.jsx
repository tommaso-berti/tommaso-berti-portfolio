import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TechnologySection from "./TechnologySection.jsx";
import RoadmapSection from "./RoadmapSection.jsx";
import { useMemo } from "react";
import { useTranslation } from "../../../hooks/useTranslation.js";
import { projects } from "./projects.js";

export default function ProjectPage() {
    const { project } = useParams();
    const { t } = useTranslation(`pages.projects.${project}.details`);
    const { t: tProjects } = useTranslation("pages.projects");

    const projectConfig = useMemo(
        () => projects.find(p => p.id === project),
        [project]
    );

    if (!projectConfig) {return (
            <Stack component="article">
                <Typography variant="h3">
                    {tProjects("project_not_found", "Project not found")}
                </Typography>
            </Stack>
        );
    }

    const { details } = projectConfig;

    const introductionTitle = t("introduction.title");
    const introductionParagraphs = t("introduction.description", {
        returnObjects: true,
    });

    const technologies = details.technologies.map(tech => ({
        icon: tech.icon,
        level: tech.level,
        description: t(`technologies.${tech.id}.description`),
        category: tech.category,
        label: tech.label
    }));

    const roadmap = details.roadmapIds.map(stepId => ({
        title: t(`roadmap.${stepId}.title`),
        content: t(`roadmap.${stepId}.content`, {returnObjects: true}),
    }));

    return (
        <Stack id={project} component="article">
            <Stack sx={{ flex: 1 }} spacing={4}>

                <Box component="section" id="introduction">
                    <Typography variant="h3" sx={{ mb: 4 }}>
                        {introductionTitle}
                    </Typography>

                    <Stack spacing={1}>
                        { introductionParagraphs.map((para, index) => (
                            <Typography key={index}>
                                    {para}
                            </Typography>
                        ))}
                    </Stack>
                </Box>

                <Box component="section" id="technologies">
                    <TechnologySection
                        technologies={technologies}
                    />
                </Box>

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
