import { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ACCENTS = ["space.blue", "space.yellow", "space.orange"];

function HobbyOrbit({ accent }) {
    return <Box aria-hidden="true" sx={{ width: 46, height: 46, color: accent, display: "grid", placeItems: "center", position: "relative" }}>
        <Box sx={{ position: "absolute", inset: 3, border: "1px solid", borderColor: "text.secondary", borderRadius: "50%", opacity: .72 }} />
        <Box sx={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", bgcolor: "text.secondary", opacity: .45 }} />
        <Box sx={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", bgcolor: "text.secondary", opacity: .45 }} />
        <Box sx={{ width: 13, height: 13, borderRadius: "50%", bgcolor: accent, boxShadow: (theme) => `0 0 0 4px ${theme.palette.background.paper}`, zIndex: 1 }} />
    </Box>;
}

function HobbyCard({ item, index, active, onSelect }) {
    const accent = ACCENTS[index] || ACCENTS[0];

    return <Card component="article" variant="outlined" sx={{ position: "relative", minHeight: { xs: 0, md: 270 }, overflow: "hidden", bgcolor: active ? "background.paper" : "space.panel", borderColor: active ? "space.blue" : "divider", transform: active ? "translateY(-3px)" : "none", boxShadow: active ? 2 : 0, transition: (theme) => `transform ${theme.motion.normal} ${theme.motion.easing}, border-color ${theme.motion.normal} ease, box-shadow ${theme.motion.normal} ease, background-color ${theme.motion.normal} ease`, "&:hover": { transform: "translateY(-4px)", borderColor: "text.secondary" }, "&::before": active ? { content: '""', position: "absolute", top: 0, bottom: 0, left: 0, width: 3, bgcolor: "space.orange" } : undefined }}>
        <CardActionArea component="button" onClick={() => onSelect(item.id)} aria-pressed={active} sx={{ height: "100%", display: "block", color: "inherit", textAlign: "left", "&:focus-visible": { outline: "2px solid", outlineColor: "space.blue", outlineOffset: -3 } }}>
            <Stack sx={{ minHeight: { xs: 0, md: 270 }, p: { xs: 2, sm: 2.5 }, position: "relative" }}>
                <Typography variant="overline" color="text.secondary" sx={{ fontSize: ".58rem", letterSpacing: ".14em" }}>{item.code}{" // "}{item.kicker}</Typography>
                <Box sx={{ mt: 1.75 }}><HobbyOrbit accent={accent} /></Box>
                <Typography component="h3" variant="h5" sx={{ mt: 1.7, mb: .75, letterSpacing: "-.025em" }}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>{item.description}</Typography>
                <Stack direction="row" flexWrap="wrap" gap={.7} sx={{ mt: "auto", pt: 1.8 }}>
                    {item.tags.map((tag) => <Box key={tag} component="span" sx={{ border: "1px solid", borderColor: "divider", px: .85, py: .55, bgcolor: "background.paper", color: "text.secondary", fontFamily: (theme) => theme.typography.overline.fontFamily, fontSize: ".57rem", fontWeight: 800, letterSpacing: ".09em", lineHeight: 1.1, textTransform: "uppercase" }}>{tag}</Box>)}
                </Stack>
            </Stack>
        </CardActionArea>
    </Card>;
}

function Telemetry({ item, labels }) {
    return <Box aria-live="polite" sx={{ position: "relative", minHeight: { xs: 0, md: 270 }, overflow: "hidden", border: "1px solid", borderColor: "space.blue", bgcolor: "space.secondaryPaper", p: { xs: 2, sm: 2.5 }, "&::after": { content: '""', position: "absolute", width: 160, height: 160, right: -56, bottom: -74, border: "1px solid", borderColor: "space.blue", borderRadius: "50%", opacity: .2, boxShadow: "0 0 0 18px rgba(52,124,178,.04), 0 0 0 40px rgba(52,124,178,.025)", pointerEvents: "none" } }}>
        <Stack direction="row" justifyContent="space-between" gap={1} sx={{ pb: 1.5, borderBottom: "1px solid", borderColor: "divider", position: "relative", zIndex: 1 }}>
            <Typography variant="overline" color="text.secondary" sx={{ fontSize: ".58rem" }}>{labels.title}</Typography>
            <Typography variant="overline" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: .7, fontSize: ".58rem" }}><Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "space.orange", animation: "statusPulse 1.9s infinite" }} />{labels.live}</Typography>
        </Stack>
        <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography component="h3" variant="h4" sx={{ mt: 2, letterSpacing: "-.03em" }}>{item.title}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.6, minHeight: { md: 72 }, maxWidth: 460 }}>{item.telemetry}</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 1.5, mt: 2.5 }}>
                {[{ label: labels.trait, value: item.trait }, { label: labels.mode, value: item.mode }].map((metric) => <Box key={metric.label} sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1 }}><Typography variant="overline" color="text.secondary" sx={{ display: "block", fontSize: ".55rem" }}>{metric.label}</Typography><Typography variant="body2" sx={{ mt: .45, fontWeight: 700 }}>{metric.value}</Typography></Box>)}
            </Box>
        </Box>
    </Box>;
}

export default function Hobbies({ embedded = false }) {
    const { t } = useTranslation("pages", { keyPrefix: "about.hobbies" });
    const items = t("items", { returnObjects: true });
    const [selectedId, setSelectedId] = useState(items[0]?.id || "volleyball");
    const selectedItem = items.find((item) => item.id === selectedId) || items[0];

    return <Stack id="hobbies" spacing={3} component="section" sx={{ marginTop: embedded ? 0 : "3rem", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}>
        {!embedded ? <><Typography variant="overline" color="text.secondary">{t("sectionLabel")}</Typography><Typography component="h2" variant="h3">{t("title")}</Typography></> : null}
        <Typography color="text.secondary" sx={{ maxWidth: 760 }}>{t("lead")}</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.55fr) minmax(300px, .7fr)" }, gap: { xs: 1.5, md: 2.5 }, alignItems: "stretch" }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: 1.5 }}>
                {items.map((item, index) => <HobbyCard key={item.id} item={item} index={index} active={selectedId === item.id} onSelect={setSelectedId} />)}
            </Box>
            {selectedItem ? <Telemetry item={selectedItem} labels={t("telemetry", { returnObjects: true })} /> : null}
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1.5} sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1.5, color: "text.secondary", fontFamily: (theme) => theme.typography.overline.fontFamily, fontSize: ".58rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>
            <Box component="span">{t("footer.route")}</Box>
            <Stack direction="row" flexWrap="wrap" gap={1.5}>{t("footer.legend", { returnObjects: true }).map((entry, index) => <Box key={entry} component="span" sx={{ display: "flex", alignItems: "center", gap: .65 }}><Box component="i" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: ACCENTS[index] || ACCENTS[0] }} />{entry}</Box>)}</Stack>
        </Stack>
    </Stack>;
}
