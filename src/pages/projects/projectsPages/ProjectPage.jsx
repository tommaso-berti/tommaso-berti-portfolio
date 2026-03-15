import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import TechnologySection from "./TechnologySection.jsx";
import RoadmapSection from "./RoadmapSection.jsx";
import DifficultiesFacedSection from "./DifficultiesFacedSection.jsx";
import SearchMechanicsSection from "./SearchMechanicsSection.jsx";
import LessonsLearnedSection from "./LessonsLearnedSection.jsx";
import { useTranslation } from "../../../hooks/useTranslation.js";
import {
    buildProjectDetailsModel,
    getProjectById,
} from "./projectSelectors.js";

export default function ProjectPage() {
    const { project } = useParams();
    const { t: tProject } = useTranslation(`pages.projects.${project}.details`);
    const { t: tProjects } = useTranslation("pages.projects");

    const projectConfig = getProjectById(project);

    if (!projectConfig) {
        return (
            <Stack component="article">
                <Typography variant="h3">
                    {tProjects("project_not_found", "Project not found")}
                </Typography>
            </Stack>
        );
    }

    const detailsModel = buildProjectDetailsModel(projectConfig, tProject, tProjects);

    return (
        <Stack id={project} component="article">
            <Stack sx={{ flex: 1 }} spacing={4}>
                <Box component="section" id="introduction">
                    <Typography variant="h3" sx={{ mb: 4 }}>
                        {detailsModel.introductionTitle}
                    </Typography>

                    <Stack spacing={1}>
                        {detailsModel.introductionParagraphs.map((para, index) => (
                            <Typography key={index}>{para}</Typography>
                        ))}
                    </Stack>
                </Box>

                <DifficultiesFacedSection difficulties={detailsModel.difficulties} />
                <SearchMechanicsSection
                    title={tProjects("search_mechanics_title")}
                    items={detailsModel.searchMechanics}
                />
                <LessonsLearnedSection
                    title={tProjects("lessons_learned_title")}
                    items={detailsModel.lessonsLearned}
                />
                <TechnologySection technologies={detailsModel.technologies} />
                <RoadmapSection
                    roadmapTitle={tProjects("roadmap")}
                    roadmap={detailsModel.roadmap}
                    backLabel={tProjects("back")}
                    nextLabel={tProjects("next")}
                />
            </Stack>
        </Stack>
    );
}
