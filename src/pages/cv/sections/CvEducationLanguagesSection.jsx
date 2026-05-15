import { Box, Stack, Typography } from "@mui/material";

/**
 * @param {{
 *   education: import("../cv.data.js").CvEducationItem[],
 *   spokenLanguages: import("../cv.data.js").CvLanguageItem[],
 *   isCompact: boolean,
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvEducationLanguagesSection({ education, spokenLanguages, isCompact, t }) {
    return (
        <Stack data-cv-section data-cv-section-splittable spacing={0.9}>
            <Typography variant="h5">{t("cv.educationAndLanguages")}</Typography>
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
                            <Stack data-cv-meta-row direction="row" justifyContent="space-between" alignItems="baseline" gap={1}>
                                <Typography data-cv-meta-main variant="subtitle2" sx={{ fontWeight: 700 }}>
                                    {item.title}
                                </Typography>
                                <Typography
                                    data-cv-meta-side
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ whiteSpace: "nowrap" }}
                                >
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
                        <Stack
                            key={item.name}
                            data-cv-meta-row
                            data-cv-lang-row
                            direction="row"
                            justifyContent="space-between"
                            spacing={1}
                            sx={{ minWidth: 0 }}
                        >
                            <Typography data-cv-meta-main variant="body2" sx={{ minWidth: 0 }}>
                                {item.name}
                            </Typography>
                            <Typography
                                data-cv-meta-side
                                data-cv-lang-level
                                variant="caption"
                                color="text.secondary"
                                sx={{ textAlign: "right", whiteSpace: "nowrap", minWidth: "fit-content" }}
                            >
                                {item.level}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
}
