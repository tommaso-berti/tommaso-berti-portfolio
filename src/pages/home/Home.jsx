import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import HomeHeroActions from "./HomeHeroActions.jsx";
import HomeCertificationBadges from "./HomeCertificationBadges.jsx";
import OrbitalMap from "../../features/mission-ui/OrbitalMap.jsx";
import TelemetryStrip from "../../features/mission-ui/TelemetryStrip.jsx";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";
import BootSequence from "../../features/mission-ui/BootSequence.jsx";

export default function Home() {
    const { t } = useTranslation("pages", { keyPrefix: "home" });
    const title = t("missionTitle").split("\n");
    const telemetry = t("telemetry", { returnObjects: true });
    const labels = t("orbitalLabels", { returnObjects: true });
    const boot = t("boot", { returnObjects: true });
    return <Stack component="article" spacing={{ xs: 3, md: 4 }}>
        <Box component="section" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(360px, .9fr)" }, gap: { xs: 3, md: 4 }, alignItems: "center", minHeight: { md: "calc(100dvh - 13rem)" } }}>
            <Stack spacing={1.5}><TechnicalLabel>{t("eyebrow")}</TechnicalLabel><Typography component="h1" variant="h1" sx={{ fontSize: "clamp(3.2rem, 7vw, 6.2rem)", whiteSpace: "pre-line" }}>{title.map((line, index) => <Box key={line} component="span" sx={{ display: "block", color: index === title.length - 1 ? "space.blue" : "inherit" }}>{line}</Box>)}</Typography><Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, fontSize: "1.05rem", mt: .5 }}>{t("missionLead")}</Typography><HomeHeroActions /><Box sx={{ pt: 1 }}><BootSequence lines={Array.isArray(boot) ? boot : []} /></Box></Stack>
            <OrbitalMap title={t("orbitalTitle")} status={t("orbitalStatus")} labels={Array.isArray(labels) ? labels : []} />
        </Box>
        <TelemetryStrip items={Array.isArray(telemetry) ? telemetry : []} />
        <HomeCertificationBadges />
    </Stack>;
}
