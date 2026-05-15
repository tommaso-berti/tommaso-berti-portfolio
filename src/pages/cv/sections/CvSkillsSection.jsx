import { Box, Chip, Stack, Typography } from "@mui/material";

/**
 * @param {{
 *   skillGroups: ReturnType<typeof import("../cv.data.js").getCvSkillGroups>,
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvSkillsSection({ skillGroups, t }) {
    return (
        <Stack data-cv-section spacing={1}>
            <Typography variant="h5">{t("cv.skills")}</Typography>
            <Stack spacing={0.8}>
                {skillGroups.map((group) => (
                    <Box key={group.titleKey}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            {t(`about.tech-skills.${group.titleKey}`, {
                                defaultValue: group.titleKey,
                            })}
                        </Typography>
                        <Stack direction="row" spacing={0.7} useFlexGap flexWrap="wrap">
                            {group.items.map((skill) => (
                                <Chip key={skill} label={skill} size="small" variant="outlined" />
                            ))}
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
