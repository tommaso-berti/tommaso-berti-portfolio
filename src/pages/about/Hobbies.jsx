import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTranslation } from "../../hooks/useTranslation.js";

export default function Hobbies() {
    const { t } = useTranslation('pages.about.hobbies');

    return (
        <Stack id="hobbies" spacing={4} component="section" sx={{marginTop: "3rem"}}>
            <Typography variant="h3">
                {t('title')}
            </Typography>
            <Typography variant="body1">{t('description1')}</Typography>
            <Typography variant="body1">{t('description2')}</Typography>
        </Stack>
    )
}
