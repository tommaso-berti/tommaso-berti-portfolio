import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from "@mui/material/Typography";
import ProjectsPreview from "./components/ProjectsPreview.jsx";
import MiniWebappPreview from "./components/MiniWebappPreview.jsx";
import { projects } from "./projectsPages/projects.js";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const PROJECT_TABS = ["all", "main", "side", "practice"];

export default function Projects() {
    const { t } = useTranslation("pages.projects");
    const [tab, setTab] = useState("all");

    const translatedTabLabel = (tab) => {
        switch (tab) {
            case "all":
                return t("all_overline");
            case "main":
                return t("main_overline");
            case "side":
                return t("side_overline");
            case "practice":
                return t("practice_overline");
            default:
                return tab;
        }
    };

    const filteredProjects =
        tab === "all"
            ? projects
            : projects.filter((project) => project.category === tab);

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
                {PROJECT_TABS.map((tab) => (
                    <Tab
                        key={tab}
                        label={translatedTabLabel(tab)}
                        value={tab}
                        sx={{ textTransform: "none", fontWeight: 500 }}
                    />
                ))}
            </Tabs>

            {filteredProjects.length > 0 ? (
                filteredProjects.map((p) => (
                    <ProjectsPreview
                        key={p.id}
                        overline={`${t(p.overlineKey)} · ${t(p.titleKey)}`}
                        title={t(p.titleKey)}
                        description={t(p.descriptionKey)}
                        reversed={p.reversed}
                        primaryAction={{
                            label: t(p.primaryAction.labelKey),
                            path: p.primaryAction.path,
                        }}
                        secondaryAction={{
                            label: t(p.secondaryAction.labelKey),
                            href: p.secondaryAction.href,
                        }}
                        id={p.id}
                        technologies={p.details.technologies.map(({ id }) =>
                            t(`technologies.${id}.label`, id)
                        )}
                        preview={
                            <MiniWebappPreview
                                url={p.previewProps.url}
                                title={t(p.previewProps.titleKey)}
                                overlayLabel={t(p.previewProps.overlayLabelKey)}
                                width={p.previewProps.width}
                                height={p.previewProps.height}
                                scale={p.previewProps.scale}
                            />
                        }
                    />
                ))
            ) : (
                <Typography variant="h4" marginY={4}>
                    No projects found
                </Typography>
            )}
        </Stack>
    );
}
