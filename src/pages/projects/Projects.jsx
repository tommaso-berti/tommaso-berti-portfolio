import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PROJECT_TABS } from "./projectsPages/projectTabs.config.js";
import { buildMissionModel, getProjectsByCategory } from "./projectsPages/projectSelectors.js";
import { useEnsureProjectsI18n } from "@/i18n/useEnsureProjectsI18n.js";
import SectionHeader from "@/features/mission-ui/SectionHeader.jsx";
import MissionCard from "@/features/mission-ui/MissionCard.jsx";

const ExercisesSection = lazy(() => import("./components/ExercisesSection.jsx"));

export default function Projects() {
    const ready = useEnsureProjectsI18n();
    const { t } = useTranslation("pages", { keyPrefix: "projects" });
    const [tab, setTab] = useState("all");
    const [selectedId, setSelectedId] = useState(null);
    const gridRef = useRef(null);
    const isPractice = tab === "practice";
    const projects = useMemo(() => isPractice ? [] : getProjectsByCategory(tab).map((project, index) => buildMissionModel(project, t, index)), [isPractice, tab, t]);

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
        <SectionHeader eyebrow="02 // MISSION ARCHIVE" title={t("title")} note="FILTER THE ARCHIVE" />
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800 }}>{t("description")}</Typography>
        <Stack direction="row" gap={.7} flexWrap="wrap">{PROJECT_TABS.map(({ id, labelKey }) => <Button key={id} onClick={() => setTab(id)} variant={tab === id ? "contained" : "outlined"} aria-pressed={tab === id}>{t(labelKey)}</Button>)}</Stack>
        {isPractice ? <Suspense fallback={<Typography>{t("exercises.loading")}</Typography>}><ExercisesSection isActive /></Suspense> : <Box ref={gridRef} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 1.2, alignItems: "start" }}>
            {projects.map((mission) => <MissionCard key={mission.id} mission={mission} selected={mission.id === selectedId} dimmed={selectedId !== null && mission.id !== selectedId} onSelect={() => selectProject(mission.id)} t={t} />)}
        </Box>}
    </Stack>;
}
