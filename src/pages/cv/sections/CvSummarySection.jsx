import { Stack, Typography } from "@mui/material";
import { cvSectionSx, cvSectionTitleSx } from "../cv.styles.js";

/**
 * @param {{
 *   profile: import("../cv.data.js").CvProfile,
 *   isCompact: boolean,
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvSummarySection({ profile, isCompact, t }) {
    return (
        <Stack
            data-cv-section
            sx={{ ...cvSectionSx, display: "grid", gridTemplateColumns: { xs: "1fr", md: "170px minmax(0, 1fr)" }, gap: { xs: 1, md: 3 }, alignItems: "start" }}
        >
            <Typography variant="h5" sx={{ ...cvSectionTitleSx, mb: 0, pl: 1.5, borderLeft: "3px solid", borderColor: "space.orange" }}>{t("cv.summary")}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: isCompact ? 1.58 : 1.72 }}>
                {isCompact ? profile.compactSummary : profile.summary}
            </Typography>
        </Stack>
    );
}
