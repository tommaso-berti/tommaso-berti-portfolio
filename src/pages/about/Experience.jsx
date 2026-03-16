import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "../../hooks/useTranslation.js";
import CareerTimeline from "./CareerTimeline.jsx";

export default function Experience() {
    const { t } = useTranslation('pages.about.experience');

    return (
        <Stack id="study-and-experience" spacing={4} component="section" sx={{ marginTop: "3rem" }}>
            <Typography variant="h3">
                {t("title")}
            </Typography>
            <CareerTimeline />
        </Stack>
    );
}
