import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from "@mui/material/Typography";
import ProjectsPreview from "./components/ProjectsPreview.jsx";
import MiniWebappPreview from "./components/MiniWebappPreview.jsx";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { PROJECT_TABS } from "./projectsPages/projectTabs.config.js";
import {
    buildProjectPreviewModel,
    getProjectsByCategory,
} from "./projectsPages/projectSelectors.js";

export default function Projects() {
    const { t } = useTranslation("pages.projects");
    const [tab, setTab] = useState("all");

    const filteredProjects = getProjectsByCategory(tab);

    return (
        <Stack id="projects" component="article">
            <Typography variant="h3">
                {t("title")}
            </Typography>

            <Typography variant="body1" marginY={4}>
                {t("description")}
            </Typography>

            <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="projects-tab"
                sx={{ borderBottom: 1, borderColor: "divider" }}
            >
                {PROJECT_TABS.map(({ id, labelKey }) => (
                    <Tab
                        key={id}
                        label={t(labelKey)}
                        value={id}
                        sx={{ textTransform: "none", fontWeight: 500 }}
                    />
                ))}
            </Tabs>

            {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => {
                    const previewModel = buildProjectPreviewModel(project, t);

                    return (
                        <ProjectsPreview
                            key={previewModel.id}
                            overline={previewModel.overline}
                            title={previewModel.title}
                            description={previewModel.description}
                            reversed={previewModel.reversed}
                            primaryAction={previewModel.primaryAction}
                            secondaryAction={previewModel.secondaryAction}
                            id={previewModel.id}
                            technologies={previewModel.technologies}
                            preview={
                                <MiniWebappPreview
                                    url={previewModel.previewProps.url}
                                    title={previewModel.previewProps.title}
                                    overlayLabel={previewModel.previewProps.overlayLabel}
                                    width={previewModel.previewProps.width}
                                    height={previewModel.previewProps.height}
                                    scale={previewModel.previewProps.scale}
                                />
                            }
                        />
                    );
                })
            ) : (
                <Typography variant="h4" marginY={4}>
                    No projects found
                </Typography>
            )}
        </Stack>
    );
}
