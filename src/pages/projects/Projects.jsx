import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { PROJECT_TABS } from "./projectsPages/projectTabs.config.js";
import { buildMissionModel, getProjectsByCategory } from "./projectsPages/projectSelectors.js";
import { useEnsureProjectsI18n } from "../../i18n/useEnsureProjectsI18n.js";
import SectionHeader from "../../features/mission-ui/SectionHeader.jsx";
import MissionCard from "../../features/mission-ui/MissionCard.jsx";
import MotionPanel from "../../features/mission-ui/MotionPanel.jsx";
import SpaceButton from "../../features/mission-ui/SpaceButton.jsx";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";
import MiniWebappPreview from "./components/MiniWebappPreview.jsx";

const ExercisesSection = lazy(() => import("./components/ExercisesSection.jsx"));

export default function Projects() {
    const ready = useEnsureProjectsI18n();
    const { t } = useTranslation("pages", { keyPrefix: "projects" });
    const [tab, setTab] = useState("all");
    const [selectedId, setSelectedId] = useState("logra");
    const isPractice = tab === "practice";
    const projects = useMemo(() => isPractice ? [] : getProjectsByCategory(tab).map((project, index) => buildMissionModel(project, t, index)), [isPractice, tab, t]);
    useEffect(() => { if (projects.length && !projects.some(({ id }) => id === selectedId)) setSelectedId(projects[0].id); }, [projects, selectedId]);
    if (!ready) return <Typography>{t("exercises.loading")}</Typography>;
    const selected = projects.find(({ id }) => id === selectedId);
    return <Stack id="projects" component="article" spacing={2.5}><SectionHeader eyebrow="02 // MISSION ARCHIVE" title={t("title")} note="FILTER THE ARCHIVE" /><Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800 }}>{t("description")}</Typography><Stack direction="row" gap={.7} flexWrap="wrap">{PROJECT_TABS.map(({ id, labelKey }) => <Button key={id} onClick={() => setTab(id)} variant={tab === id ? "contained" : "outlined"} aria-pressed={tab === id}>{t(labelKey)}</Button>)}</Stack>
        {isPractice ? <Suspense fallback={<Typography>{t("exercises.loading")}</Typography>}><ExercisesSection isActive /></Suspense> : <><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 1.2 }}>{projects.map((mission) => <MissionCard key={mission.id} mission={mission} selected={mission.id === selectedId} onSelect={() => setSelectedId(mission.id)} />)}</Box>{selected ? <MotionPanel component="section" sx={{ p: { xs: 1.7, md: 2.3 } }}><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr auto" }, gap: 2, alignItems: "start" }}><Box><TechnicalLabel>{`${selected.overline} // ACTIVE`}</TechnicalLabel><Typography component="h2" variant="h4" sx={{ mt: .5, mb: .7 }}>{selected.title}</Typography><Typography variant="body2" color="text.secondary" sx={{ maxWidth: 720 }}>{selected.description}</Typography><Stack direction="row" gap={.55} flexWrap="wrap" sx={{ mt: 1.4 }}>{selected.technologies.map((tech) => <Chip key={tech} label={tech} size="small" variant="outlined" />)}</Stack></Box><Stack direction={{ xs: "row", md: "column" }} gap={.8} flexWrap="wrap"><SpaceButton component={RouterLink} to={`/projects/${selected.id}`} variant="contained">{selected.primaryAction.label} →</SpaceButton><Button component={Link} href={selected.secondaryAction.href} target="_blank" rel="noreferrer" variant="outlined">{selected.secondaryAction.label}</Button>{selected.githubAction ? <Button component={Link} href={selected.githubAction.href} target="_blank" rel="noreferrer" variant="outlined">GitHub</Button> : null}</Stack></Box><Box sx={{ mt: 2, maxWidth: 520 }}><MiniWebappPreview url={selected.previewProps.url} title={selected.previewProps.title} overlayLabel={selected.previewProps.overlayLabel} width="100%" height={250} scale={.68} deferLoad loadPreviewLabel={selected.previewProps.loadPreviewLabel} loadPreviewTooltip={selected.previewProps.loadPreviewTooltip} /></Box></MotionPanel> : null}</>}
    </Stack>;
}
