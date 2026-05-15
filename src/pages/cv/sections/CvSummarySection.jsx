import { Stack, Typography } from "@mui/material";

/**
 * @param {{
 *   profile: import("../cv.data.js").CvProfile,
 *   isCompact: boolean,
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvSummarySection({ profile, isCompact, t }) {
    return (
        <Stack data-cv-section spacing={0.8}>
            <Typography variant="h5">{t("cv.summary")}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: isCompact ? 1.58 : 1.72 }}>
                {isCompact ? profile.compactSummary : profile.summary}
            </Typography>
        </Stack>
    );
}
