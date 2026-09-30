import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import SpaceButton from "./SpaceButton.jsx";
import TechnicalLabel from "./TechnicalLabel.jsx";

function OrbitalSignature({ mission, accent, t }) {
    const patternId = `orbit-grid-${mission.id}`;
    return <Box sx={{ minHeight: 220, borderLeft: { xs: 0, md: "1px solid" }, borderTop: { xs: "1px solid", md: 0 }, borderColor: "divider", pl: { xs: 0, md: 2 }, pt: { xs: 2, md: 0 }, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
            <TechnicalLabel>{t("dossier.orbitalSignature")}</TechnicalLabel>
            {mission.accent ? <Box sx={{ mt: 1, height: 190, minWidth: 0, border: "1px solid", borderColor: "divider", overflow: "hidden", bgcolor: "rgba(23,32,42,.025)" }}>
                <Box component="svg" viewBox="0 0 320 190" role="img" aria-label={t("dossier.orbitalSignature")} sx={{ display: "block", width: "100%", height: "100%" }}>
                    <defs><pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(23,32,42,.09)" strokeWidth="1" /></pattern></defs>
                    <rect width="320" height="190" fill={`url(#${patternId})`} />
                    <line x1="0" y1="95" x2="320" y2="95" stroke="rgba(23,32,42,.24)" strokeWidth="1" />
                    <line x1="160" y1="0" x2="160" y2="190" stroke="rgba(23,32,42,.24)" strokeWidth="1" />
                    <g transform="rotate(-16 160 95)"><ellipse cx="160" cy="95" rx="116" ry="43" fill="none" stroke={accent} strokeWidth="2" /><circle cx="234.6" cy="62.1" r="6" fill={accent} /></g>
                    <ellipse cx="160" cy="95" rx="78" ry="78" fill="none" stroke="rgba(23,32,42,.25)" strokeWidth="2" />
                    <circle cx="160" cy="95" r="18" fill="rgba(247,244,236,.9)" stroke={accent} strokeWidth="3" />
                </Box>
            </Box> : <Box sx={{ mt: 1, height: 190, display: "grid", placeItems: "center", border: "1px solid", borderColor: "divider", bgcolor: "rgba(23,32,42,.06)" }}><Typography sx={{ px: 1.5, py: .9, border: "1px solid", borderColor: "divider", bgcolor: "rgba(23,32,42,.12)", fontFamily: (theme) => theme.fonts.mono, fontSize: ".7rem", letterSpacing: ".12em", color: "text.secondary" }}>✕ DATA UNAVAILABLE</Typography></Box>}
        </Box>
        <Stack direction="row" justifyContent="space-between" sx={{ pt: 1, mt: 2, borderTop: "1px solid", borderColor: "divider" }}><TechnicalLabel sx={{ fontSize: ".58rem" }}>{`${t("dossier.node")} ${mission.id.toUpperCase()}`}</TechnicalLabel><TechnicalLabel sx={{ fontSize: ".58rem" }}>{mission.accent ? "SYS.OK" : "SCAN.UNAVAILABLE"}</TechnicalLabel></Stack>
    </Box>;
}

export default function MissionCard({ mission, selected, dimmed, onSelect, t }) {
    const theme = useTheme();
    const accent = mission.accent || (mission.color === "space.orange" ? theme.space.orange : theme.space.blue);
    const markSx = {
        alignSelf: selected ? "start" : "center", justifySelf: "end", width: selected ? 82 : 60, height: selected ? 82 : 60, border: "1px solid", borderColor: "divider", borderRadius: "50%", position: "relative", display: "grid", placeItems: "center",
        transform: selected ? "rotate(12deg)" : "none", transition: "width 560ms cubic-bezier(.16,.84,.2,1), height 560ms cubic-bezier(.16,.84,.2,1), transform 560ms cubic-bezier(.16,.84,.2,1)",
        "&::before": { content: '""', position: "absolute", left: "73.5%", top: "33.5%", width: 6, height: 6, borderRadius: "50%", bgcolor: accent, boxShadow: "0 0 0 7px rgba(52,124,178,.09)", transform: "translate(-50%, -50%)" },
        "&::after": { content: '""', position: "absolute", width: "78%", height: "26%", border: "1px solid", borderColor: accent, borderRadius: "50%", transform: "rotate(-16deg)" },
    };

    return <Card component="article" data-project-card={mission.id} variant="outlined" sx={{ gridColumn: { xs: "auto", md: selected ? "1 / -1" : "auto" }, minWidth: 0, position: "relative", overflow: "hidden", borderColor: selected ? accent : "divider", bgcolor: selected ? "space.secondaryPaper" : "background.paper", opacity: dimmed ? .58 : 1, transition: "border-color 350ms ease, opacity 350ms ease, background-color 350ms ease", "&::before": { content: '""', position: "absolute", left: 0, top: 0, bottom: 0, width: 4, bgcolor: accent, transform: selected ? "scaleY(1)" : "scaleY(.32)", transformOrigin: "top", opacity: selected ? 1 : .75, transition: "transform 560ms cubic-bezier(.16,.84,.2,1), opacity 350ms ease" }, "&:hover::before": { transform: "scaleY(.58)" } }}>
        <CardActionArea component="button" onClick={onSelect} aria-expanded={selected} sx={{ width: "100%", display: "block", color: "inherit", textAlign: "left", cursor: "pointer", "&:focus-visible": { outline: "2px solid", outlineColor: accent, outlineOffset: -4 } }}>
            <CardContent sx={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 74px", gap: 2, minHeight: selected ? 0 : { xs: 152, md: 170 }, p: { xs: 1.8, md: 2 }, pl: { xs: 2.3, md: 2.6 } }}>
                <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", justifyContent: selected ? "flex-start" : "space-between", gap: 2 }}><Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0, overflow: "hidden" }}><TechnicalLabel sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mission.overline}</TechnicalLabel><Box sx={{ width: 24, height: 1, bgcolor: "divider", flexShrink: 0 }} /></Stack><Box><Typography component="h2" variant="h5" sx={{ fontSize: selected ? { xs: "2.1rem", md: "clamp(2.2rem, 5vw, 3.8rem)" } : undefined, letterSpacing: "-.055em", lineHeight: .95, transition: "font-size 560ms cubic-bezier(.16,.84,.2,1)", mb: .8 }}>{mission.title}</Typography>{selected ? null : <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>{mission.description}</Typography>}</Box></Box>
                <Box aria-hidden="true" sx={markSx} />
            </CardContent>
        </CardActionArea>
        <Box sx={{ display: "grid", gridTemplateRows: selected ? "1fr" : "0fr", opacity: selected ? 1 : 0, transition: "grid-template-rows 560ms cubic-bezier(.16,.84,.2,1), opacity 250ms ease", transitionDelay: selected ? "0ms, 120ms" : "0ms" }}>
            <Box sx={{ minHeight: 0, overflow: "hidden" }}><Box sx={{ mx: { xs: 2.3, md: 2.6 }, mb: 2, pt: 2, borderTop: "1px solid", borderColor: "divider", display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.12fr) minmax(250px, .88fr)" }, gap: { xs: 2.5, md: 4 } }}>
                <Box><TechnicalLabel>{`${String(mission.overline).split(" // ")[0]} / ${t("dossier.moduleLabels.overview")}`}</TechnicalLabel><Typography sx={{ mt: 1, lineHeight: 1.68 }}>{mission.description}</Typography><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: 1.5, mt: 2.5 }}><Box sx={{ pt: 1, borderTop: "1px solid", borderColor: "divider" }}><TechnicalLabel sx={{ fontSize: ".58rem" }}>{t("dossier.projectType")}</TechnicalLabel><Typography variant="body2">{mission.overline.split(" // ")[0]}</Typography></Box><Box sx={{ pt: 1, borderTop: "1px solid", borderColor: "divider" }}><TechnicalLabel sx={{ fontSize: ".58rem" }}>{t("dossier.primaryStack")}</TechnicalLabel><Typography variant="body2">{mission.technologies.slice(0, 3).join(" · ")}</Typography></Box><Box sx={{ pt: 1, borderTop: "1px solid", borderColor: "divider" }}><TechnicalLabel sx={{ fontSize: ".58rem" }}>{t(mission.statusLabel ? "dossier.channel" : "dossier.projectReady")}</TechnicalLabel><Typography variant="body2" sx={{ color: accent }}><Box component="span" sx={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", bgcolor: accent, mr: .6, verticalAlign: "middle" }} />{mission.statusLabel || t("dossier.activeMission")}</Typography></Box></Box><Stack direction="row" gap={.8} flexWrap="wrap" sx={{ mt: 2 }}><SpaceButton component={RouterLink} to={`/projects/${mission.id}`} variant="contained">{mission.primaryAction.label} →</SpaceButton><SpaceButton component={Link} href={mission.secondaryAction.href} target="_blank" rel="noreferrer" variant="outlined">{mission.secondaryAction.label}</SpaceButton>{mission.githubAction ? <SpaceButton component={Link} href={mission.githubAction.href} target="_blank" rel="noreferrer" variant="outlined" aria-label={mission.githubAction.label} sx={{ minWidth: 52, width: 52, px: 0 }}><GitHubIcon fontSize="small" /></SpaceButton> : null}<Button onClick={onSelect} variant="text">{t("dossier.collapse")}</Button></Stack></Box>
                <OrbitalSignature mission={mission} accent={accent} t={t} />
            </Box></Box>
        </Box>
    </Card>;
}
