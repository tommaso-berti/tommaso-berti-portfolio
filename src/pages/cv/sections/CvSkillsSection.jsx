import { Box, Chip, Stack, Typography } from "@mui/material";
import { cvSectionTitleSx } from "../cv.styles.js";

/**
 * @param {{
 *   skillGroups: ReturnType<typeof import("../cv.data.js").getCvSkillGroups>,
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvSkillsSection({ skillGroups, t }) {
    return (
        <Stack spacing={1}>
            <Typography variant="h5" sx={cvSectionTitleSx}>{t("cv.skills")}</Typography>
            <Stack spacing={0.8}>
                {skillGroups.map((group) => (
                    <Box key={group.titleKey}>
                        <Typography variant="subtitle2" sx={{ mb: 0.65, fontWeight: 800, color: "text.primary" }}>
                            {t(`about.tech-skills.${group.titleKey}`, {
                                defaultValue: group.titleKey,
                            })}
                        </Typography>
                        <Stack direction="row" spacing={0.7} useFlexGap flexWrap="wrap">
                            {group.items.map((skill, index) => (
                                <Chip
                                    key={skill}
                                    label={skill}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        position: "relative",
                                        overflow: "hidden",
                                        borderRadius: 0,
                                        bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255,255,255,.025)" : "rgba(255,255,255,.35)",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            bottom: 0,
                                            left: 0,
                                            width: 3,
                                            bgcolor: ["space.blue", "space.orange", "space.yellow", "space.red"][index % 4],
                                        },
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
