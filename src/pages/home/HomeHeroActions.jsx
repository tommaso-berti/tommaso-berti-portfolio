import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { containedPrimaryButtonSx, outlinedActionButtonSx } from "./homeHero.styles.js";

export default function HomeHeroActions() {
    const { t } = useTranslation("pages", { keyPrefix: "home" });

    return (
        <Stack direction="row" sx={{ pt: 1 }} spacing={1.1} flexWrap="wrap">
            <Button component={RouterLink} to="/projects" variant="contained" sx={containedPrimaryButtonSx}>
                {t("primaryCta")}
            </Button>
            <Button
                component={RouterLink}
                to="/contact"
                variant="outlined"
                sx={{
                    ...outlinedActionButtonSx,
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                        borderColor: "text.secondary",
                        backgroundColor: "action.hover",
                        cursor: "pointer",
                    },
                }}
            >
                {t("contactCta")}
            </Button>
            <Button component={RouterLink} to="/cv" variant="outlined" sx={outlinedActionButtonSx}>
                {t("cvCta")}
            </Button>
        </Stack>
    );
}
