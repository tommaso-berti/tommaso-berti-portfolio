import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import MotionPanel from "../../../features/mission-ui/MotionPanel.jsx";
import SpaceButton from "../../../features/mission-ui/SpaceButton.jsx";
import StatusIndicator from "../../../features/mission-ui/StatusIndicator.jsx";
import TechnicalLabel from "../../../features/mission-ui/TechnicalLabel.jsx";
import TelemetryStrip from "../../../features/mission-ui/TelemetryStrip.jsx";
import ProjectApplicationModule from "./ProjectApplicationModule.jsx";
import TechnologySection from "./TechnologySection.jsx";
import DifficultiesFacedSection from "./DifficultiesFacedSection.jsx";
import SearchMechanicsSection from "./SearchMechanicsSection.jsx";
import LessonsLearnedSection from "./LessonsLearnedSection.jsx";
import RoadmapSection from "./RoadmapSection.jsx";
import ProjectMissionTabs from "./ProjectMissionTabs.jsx";

const MODULES = ["overview", "system", "interface", "development"];

export default function ProjectDossier({ project, details, t, projectNumber }) {
    const [active, setActive] = useState("overview");
    const technologies = details.technologies.slice(0, 5);
    const telemetry = [
        { label: t("dossier.projectType"), value: t(project.overlineKey) },
        { label: t("dossier.primaryStack"), value: technologies[0]?.label || "—" },
        { label: t("dossier.interface"), value: technologies.find((item) => item.label === "MUI")?.label || technologies[1]?.label || "—" },
        { label: t("dossier.channel"), value: t("dossier.live") },
    ];
    return <Stack component="article" spacing={{ xs: 2.2, md: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}><TechnicalLabel>{`${t("dossier.archive")} / ${project.id.toUpperCase()} / ${t("dossier.mission")} ${projectNumber}`}</TechnicalLabel><StatusIndicator>{t("dossier.projectReady")}</StatusIndicator></Stack>
        <Box component="section" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0,.88fr) minmax(380px,1.12fr)" }, gap: { xs: 2.5, md: 3.5 }, alignItems: "center" }}><Stack spacing={1.5}><TechnicalLabel>{`${t("dossier.mission")} ${projectNumber} // ${t(project.overlineKey)}`}</TechnicalLabel><Typography component="h1" variant="h1" sx={{ fontSize: "clamp(3.1rem, 7vw, 5.6rem)", wordBreak: "break-word" }}>{project.title}</Typography><Typography variant="body1" color="text.secondary">{project.description}</Typography><Stack direction="row" gap={.65} flexWrap="wrap">{technologies.map((technology) => <Chip key={technology.label} label={technology.label} size="small" variant="outlined" />)}</Stack><Stack direction="row" gap={.8} flexWrap="wrap" sx={{ pt: .8 }}><SpaceButton component={Link} href={project.secondaryAction.href} target="_blank" rel="noreferrer" variant="contained">{t("dossier.launch")} →</SpaceButton>{project.githubHref ? <Button component={Link} href={project.githubHref} target="_blank" rel="noreferrer" variant="outlined">{t("dossier.source")}</Button> : null}<Button component={RouterLink} to="/projects" variant="outlined">{t("back")}</Button></Stack></Stack><ProjectApplicationModule project={project} preview={project.previewProps} t={t} /></Box>
        <TelemetryStrip items={telemetry} />
        <ProjectMissionTabs modules={MODULES} active={active} onChange={setActive} t={t} />
        <MotionPanel component="section" sx={{ p: { xs: 1.5, md: 2.4 }, minHeight: 280 }}><TechnicalLabel>{`0${MODULES.indexOf(active) + 1} // ${t(`dossier.moduleLabels.${active}`)}`}</TechnicalLabel><Box sx={{ mt: 1.5 }}>{active === "overview" ? <Stack spacing={2.5}><Box><Typography variant="h4" sx={{ mb: 1 }}>{details.introductionTitle}</Typography>{details.introductionParagraphs.map((paragraph) => <Typography key={paragraph} color="text.secondary" sx={{ mb: 1 }}>{paragraph}</Typography>)}</Box><DifficultiesFacedSection difficulties={details.difficulties} /></Stack> : null}{active === "system" ? <TechnologySection technologies={details.technologies} /> : null}{active === "interface" ? <Stack spacing={2}><ProjectApplicationModule project={project} preview={project.previewProps} t={t} /><SearchMechanicsSection title={t("search_mechanics_title")} items={details.searchMechanics} /></Stack> : null}{active === "development" ? <Stack spacing={3}><LessonsLearnedSection title={t("lessons_learned_title")} items={details.lessonsLearned} /><RoadmapSection roadmapTitle={t("roadmap")} roadmap={details.roadmap} backLabel={t("back")} nextLabel={t("next")} t={t} /></Stack> : null}</Box></MotionPanel>
        <MotionPanel component="section" sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}><Box><Typography variant="h5">{t("dossier.channelReady")}</Typography><TechnicalLabel sx={{ mt: .4 }}>{t("dossier.channelNote")}</TechnicalLabel></Box><SpaceButton component={Link} href={project.secondaryAction.href} target="_blank" rel="noreferrer" variant="contained">{t("dossier.launch")} →</SpaceButton></MotionPanel>
    </Stack>;
}
