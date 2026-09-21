import { useEffect, useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useScrollToHash } from "../../hooks/useScrollToHash.js";
import { useTranslation } from "react-i18next";
import AboutModuleTabs from "./AboutModuleTabs.jsx";
import IdentityVisualizer from "./IdentityVisualizer.jsx";
import { getAboutModuleFromHash } from "./aboutModules.utils.js";
import ColorRail from "../../features/mission-ui/ColorRail.jsx";
import SpaceButton from "../../features/mission-ui/SpaceButton.jsx";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";
import TelemetryStrip from "../../features/mission-ui/TelemetryStrip.jsx";

export default function About() {
    const location = useLocation();
    const { t } = useTranslation("pages", { keyPrefix: "about" });
    const [activeModule, setActiveModule] = useState(() => getAboutModuleFromHash(location.hash));
    const telemetry = t("personnel.telemetry", { returnObjects: true });
    const tags = t("personnel.tags", { returnObjects: true });

    useScrollToHash(8.5);

    useEffect(() => {
        setActiveModule(getAboutModuleFromHash(location.hash));
    }, [location.hash]);

    useEffect(() => {
        const handleHashChange = () => setActiveModule(getAboutModuleFromHash(window.location.hash));
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    return (
        <Stack id="about" component="article" spacing={{ xs: 3.5, md: 5 }}>
            <Box sx={{ borderBlock: "1px solid", borderColor: "divider", py: 1 }}>
                <TechnicalLabel>{t("personnel.header")}</TechnicalLabel>
            </Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 3, md: 5 }} alignItems="stretch">
                <Stack sx={{ flex: 1, justifyContent: "center" }} spacing={2.25}>
                    <TechnicalLabel color="space.blue">{t("personnel.heroEyebrow")}</TechnicalLabel>
                    <Typography component="h1" variant="h2" sx={{ whiteSpace: "pre-line", maxWidth: 650 }}>
                        {t("personnel.heroTitle")}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: { md: "1.1rem" }, maxWidth: 630 }}>
                        {t("personnel.heroLead")}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.75}>
                        {tags.map((tag) => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1.25}>
                        <SpaceButton component={RouterLink} to="/contact">{t("personnel.contactCta")}</SpaceButton>
                        <SpaceButton component={RouterLink} to="/projects" variant="outlined">{t("personnel.projectsCta")}</SpaceButton>
                    </Stack>
                </Stack>
                <Box sx={{ flex: 1, minWidth: 0 }}><IdentityVisualizer t={(key) => t(`personnel.${key}`)} /></Box>
            </Stack>
            <TelemetryStrip items={telemetry.map((item) => ({ ...item, status: item.status === true }))} />
            <AboutModuleTabs activeModule={activeModule} onChange={setActiveModule} t={t} />
            <Box component="section" sx={{ borderTop: "1px solid", borderColor: "divider", pt: 3 }}>
                <ColorRail sx={{ mb: 2 }} />
                <TechnicalLabel>{t("personnel.closingLabel")}</TechnicalLabel>
                <Typography component="h2" variant="h3" sx={{ mt: 1 }}>{t("personnel.closingTitle")}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 700 }}>{t("personnel.closingBody")}</Typography>
            </Box>
        </Stack>
    );
}
