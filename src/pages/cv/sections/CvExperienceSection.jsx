import { Box, Stack, Typography } from "@mui/material";

/**
 * @param {{
 *   experiences: import("../cv.data.js").CvExperienceItem[],
 *   isCompact: boolean,
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvExperienceSection({ experiences, isCompact, t }) {
    return (
        <Stack data-cv-section spacing={1}>
            <Typography variant="h5">{t("cv.experience")}</Typography>
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
                            {isCompact ? item.description.split(".")[0] : item.description}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
