import { Box, Paper, Stack } from "@mui/material";
import CvHeaderSection from "./sections/CvHeaderSection.jsx";
import CvSummarySection from "./sections/CvSummarySection.jsx";
import CvExperienceSection from "./sections/CvExperienceSection.jsx";
import CvSkillsSection from "./sections/CvSkillsSection.jsx";
import CvProjectsSection from "./sections/CvProjectsSection.jsx";
import CvCertificationsSection from "./sections/CvCertificationsSection.jsx";
import CvEducationLanguagesSection from "./sections/CvEducationLanguagesSection.jsx";

/**
 * @typedef {import("./cv.data.js").CvControlsState} CvControlsState
 */

/**
 * @param {{
 *   controls: CvControlsState,
 *   t: import("i18next").TFunction<"pages">,
 *   profile: import("./cv.data.js").CvProfile,
 *   skillGroups: ReturnType<typeof import("./cv.data.js").getCvSkillGroups>,
 *   education: import("./cv.data.js").CvEducationItem[],
 *   spokenLanguages: import("./cv.data.js").CvLanguageItem[],
 *   experiences: import("./cv.data.js").CvExperienceItem[],
 *   projects: ReturnType<typeof import("./cv.data.js").getCvProjects>,
 *   isCompact: boolean,
 *   visibleCertifications: import("../../../features/certifications/certifications.data.js").Certification[],
 * }} props
 */
export default function CvDocument({
    controls,
    t,
    profile,
    skillGroups,
    education,
    spokenLanguages,
    experiences,
    projects,
    isCompact,
    visibleCertifications,
}) {
    return (
        <Paper
            data-cv-document
            data-scroll-section
            data-scroll-label={t("profileTitle", { defaultValue: "CV DOCUMENT" })}
            variant="outlined"
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 0,
                width: "100%",
                maxWidth: "100%",
                mx: "auto",
                bgcolor: "background.paper",
                boxShadow: "0 16px 44px rgba(23,32,42,.09)",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: 0.12,
                    backgroundImage: "radial-gradient(circle, currentColor .55px, transparent .6px)",
                    backgroundSize: "10px 10px",
                },
            }}
        >
            <Box
                aria-hidden="true"
                data-cv-accent-rail
                sx={{
                    position: "relative",
                    zIndex: 1,
                    height: { xs: 4, md: 5 },
                    display: "grid",
                    gridTemplateColumns: "1.5fr .8fr .55fr .65fr",
                    "& > :nth-of-type(1)": { bgcolor: "space.blue" },
                    "& > :nth-of-type(2)": { bgcolor: "space.orange" },
                    "& > :nth-of-type(3)": { bgcolor: "space.yellow" },
                    "& > :nth-of-type(4)": { bgcolor: "space.red" },
                }}
            >
                <Box /><Box /><Box /><Box />
            </Box>
            <Box sx={{ position: "relative", zIndex: 1, px: { xs: 2, sm: 3, md: isCompact ? 3.5 : 4.5 }, py: { xs: 2, md: isCompact ? 2.5 : 3.5 } }}>
                <Stack spacing={0}>
                    <CvHeaderSection profile={profile} />
                    <CvSummarySection profile={profile} isCompact={isCompact} t={t} />

                    {controls.showExperience ? (
                        <CvExperienceSection experiences={experiences} isCompact={isCompact} t={t} />
                    ) : null}

                    <Box
                        data-cv-section
                        sx={{
                            py: { xs: 2, md: 2.7 },
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            display: "grid",
                            gridTemplateColumns: controls.showProjects ? { xs: "1fr", md: "1.1fr .9fr" } : "1fr",
                            gap: { xs: 2.2, md: 3.5 },
                        }}
                    >
                        <CvSkillsSection skillGroups={skillGroups} t={t} />
                        {controls.showProjects ? (
                            <CvProjectsSection projects={projects} isCompact={isCompact} t={t} />
                        ) : null}
                    </Box>

                    {controls.showCertifications ? (
                        <CvCertificationsSection certifications={visibleCertifications} t={t} />
                    ) : null}

                    <CvEducationLanguagesSection
                        education={education}
                        spokenLanguages={spokenLanguages}
                        isCompact={isCompact}
                        t={t}
                    />
                </Stack>
            </Box>
        </Paper>
    );
}
