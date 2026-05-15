import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import ProfileImage from "../../features/ProfileImage.jsx";

export default function Bio() {
    const { t } = useTranslation("pages", { keyPrefix: "about.bio" });

    return (
        <Stack
            direction="row"
            id="bio"
            spacing={4}
            alignItems="flex-start"
            component="section"
            sx={{ scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}
        >
            <Stack sx={{flex: 1}} spacing={4}>
                <Typography component="h1" variant="h3">
                    {t('title')}
                </Typography>
                <Typography variant="body1">
                    {t('description')}
                </Typography>
            </Stack>
            <Stack
                component="aside"
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ProfileImage alt={t("profileAlt")} width={200} height={200} />
            </Stack>
        </Stack>
    )
}
