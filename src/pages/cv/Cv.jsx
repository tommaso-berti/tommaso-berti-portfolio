import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    Divider,
    FormControlLabel,
    GlobalStyles,
    Link,
    Paper,
    Stack,
    Switch,
    Tooltip,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import { useTranslation } from "../../hooks/useTranslation.js";
import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { formatIssuedAt } from "../../features/certifications/certifications.utils.js";
import {
    getCvCertifications,
    getCvEducation,
    getCvExperiences,
    getCvLanguages,
    getCvPlaceholders,
    getCvProfile,
    getCvProjects,
    getCvSkillGroups,
} from "./cv.data.js";
import { getStaticCvPdfPath } from "./cvPdf.utils.js";

/**
 * @typedef {import("./cv.data.js").CvControlsState} CvControlsState
 */

export default function Cv() {
    const { t } = useTranslation();
    const { language } = useLanguage();

    /** @type {[CvControlsState, import("react").Dispatch<import("react").SetStateAction<CvControlsState>>]} */
    const [controls, setControls] = useState({
        density: "full",
        showProjects: true,
        showCertifications: true,
    });

    const profile = getCvProfile(language);
    const skillGroups = getCvSkillGroups(language);
    const education = getCvEducation(language);
    const spokenLanguages = getCvLanguages(language);
    const placeholders = getCvPlaceholders(language);

    const experiences = useMemo(() => {
        const fromAbout = t("pages.about.experience.experiences", {
            returnObjects: true,
            defaultValue: [],
        });
        return getCvExperiences(fromAbout);
    }, [t, language]);

    const projects = useMemo(() => getCvProjects(t), [t, language]);
    const certifications = useMemo(() => getCvCertifications(), []);
    const staticCvPdfPath = getStaticCvPdfPath(language);

    const isCompact = controls.density === "compact";
    const visibleCertifications = isCompact ? certifications.slice(0, 4) : certifications.slice(0, 8);
    const contactMetaSx = {
        typography: "body2",
        fontFamily: "inherit",
        fontWeight: 500,
        lineHeight: 1.5,
        color: "text.secondary",
    };
    const cvActionButtonSx = {
        alignSelf: { xs: "stretch", lg: "center" },
        textTransform: "none",
        whiteSpace: "nowrap",
        lineHeight: 1.2,
        py: 1.05,
        px: 2,
        minWidth: { sm: 250, md: 0 },
        transition: "0.25s",
        "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
        },
    };

    return (
        <Stack data-cv-page component="article" spacing={{ xs: 2, md: 2.5 }}>
            <GlobalStyles
                styles={{
                    "@page": {
                        size: "A4",
                        margin: "13mm",
                    },
                    "@media print": {
                        "*, *::before, *::after": {
                            boxSizing: "border-box !important",
                        },
                        "html, body, #root": {
                            backgroundColor: "#fff !important",
                            overflowX: "hidden !important",
                        },
                        ".MuiContainer-root": {
                            paddingLeft: "0 !important",
                            paddingRight: "0 !important",
                        },
                        header: {
                            display: "none !important",
                        },
                        footer: {
                            display: "none !important",
                        },
                        main: {
                            maxWidth: "100% !important",
                            paddingTop: "0 !important",
                            paddingBottom: "0 !important",
                        },
                        "[data-cv-page]": {
                            width: "186mm !important",
                            maxWidth: "186mm !important",
                            margin: "0 auto !important",
                            gap: "0 !important",
                            padding: "0 !important",
                        },
                        "[data-cv-controls]": {
                            display: "none !important",
                        },
                        "[data-cv-document]": {
                            border: "0 !important",
                            boxShadow: "none !important",
                            backgroundImage: "none !important",
                            backgroundColor: "#fff !important",
                            padding: "0 !important",
                            width: "100% !important",
                            maxWidth: "100% !important",
                        },
                        "[data-cv-section]": {
                            breakInside: "avoid-page",
                            pageBreakInside: "avoid",
                        },
                        "[data-cv-link]": {
                            color: "#111 !important",
                            textDecoration: "none !important",
                        },
                        "[data-cv-action-link]": {
                            display: "none !important",
                        },
                        "[data-cv-cert-row]": {
                            display: "grid !important",
                            gridTemplateColumns: "minmax(0, 1fr) auto !important",
                            alignItems: "start !important",
                            columnGap: "6mm !important",
                        },
                        "[data-cv-cert-meta]": {
                            display: "block !important",
                        },
                        "[data-cv-cert-date]": {
                            display: "inline-block !important",
                            whiteSpace: "nowrap !important",
                            textAlign: "right !important",
                            minWidth: "14mm !important",
                        },
                    },
                }}
            />

            <Paper
                data-cv-controls
                variant="outlined"
                sx={{
                    px: { xs: 1.2, md: 1.6 },
                    py: { xs: 1, md: 1.2 },
                    borderRadius: 2.5,
                    position: { xs: "static", md: "sticky" },
                    top: { md: "7.9rem" },
                    zIndex: 5,
                }}
            >
                <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={1.1}
                    alignItems={{ xs: "stretch", lg: "center" }}
                    justifyContent="space-between"
                >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "center" }}>
                        <ToggleButtonGroup
                            size="small"
                            exclusive
                            value={controls.density}
                            onChange={(_, value) => {
                                if (!value) return;
                                setControls((previous) => ({ ...previous, density: value }));
                            }}
                            aria-label={t("pages.cv.densityLabel")}
                        >
                            <ToggleButton value="full">{t("pages.cv.full")}</ToggleButton>
                            <ToggleButton value="compact">{t("pages.cv.compact")}</ToggleButton>
                        </ToggleButtonGroup>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={controls.showProjects}
                                    onChange={(event) => {
                                        setControls((previous) => ({
                                            ...previous,
                                            showProjects: event.target.checked,
                                        }));
                                    }}
                                />
                            }
                            label={t("pages.cv.showProjects")}
                            sx={{ ml: 0.2 }}
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={controls.showCertifications}
                                    onChange={(event) => {
                                        setControls((previous) => ({
                                            ...previous,
                                            showCertifications: event.target.checked,
                                        }));
                                    }}
                                />
                            }
                            label={t("pages.cv.showCertifications")}
                            sx={{ ml: 0.2 }}
                        />
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "center" }}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "nowrap" }}>
                            <Button
                                variant="contained"
                                startIcon={<DownloadRoundedIcon />}
                                onClick={() => window.print()}
                                endIcon={
                                    <Tooltip title={t("pages.cv.dynamicPdfInfoTooltip")} arrow>
                                        <Box
                                            component="span"
                                            role="button"
                                            tabIndex={0}
                                            aria-label={t("pages.cv.dynamicPdfInfoTooltip")}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                            }}
                                            onMouseDown={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                            }}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" || event.key === " ") {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                }
                                            }}
                                            sx={{
                                                width: 18,
                                                height: 18,
                                                borderRadius: "999px",
                                                border: "1px solid rgba(255,255,255,0.55)",
                                                color: "rgba(255,255,255,0.92)",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "help",
                                                "&:focus-visible": {
                                                    outline: "2px solid",
                                                    outlineColor: "rgba(255,255,255,0.95)",
                                                    outlineOffset: 2,
                                                },
                                            }}
                                        >
                                            <InfoOutlinedIcon sx={{ fontSize: 13 }} />
                                        </Box>
                                    </Tooltip>
                                }
                                sx={cvActionButtonSx}
                            >
                                {t("pages.cv.downloadPdfCurrentView")}
                            </Button>
                            <Button
                                component="a"
                                href={staticCvPdfPath}
                                target="_blank"
                                rel="noreferrer"
                                download
                                variant="outlined"
                                startIcon={<DescriptionRoundedIcon />}
                                sx={cvActionButtonSx}
                            >
                                {t("pages.cv.downloadStaticPdf")}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>

            <Paper
                data-cv-document
                variant="outlined"
                sx={{
                    px: { xs: 1.8, sm: 2.4, md: isCompact ? 3 : 4 },
                    py: { xs: 1.9, md: isCompact ? 2.2 : 3 },
                    borderRadius: 3,
                    maxWidth: "900px",
                    width: "100%",
                    mx: "auto",
                }}
            >
                <Stack spacing={isCompact ? 2 : 2.8}>
                    <Stack data-cv-section spacing={1.1}>
                        <Typography variant="h3" sx={{ lineHeight: 1.1 }}>
                            {profile.name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {profile.role}
                        </Typography>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.4} useFlexGap flexWrap="wrap">
                            <Stack direction="row" spacing={0.8} alignItems="center">
                                <EmailOutlinedIcon fontSize="small" />
                                <Link
                                    data-cv-link
                                    href={`mailto:${profile.email}`}
                                    underline="hover"
                                    color="inherit"
                                    sx={contactMetaSx}
                                >
                                    {profile.email}
                                </Link>
                            </Stack>
                            <Stack direction="row" spacing={0.8} alignItems="center">
                                <PhoneOutlinedIcon fontSize="small" />
                                <Link
                                    data-cv-link
                                    href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                                    underline="hover"
                                    color="inherit"
                                    sx={contactMetaSx}
                                >
                                    {profile.phone}
                                </Link>
                            </Stack>
                            <Typography sx={contactMetaSx}>
                                {profile.location}
                            </Typography>
                        </Stack>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.6, sm: 1.5 }} useFlexGap>
                            <Stack direction="row" spacing={0.8} alignItems="center">
                                <LanguageRoundedIcon fontSize="small" />
                                <Link data-cv-link href={profile.websiteUrl} target="_blank" rel="noreferrer" color="inherit">
                                    {profile.websiteLabel}
                                </Link>
                            </Stack>
                            <Stack direction="row" spacing={0.8} alignItems="center">
                                <LinkedInIcon fontSize="small" />
                                <Link data-cv-link href={profile.linkedinUrl} target="_blank" rel="noreferrer" color="inherit">
                                    {profile.linkedinLabel}
                                </Link>
                            </Stack>
                            <Stack direction="row" spacing={0.8} alignItems="center">
                                <GitHubIcon fontSize="small" />
                                <Link data-cv-link href={profile.githubUrl} target="_blank" rel="noreferrer" color="inherit">
                                    {profile.githubLabel}
                                </Link>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Divider />

                    <Stack data-cv-section spacing={0.8}>
                        <Typography variant="h5">{t("pages.cv.summary")}</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: isCompact ? 1.58 : 1.72 }}>
                            {isCompact ? profile.compactSummary : profile.summary}
                        </Typography>
                    </Stack>

                    <Stack data-cv-section spacing={1}>
                        <Typography variant="h5">{t("pages.cv.experience")}</Typography>
                        <Stack spacing={0.95}>
                            {experiences.map((item) => (
                                <Box key={`${item.year}-${item.title}`} sx={{ breakInside: "avoid" }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" gap={1}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontFamily: "monospace", whiteSpace: "nowrap" }}
                                        >
                                            {item.year}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 0.2, lineHeight: isCompact ? 1.5 : 1.62 }}
                                    >
                                        {isCompact
                                            ? item.description.split(".")[0]
                                            : item.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Stack>

                    <Stack data-cv-section spacing={1}>
                        <Typography variant="h5">{t("pages.cv.skills")}</Typography>
                        <Stack spacing={0.8}>
                            {skillGroups.map((group) => (
                                <Box key={group.title}>
                                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                        {group.title}
                                    </Typography>
                                    <Stack direction="row" spacing={0.7} useFlexGap flexWrap="wrap">
                                        {group.items.map((skill) => (
                                            <Chip key={skill} label={skill} size="small" variant="outlined" />
                                        ))}
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </Stack>

                    {controls.showProjects ? (
                        <Stack data-cv-section spacing={0.9}>
                            <Typography variant="h5">{t("pages.cv.selectedProjects")}</Typography>
                            <Stack spacing={0.9}>
                                {projects.map((project) => (
                                    <Box key={project.id}>
                                        <Stack direction="row" justifyContent="space-between" gap={1}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                {project.title}
                                            </Typography>
                                            {project.url ? (
                                                <Link
                                                    data-cv-link
                                                    data-cv-action-link
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    variant="body2"
                                                    sx={{
                                                        whiteSpace: "nowrap",
                                                        fontWeight: 700,
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                        borderRadius: 999,
                                                        px: 1,
                                                        py: 0.25,
                                                        color: "secondary.main",
                                                        textDecoration: "none",
                                                        textUnderlineOffset: "0.2em",
                                                        transition: "0.2s",
                                                        "&:hover": {
                                                            backgroundColor: "action.hover",
                                                            borderColor: "secondary.main",
                                                        },
                                                        "&:focus-visible": {
                                                            outline: "2px solid",
                                                            outlineColor: "secondary.main",
                                                            outlineOffset: 2,
                                                        },
                                                    }}
                                                >
                                                    {project.label}
                                                </Link>
                                            ) : null}
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 0.2, lineHeight: isCompact ? 1.5 : 1.62 }}
                                        >
                                            {isCompact ? project.description.split(".")[0] : project.description}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    ) : null}

                    {controls.showCertifications ? (
                        <Stack data-cv-section spacing={0.9}>
                            <Typography variant="h5">{t("pages.cv.certifications")}</Typography>
                            <Stack spacing={0.75}>
                                {visibleCertifications.map((certification) => (
                                    <Stack
                                        key={certification.id}
                                        data-cv-cert-row
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="baseline"
                                        gap={1}
                                    >
                                        <Stack spacing={0.15}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                {certification.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {`${certification.platform} · ${t(`pages.about.certifications.status.${certification.status}`, { defaultValue: certification.status })}`}
                                            </Typography>
                                        </Stack>
                                        <Stack data-cv-cert-meta direction="row" spacing={0.85} alignItems="center">
                                            <Typography
                                                data-cv-cert-date
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ whiteSpace: "nowrap" }}
                                            >
                                                {formatIssuedAt(certification.issuedAt)}
                                            </Typography>
                                            <Link
                                                data-cv-link
                                                data-cv-action-link
                                                href={certification.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 700,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    borderRadius: 999,
                                                    px: 1,
                                                    py: 0.25,
                                                    color: "secondary.main",
                                                    textDecoration: "none",
                                                    textUnderlineOffset: "0.2em",
                                                    transition: "0.2s",
                                                    "&:hover": {
                                                        backgroundColor: "action.hover",
                                                        borderColor: "secondary.main",
                                                    },
                                                    "&:focus-visible": {
                                                        outline: "2px solid",
                                                        outlineColor: "secondary.main",
                                                        outlineOffset: 2,
                                                    },
                                                }}
                                            >
                                                {t("pages.cv.verify")}
                                            </Link>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    ) : null}

                    <Stack data-cv-section spacing={0.9}>
                        <Typography variant="h5">{t("pages.cv.educationAndLanguages")}</Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                                gap: 1.3,
                            }}
                        >
                            <Stack spacing={0.8}>
                                {education.map((item) => (
                                    <Box key={`${item.period}-${item.title}`}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="baseline" gap={1}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                                                {item.period}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                                            {item.institution}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                                            {isCompact ? item.description.split(".")[0] : item.description}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>

                            <Stack spacing={0.6}>
                                {spokenLanguages.map((item) => (
                                    <Stack key={item.name} direction="row" justifyContent="space-between" spacing={1}>
                                        <Typography variant="body2">{item.name}</Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ textAlign: "right" }}>
                                            {item.level}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack data-cv-section spacing={0.35}>
                        <Typography variant="subtitle2" color="text.secondary">
                            {t("pages.cv.placeholderTitle")}
                        </Typography>
                        {placeholders.map((item, index) => (
                            <Typography key={index} variant="caption" color="text.secondary">
                                {item}
                            </Typography>
                        ))}
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
}
