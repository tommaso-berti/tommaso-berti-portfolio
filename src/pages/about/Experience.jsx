import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import CareerTimeline from "./CareerTimeline.jsx";

export default function Experience({ embedded = false }) {
    const { t } = useTranslation("pages", { keyPrefix: "about.experience" });

    return (
        <Stack id="study-and-experience" spacing={4} component="section" sx={{ marginTop: embedded ? 0 : "3rem", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}>
            <Typography variant="overline" color="text.secondary">
                DEVELOPMENT LOG
            </Typography>
            <Typography component="h2" variant="h3">
                {t("title")}
            </Typography>
            <CareerTimeline />
        </Stack>
    );
}
