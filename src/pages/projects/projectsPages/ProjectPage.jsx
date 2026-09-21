import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { buildProjectDetailsModel, getProjectById } from "./projectSelectors.js";
import { projects } from "./projects.js";
import { useEnsureProjectsI18n } from "@/i18n/useEnsureProjectsI18n.js";
import ProjectDossier from "./ProjectDossier.jsx";

export default function ProjectPage() {
    const { project: projectId } = useParams();
    const ready = useEnsureProjectsI18n();
    const { t: tProject } = useTranslation("pages", { keyPrefix: `projects.${projectId}.details` });
    const { t } = useTranslation("pages", { keyPrefix: "projects" });
    const config = getProjectById(projectId);
    if (!ready) return <Stack component="article" spacing={2}><Typography component="h1" variant="h3">{t("title", { defaultValue: "Projects" })}</Typography><Typography>{t("exercises.loading")}</Typography></Stack>;
    if (!config) return <Stack component="article"><Typography component="h1" variant="h3">{t("project_not_found", { defaultValue: "Project not found" })}</Typography></Stack>;
    const details = buildProjectDetailsModel(config, tProject, t);
    const project = {
        ...config,
        title: t(config.titleKey),
        description: t(config.descriptionKey),
        previewProps: {
            ...config.previewProps,
            title: t(config.previewProps.titleKey),
            overlayLabel: t(config.previewProps.overlayLabelKey),
            loadPreviewLabel: t("load_preview"),
            loadPreviewTooltip: t("load_preview_tooltip"),
        },
    };
    const projectNumber = String(projects.findIndex(({ id }) => id === config.id) + 1).padStart(2, "0");
    return <ProjectDossier project={project} details={details} t={t} projectNumber={projectNumber} />;
}
