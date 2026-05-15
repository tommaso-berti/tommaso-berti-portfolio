import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation("common", { keyPrefix: "notFound" });

    return (
        <Stack
            component="article"
            spacing={2}
            sx={{
                minHeight: { xs: "50dvh", md: "55dvh" },
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <Typography component="p" variant="overline" color="secondary.main">
                404
            </Typography>
            <Typography component="h1" variant="h3">
                {t("title")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560 }}>
                {t("description")}
            </Typography>
            <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 1 }}>
                {t("backHome")}
            </Button>
        </Stack>
    );
}
