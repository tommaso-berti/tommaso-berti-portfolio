import { Divider, Paper, Stack } from "@mui/material";
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
            variant="outlined"
            sx={{
                px: { xs: 1.8, sm: 2.4, md: isCompact ? 3 : 4 },
                py: { xs: 1.9, md: isCompact ? 2.2 : 3 },
                borderRadius: 3,
                width: "100%",
                maxWidth: "100%",
                mx: "auto",
            }}
        >
            <Stack spacing={isCompact ? 2 : 2.8}>
                <CvHeaderSection profile={profile} />
                <Divider />
                <CvSummarySection profile={profile} isCompact={isCompact} t={t} />

                {controls.showExperience ? (
                    <CvExperienceSection experiences={experiences} isCompact={isCompact} t={t} />
                ) : null}

                <CvSkillsSection skillGroups={skillGroups} t={t} />

                {controls.showProjects ? (
                    <CvProjectsSection projects={projects} isCompact={isCompact} t={t} />
                ) : null}

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
        </Paper>
    );
}
