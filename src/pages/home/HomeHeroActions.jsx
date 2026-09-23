import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import { Link as RouterLink } from "react-router-dom";
import SpaceButton from "@/features/mission-ui/SpaceButton.jsx";
import { outlinedActionButtonSx } from "./homeHero.styles.js";

export default function HomeHeroActions() {
    const { t } = useTranslation("pages", { keyPrefix: "home" });

    return (
        <Stack direction="row" sx={{ pt: 1 }} spacing={1.1} flexWrap="wrap">
            <SpaceButton component={RouterLink} to="/projects" variant="contained" barColor="space.blue">
                {t("primaryCta")}
            </SpaceButton>
            <SpaceButton
                component={RouterLink}
                to="/contact"
                variant="outlined"
                barColor="space.blue"
                sx={outlinedActionButtonSx}
            >
                {t("contactCta")}
            </SpaceButton>
            <SpaceButton component={RouterLink} to="/cv" variant="outlined" barColor="space.blue" sx={outlinedActionButtonSx}>
                {t("cvCta")}
            </SpaceButton>
        </Stack>
    );
}
