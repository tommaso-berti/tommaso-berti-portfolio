import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import ProfileImage from "../../features/ProfileImage.jsx";

export default function Bio({ embedded = false }) {
    const { t } = useTranslation("pages", { keyPrefix: "about.bio" });

    return (
        <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            id="bio"
            spacing={{ xs: 2.5, md: 4 }}
            alignItems="flex-start"
            component="section"
            sx={{ scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}
        >
            <Stack sx={{flex: 1}} spacing={4}>
                <Typography component={embedded ? "h3" : "h2"} variant={embedded ? "h4" : "h3"}>
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
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: (theme) => theme.space.panel,
                }}
            >
                <ProfileImage alt={t("profileAlt")} width={200} height={200} />
            </Stack>
        </Stack>
    )
}
