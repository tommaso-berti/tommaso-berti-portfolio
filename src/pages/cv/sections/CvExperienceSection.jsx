import { Box, Stack, Typography } from "@mui/material";
import { cvSectionSx, cvSectionTitleSx } from "../cv.styles.js";

/**
 * @param {{
 *   experiences: import("../cv.data.js").CvExperienceItem[],
 *   isCompact: boolean,
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvExperienceSection({ experiences, isCompact, t }) {
    return (
        <Stack data-cv-section spacing={1} sx={cvSectionSx}>
            <Typography variant="h5" sx={cvSectionTitleSx}>{t("cv.experience")}</Typography>
            <Stack spacing={0.7}>
                {experiences.map((item) => (
                    <Box
                        key={`${item.year}-${item.title}`}
                        data-cv-timeline-entry
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "76px 16px minmax(0, 1fr)", sm: "110px 18px minmax(0, 1fr)" },
                            gap: { xs: 0.7, sm: 1.2 },
                            alignItems: "start",
                            breakInside: "avoid",
                        }}
                    >
                        <Typography variant="caption" color="text.secondary" sx={{ pt: 0.35, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".03em" }}>{item.year}</Typography>
                        <Box aria-hidden="true" sx={{ position: "relative", minHeight: isCompact ? 52 : 64, "&::before": { content: '""', position: "absolute", top: 5, left: 5, width: 8, height: 8, border: "2px solid", borderColor: "space.blue", bgcolor: "background.paper", borderRadius: "50%" }, "&::after": { content: '""', position: "absolute", top: 17, bottom: -10, left: 9, width: "1px", bgcolor: "divider" }, "[data-cv-timeline-entry]:last-of-type &::after": { display: "none" } }} />
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, lineHeight: isCompact ? 1.5 : 1.62 }}>
                                {isCompact ? item.description.split(".")[0] : item.description}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
