import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

export default function Hobbies() {
    const { t } = useTranslation("pages", { keyPrefix: "about.hobbies" });

    return (
        <Stack id="hobbies" spacing={4} component="section" sx={{ marginTop: "3rem", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}>
            <Typography variant="h3">
                {t('title')}
            </Typography>
            <Typography variant="body1">{t('description1')}</Typography>
            <Typography variant="body1">{t('description2')}</Typography>
        </Stack>
    )
}
