import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FEATURED_CERTIFICATIONS } from "../../features/certifications/certifications.data.js";
import { useEnsureProjectsI18n } from "../../i18n/useEnsureProjectsI18n.js";
import {
    getCvCertifications,
    getCvEducation,
    getCvExperiences,
    getCvLanguages,
    getCvProfile,
    getCvProjects,
    getCvSkillGroups,
} from "./cv.data.js";
import { getStaticCvPdfPath } from "./cvPdf.utils.js";

/**
 * @typedef {import("./cv.data.js").CvControlsState} CvControlsState
 */

export function useCvPageData() {
    const { t, i18n } = useTranslation("pages");
    const projectsI18nReady = useEnsureProjectsI18n();
    const language = i18n.language?.toLowerCase().startsWith("it") ? "it" : "en";

    /** @type {[CvControlsState, import("react").Dispatch<import("react").SetStateAction<CvControlsState>>]} */
    const [controls, setControls] = useState({
        density: "full",
        showExperience: true,
        showProjects: true,
        showCertifications: true,
    });

    const profile = getCvProfile(language);
    const skillGroups = getCvSkillGroups();
    const education = getCvEducation(language);
    const spokenLanguages = getCvLanguages(language);

    const experiences = useMemo(() => {
        const fromAbout = t("about.experience.experiences", {
            returnObjects: true,
            defaultValue: [],
        });
        return getCvExperiences(fromAbout);
    }, [t]);

    const projects = useMemo(
        () => (projectsI18nReady ? getCvProjects(t) : []),
        [t, projectsI18nReady]
    );
    const certifications = useMemo(() => getCvCertifications(), []);
    const staticCvPdfPath = getStaticCvPdfPath(language);

    const isCompact = controls.density === "compact";
    const visibleCertifications = isCompact ? FEATURED_CERTIFICATIONS : certifications;

    return {
        t,
        controls,
        setControls,
        profile,
        skillGroups,
        education,
        spokenLanguages,
        experiences,
        projects,
        staticCvPdfPath,
        isCompact,
        visibleCertifications,
    };
}
