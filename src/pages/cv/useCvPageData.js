import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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
    }, [t, language]);

    const projects = useMemo(() => getCvProjects(t), [t, language]);
    const certifications = useMemo(() => getCvCertifications(), []);
    const staticCvPdfPath = getStaticCvPdfPath(language);

    const isCompact = controls.density === "compact";
    const visibleCertifications = isCompact ? certifications.slice(0, 4) : certifications.slice(0, 8);

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
