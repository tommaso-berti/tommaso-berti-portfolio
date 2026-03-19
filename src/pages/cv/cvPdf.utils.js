/**
 * @param {string} language
 * @returns {string}
 */
export function getStaticCvPdfPath(language) {
    return language === "it"
        ? "/Curriculum_Tommaso_Berti_static_it.pdf"
        : "/Curriculum_Tommaso_Berti_static_en.pdf";
}
