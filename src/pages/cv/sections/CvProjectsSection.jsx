import { Box, Link, Stack, Typography } from "@mui/material";
import { cvActionLinkSx } from "../cv.styles.js";

/**
 * @param {{
 *   projects: ReturnType<typeof import("../cv.data.js").getCvProjects>,
 *   isCompact: boolean,
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvProjectsSection({ projects, isCompact, t }) {
    return (
        <Stack data-cv-section spacing={0.9}>
            <Typography variant="h5">{t("cv.selectedProjects")}</Typography>
            <Stack spacing={0.9}>
                {projects.map((project) => (
                    <Box key={project.id}>
                        <Stack direction="row" justifyContent="space-between" gap={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {project.title}
                            </Typography>
                            {project.url ? (
                                <Link
                                    data-cv-link
                                    data-cv-action-link
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="body2"
                                    sx={cvActionLinkSx}
                                >
                                    {project.label}
                                </Link>
                            ) : null}
                        </Stack>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.2, lineHeight: isCompact ? 1.5 : 1.62 }}
                        >
                            {isCompact ? project.description.split(".")[0] : project.description}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
