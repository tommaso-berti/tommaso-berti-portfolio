import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import MissionPatch from "@/features/mission-ui/MissionPatch.jsx";
import MotionPanel from "@/features/mission-ui/MotionPanel.jsx";
import SectionHeader from "@/features/mission-ui/SectionHeader.jsx";
import SpaceButton from "@/features/mission-ui/SpaceButton.jsx";
import StatusIndicator from "@/features/mission-ui/StatusIndicator.jsx";
import TechnicalLabel from "@/features/mission-ui/TechnicalLabel.jsx";

const COLOR_TOKENS = [
    ["backgroundDefault", (theme) => theme.palette.background.default],
    ["backgroundPaper", (theme) => theme.palette.background.paper],
    ["panel", (theme) => theme.space.panel],
    ["secondaryPaper", (theme) => theme.space.secondaryPaper],
    ["ink", (theme) => theme.palette.text.primary],
    ["secondaryInk", (theme) => theme.palette.text.secondary],
    ["border", (theme) => theme.palette.divider],
    ["blue", (theme) => theme.space.blue],
    ["orange", (theme) => theme.space.orange],
    ["yellow", (theme) => theme.space.yellow],
    ["red", (theme) => theme.space.red],
    ["green", (theme) => theme.space.green],
];

function ShowcaseSection({ id, section, children }) {
    return (
        <Box component="section" id={id} data-scroll-section data-scroll-label={section.eyebrow}>
            <Stack spacing={2.5}>
                <Box>
                    <TechnicalLabel color="space.orange">{section.eyebrow}</TechnicalLabel>
                    <Typography component="h2" variant="h3" sx={{ mt: 0.5, mb: 1 }}>
                        {section.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
                        {section.description}
                    </Typography>
                </Box>
                {children}
            </Stack>
        </Box>
    );
}

function ColorSwatches({ t }) {
    const theme = useTheme();

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 1.25 }}>
            {COLOR_TOKENS.map(([key, getColor]) => {
                const color = getColor(theme);
                return (
                    <Paper key={key} variant="outlined" sx={{ overflow: "hidden", borderRadius: 0 }}>
                        <Box sx={{ minHeight: 74, bgcolor: color, display: "flex", alignItems: "flex-end", p: 1.2 }}>
                        </Box>
                        <Stack direction="row" justifyContent="space-between" gap={1} sx={{ px: 1.2, py: 1 }}>
                            <Box sx={{ minWidth: 0 }}>
                                <TechnicalLabel sx={{ fontSize: ".58rem", overflowWrap: "anywhere" }}>{t(`tokens.${key}`)}</TechnicalLabel>
                                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace", fontWeight: 800 }}>{color.toUpperCase()}</Typography>
                            </Box>
                            <Box aria-hidden="true" sx={{ width: 9, height: 9, flex: "0 0 auto", mt: 0.35, bgcolor: color, border: "1px solid", borderColor: "divider" }} />
                        </Stack>
                    </Paper>
                );
            })}
        </Box>
    );
}

function OrbitalDiagram({ label }) {
    return (
        <Box component="svg" viewBox="0 0 480 240" role="img" aria-label={label} sx={{ display: "block", width: "100%", maxWidth: 560, mx: "auto", color: "text.secondary" }}>
            <defs>
                <pattern id="style-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity=".13" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="480" height="240" fill="url(#style-grid)" />
            <path d="M0 120H480M240 0V240" stroke="currentColor" strokeOpacity=".35" strokeDasharray="3 5" />
            <g transform="rotate(-13 240 120)">
                <ellipse cx="240" cy="120" rx="184" ry="57" fill="none" stroke="currentColor" strokeOpacity=".65" strokeWidth="2" />
                <circle cx="412.9034" cy="100.5049" r="7" fill="var(--style-orange)" />
            </g>
            <ellipse cx="240" cy="120" rx="110" ry="95" fill="none" stroke="currentColor" strokeOpacity=".48" strokeWidth="1.5" />
            <circle cx="155.7351" cy="58.9352" r="5" fill="var(--style-yellow)" />
            <circle cx="240" cy="120" r="23" fill="var(--style-paper)" stroke="var(--style-blue)" strokeWidth="4" />
        </Box>
    );
}

export default function Style() {
    const { t } = useTranslation("pages", { keyPrefix: "style" });
    const theme = useTheme();
    const colorCssVars = {
        "--style-paper": theme.palette.background.paper,
        "--style-blue": theme.space.blue,
        "--style-orange": theme.space.orange,
        "--style-yellow": theme.space.yellow,
    };

    return (
        <Stack spacing={{ xs: 5, md: 7 }} sx={colorCssVars}>
            <Box>
                <SectionHeader eyebrow={t("eyebrow")} title={t("title")} note={t("note")} systemId="REF-01" />
                <Typography color="text.secondary" sx={{ maxWidth: 780, mt: 2 }}>
                    {t("intro")}
                </Typography>
            </Box>

            <ShowcaseSection id="style-colors" section={t("sections.colors", { returnObjects: true })}>
                <ColorSwatches t={t} />
            </ShowcaseSection>

            <ShowcaseSection id="style-type" section={t("sections.type", { returnObjects: true })}>
                <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 0 }}>
                    <Stack spacing={2}>
                        {["h1", "h2", "h3", "h4", "h5"].map((variant) => (
                            <Stack key={variant} direction={{ xs: "column", sm: "row" }} gap={1} alignItems={{ sm: "baseline" }}>
                                <TechnicalLabel sx={{ width: { sm: 64 }, flexShrink: 0 }}>{variant.toUpperCase()}</TechnicalLabel>
                                <Typography component="div" variant={variant} sx={{ overflowWrap: "anywhere" }}>{t("type.sample")}</Typography>
                            </Stack>
                        ))}
                        <Divider />
                        <Typography>{t("type.body")}</Typography>
                        <Typography variant="body2" color="text.secondary">{t("type.bodySecondary")}</Typography>
                        <Typography variant="overline">{t("type.mono")}</Typography>
                        <TechnicalLabel sx={{ overflowWrap: "anywhere" }}>{theme.typography.fontFamily}</TechnicalLabel>
                        <TechnicalLabel sx={{ fontFamily: "'Roboto Mono', ui-monospace, monospace", overflowWrap: "anywhere" }}>
                            Roboto Mono / ui-monospace / monospace
                        </TechnicalLabel>
                    </Stack>
                </Paper>
            </ShowcaseSection>

            <ShowcaseSection id="style-controls" section={t("sections.controls", { returnObjects: true })}>
                <Stack spacing={2}>
                    <Stack direction="row" flexWrap="wrap" gap={1.25} alignItems="center">
                        <SpaceButton variant="contained">{t("controls.contained")}</SpaceButton>
                        <SpaceButton variant="outlined">{t("controls.outlined")}</SpaceButton>
                        <Button variant="text">{t("controls.text")}</Button>
                        <Button variant="outlined" disabled>{t("controls.disabled")}</Button>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                        <StatusIndicator>{t("controls.status")}</StatusIndicator>
                        <Typography variant="caption" color="text.secondary">{t("controls.focusHint")}</Typography>
                    </Stack>
                </Stack>
            </ShowcaseSection>

            <ShowcaseSection id="style-surfaces" section={t("sections.surfaces", { returnObjects: true })}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                    <MotionPanel sx={{ p: 2.5 }}>
                        <Stack spacing={1.5} alignItems="flex-start">
                            <TechnicalLabel>{t("surfaces.panelLabel")}</TechnicalLabel>
                            <Typography variant="h5">{t("surfaces.panelCopy")}</Typography>
                            <Chip label={t("surfaces.chip")} size="small" color="primary" variant="outlined" />
                        </Stack>
                    </MotionPanel>
                    <Card variant="outlined" sx={{ p: 2.5, borderRadius: 0 }}>
                        <Stack spacing={1.5} alignItems="flex-start">
                            <TechnicalLabel>{t("surfaces.cardLabel")}</TechnicalLabel>
                            <Typography variant="h5">{t("surfaces.panelCopy")}</Typography>
                            <MissionPatch label={t("surfaces.patch")} size="sm" />
                        </Stack>
                    </Card>
                </Box>
            </ShowcaseSection>

            <ShowcaseSection id="style-graphics" section={t("sections.graphics", { returnObjects: true })}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.4fr .6fr" }, gap: 2 }}>
                    <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 }, borderRadius: 0 }}>
                        <OrbitalDiagram label={t("graphics.diagramLabel")} />
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <TechnicalLabel>{t("graphics.chartLabel")}</TechnicalLabel>
                        <Box role="img" aria-label={t("graphics.chartLabel")} sx={{ display: "flex", height: 8, mt: 2, mb: 1, "& > span:nth-of-type(1)": { bgcolor: "space.blue" }, "& > span:nth-of-type(2)": { bgcolor: "space.yellow" }, "& > span:nth-of-type(3)": { bgcolor: "space.orange" } }}>
                            <Box component="span" sx={{ flex: 1 }} /><Box component="span" sx={{ flex: 1 }} /><Box component="span" sx={{ flex: 1 }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary">{t("graphics.chartCaption")}</Typography>
                        <Stack spacing={0.4} sx={{ mt: 1.5 }}>
                            <TechnicalLabel color="space.blue">{t("graphics.blueSignal")}</TechnicalLabel>
                            <TechnicalLabel color="space.yellow">{t("graphics.yellowSignal")}</TechnicalLabel>
                            <TechnicalLabel color="space.orange">{t("graphics.orangeSignal")}</TechnicalLabel>
                        </Stack>
                    </Paper>
                </Box>
            </ShowcaseSection>

            <ShowcaseSection id="style-motion" section={t("sections.motion", { returnObjects: true })}>
                <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 0 }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(5, 1fr)" }, gap: 2 }}>
                        {[
                            ["fast", t("motion.fast"), theme.motion.fast],
                            ["normal", t("motion.normal"), theme.motion.normal],
                            ["slow", t("motion.slow"), theme.motion.slow],
                            ["radius", t("motion.radius"), `${theme.shape.borderRadius}px`],
                            ["spacing", t("motion.spacing"), theme.spacing(1)],
                        ].map(([key, label, value]) => (
                            <Box key={key}>
                                <TechnicalLabel>{label}</TechnicalLabel>
                                <Typography variant="h6" sx={{ mt: 0.5 }}>{value}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1}>
                        <TechnicalLabel>{t("motion.contentWidth")}: 1160px / {t("motion.responsive")}</TechnicalLabel>
                        <Typography variant="caption" color="text.secondary">{t("motion.reducedMotion")}</Typography>
                    </Stack>
                </Paper>
            </ShowcaseSection>
        </Stack>
    );
}
