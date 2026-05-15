import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import CareerTimeline from "./CareerTimeline.jsx";

export default function Experience() {
    const { t } = useTranslation("pages", { keyPrefix: "about.experience" });

    return (
        <Stack id="study-and-experience" spacing={4} component="section" sx={{ marginTop: "3rem", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}>
            <Typography variant="h3">
                {t("title")}
            </Typography>
            <CareerTimeline />
        </Stack>
    );
}
