import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

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

function renderParagraphWithLinks(text) {
    if (typeof text !== "string" || !text.length) return text;

    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const isUrl = (value) => /^https?:\/\/\S+$/.test(value);
    const parts = [];
    let lastIndex = 0;
    let match;
    let key = 0;
    const introLinkSx = {
        fontWeight: 700,
        textDecoration: "underline",
        textDecorationThickness: "0.12em",
        textUnderlineOffset: "0.2em",
        textDecorationColor: "currentColor",
        "&:hover": {
            textDecorationThickness: "0.16em",
        },
        "&:focus-visible": {
            outline: "2px solid currentColor",
            outlineOffset: "2px",
            borderRadius: "4px",
        },
    };

    while ((match = markdownLinkRegex.exec(text)) !== null) {
        const [fullMatch, label, href] = match;
        const start = match.index;

        if (start > lastIndex) {
            const before = text.slice(lastIndex, start);
            const beforeParts = before.split(urlRegex);
            beforeParts.forEach((part) => {
                if (!part) return;
                if (isUrl(part)) {
                    parts.push(
                        <Link
                            key={`auto-${key++}`}
                            href={part}
                            target="_blank"
                            rel="noreferrer"
                            sx={introLinkSx}
                        >
                            {part}
                        </Link>
                    );
                } else {
                    parts.push(<span key={`text-${key++}`}>{part}</span>);
                }
            });
        }

        parts.push(
            <Link key={`md-${key++}`} href={href} target="_blank" rel="noreferrer" sx={introLinkSx}>
                {label}
            </Link>
        );

        lastIndex = start + fullMatch.length;
    }

    if (lastIndex < text.length) {
        const tail = text.slice(lastIndex);
        const tailParts = tail.split(urlRegex);
        tailParts.forEach((part) => {
            if (!part) return;
            if (isUrl(part)) {
                parts.push(
                    <Link
                        key={`tail-url-${key++}`}
                        href={part}
                        target="_blank"
                        rel="noreferrer"
                        sx={introLinkSx}
                    >
                        {part}
                    </Link>
                );
            } else {
                parts.push(<span key={`tail-text-${key++}`}>{part}</span>);
            }
        });
    }

    return parts.length ? parts : text;
}

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
                            <Typography key={index}>{renderParagraphWithLinks(para)}</Typography>
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
