import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PROJECT_TABS } from "./projectsPages/projectTabs.config.js";
import { buildMissionModel, getProjectsByCategory } from "./projectsPages/projectSelectors.js";
import { useEnsureProjectsI18n } from "@/i18n/useEnsureProjectsI18n.js";
import SectionHeader from "@/features/mission-ui/SectionHeader.jsx";
import MissionCard from "@/features/mission-ui/MissionCard.jsx";
import ProjectMissionTabs from "./projectsPages/ProjectMissionTabs.jsx";

const ExercisesSection = lazy(() => import("./components/ExercisesSection.jsx"));

export default function Projects() {
    const ready = useEnsureProjectsI18n();
    const { t } = useTranslation("pages", { keyPrefix: "projects" });
    const [tab, setTab] = useState("all");
    const [selectedId, setSelectedId] = useState(null);
    const gridRef = useRef(null);
    const isPractice = tab === "practice";
    const projects = useMemo(() => isPractice ? [] : getProjectsByCategory(tab).map((project, index) => buildMissionModel(project, t, index)), [isPractice, tab, t]);
    const displayProjects = useMemo(() => {
        if (!selectedId) return projects;
        const selectedIndex = projects.findIndex(({ id }) => id === selectedId);
        if (selectedIndex < 1 || selectedIndex % 2 === 0) return projects;
        const reordered = [...projects];
        [reordered[selectedIndex - 1], reordered[selectedIndex]] = [reordered[selectedIndex], reordered[selectedIndex - 1]];
        return reordered;
    }, [projects, selectedId]);

    useEffect(() => {
        if (projects.length && selectedId && !projects.some(({ id }) => id === selectedId)) setSelectedId(projects[0].id);
    }, [projects, selectedId]);

    const selectProject = (nextId) => {
        const cards = Array.from(gridRef.current?.querySelectorAll("[data-project-card]") ?? []);
        const firstRects = new Map(cards.map((card) => [card, card.getBoundingClientRect()]));
        setSelectedId((currentId) => currentId === nextId ? null : nextId);
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

        requestAnimationFrame(() => requestAnimationFrame(() => {
            cards.forEach((card) => {
                const first = firstRects.get(card);
                const last = card.getBoundingClientRect();
                if (!first || !last.width || !last.height) return;
                card.animate(
                    [{ transformOrigin: "top left", transform: `translate(${first.left - last.left}px,${first.top - last.top}px) scale(${first.width / last.width},${first.height / last.height})` }, { transformOrigin: "top left", transform: "translate(0,0) scale(1,1)" }],
                    { duration: 560, easing: "cubic-bezier(.16,.84,.2,1)" },
                );
            });
        }));
    };

    if (!ready) return <Typography>{t("exercises.loading")}</Typography>;
    return <Stack id="projects" component="article" spacing={2.5}>
        <SectionHeader eyebrow={`02 // ${t("dossier.archive")}`} title={t("title")} note={t("dossier.archiveEntries", { count: String(getProjectsByCategory("all").length).padStart(2, "0") })} />
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800 }}>{t("description")}</Typography>
        <ProjectMissionTabs modules={PROJECT_TABS.map(({ id }) => id)} active={tab} onChange={setTab} t={t} labelPrefix="" labelKeys={Object.fromEntries(PROJECT_TABS.map(({ id, labelKey }) => [id, labelKey]))} ariaLabel={t("dossier.modulesLabel")} />
        {isPractice ? <Suspense fallback={<Typography>{t("exercises.loading")}</Typography>}><Box data-scroll-section data-scroll-label={t("exercises.title", { defaultValue: "EXERCISES" })}><ExercisesSection isActive /></Box></Suspense> : <Box ref={gridRef} data-scroll-section data-scroll-label={t("dossier.archive", { defaultValue: "PROJECT ARCHIVE" })} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 1.2, alignItems: "start" }}>
            {displayProjects.map((mission) => <MissionCard key={mission.id} mission={mission} selected={mission.id === selectedId} dimmed={selectedId !== null && mission.id !== selectedId} onSelect={() => selectProject(mission.id)} t={t} />)}
        </Box>}
    </Stack>;
}
