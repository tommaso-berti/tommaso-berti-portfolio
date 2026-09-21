import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TechnicalLabel from "../../../features/mission-ui/TechnicalLabel.jsx";
import ColorRail from "../../../features/mission-ui/ColorRail.jsx";
import StatusIndicator from "../../../features/mission-ui/StatusIndicator.jsx";
import MiniWebappPreview from "../components/MiniWebappPreview.jsx";

export default function ProjectApplicationModule({ project, preview, t }) {
    return <Box component="section" sx={{ minHeight: { xs: 320, md: 380 }, border: "1px solid", borderColor: "divider", bgcolor: (theme) => theme.space.secondaryPaper, position: "relative", overflow: "hidden" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 1.4, py: 1, borderBottom: "1px solid", borderColor: "divider" }}><TechnicalLabel>{`${project.id.toUpperCase()} // ${t("dossier.applicationModule")}`}</TechnicalLabel><StatusIndicator>{t("dossier.buildReady")}</StatusIndicator></Stack>
        <Box aria-hidden="true" sx={{ position: "absolute", width: "90%", maxWidth: 410, height: 170, border: "1px solid", borderColor: "divider", borderRadius: "50%", left: "50%", top: "54%", transform: "translate(-50%, -50%) rotate(-13deg)", animation: "orbitalSpin 18s linear infinite", opacity: .7 }} />
        <Box sx={{ position: "relative", zIndex: 1, p: { xs: 1.6, md: 2.3 }, maxWidth: 500, mx: "auto" }}><MiniWebappPreview url={preview.url} title={preview.title} overlayLabel={preview.overlayLabel} width="100%" height={250} scale={.68} deferLoad loadPreviewLabel={preview.loadPreviewLabel} loadPreviewTooltip={preview.loadPreviewTooltip} /></Box>
        <Stack direction="row" justifyContent="space-between" sx={{ position: "absolute", left: 14, right: 14, bottom: 13 }}><TechnicalLabel sx={{ fontSize: ".52rem" }}>{`${t("dossier.node")} ${project.id.toUpperCase()}`}</TechnicalLabel><TechnicalLabel sx={{ fontSize: ".52rem" }}>{t("dossier.liveLinkAvailable")}</TechnicalLabel></Stack><ColorRail sx={{ position: "absolute", left: 0, right: 0, bottom: 0 }} />
    </Box>;
}
