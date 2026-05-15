import { Stack } from "@mui/material";
import CvPrintGlobalStyles from "./CvPrintGlobalStyles.jsx";
import CvControls from "./CvControls.jsx";
import CvDocument from "./CvDocument.jsx";
import { useCvPageData } from "./useCvPageData.js";

export default function Cv() {
    const {
        t,
        controls,
        setControls,
        staticCvPdfPath,
        profile,
        skillGroups,
        education,
        spokenLanguages,
        experiences,
        projects,
        isCompact,
        visibleCertifications,
    } = useCvPageData();

    return (
        <Stack data-cv-page component="article" spacing={{ xs: 2, md: 2.5 }}>
            <CvPrintGlobalStyles />
            <CvControls
                controls={controls}
                setControls={setControls}
                staticCvPdfPath={staticCvPdfPath}
                t={t}
            />
            <CvDocument
                controls={controls}
                t={t}
                profile={profile}
                skillGroups={skillGroups}
                education={education}
                spokenLanguages={spokenLanguages}
                experiences={experiences}
                projects={projects}
                isCompact={isCompact}
                visibleCertifications={visibleCertifications}
            />
        </Stack>
    );
}
