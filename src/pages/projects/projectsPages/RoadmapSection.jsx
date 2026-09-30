import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function RoadmapSection({ roadmapTitle, roadmap, t }) {
    const steps = Array.isArray(roadmap) ? roadmap : [];
    const [activeStep, setActiveStep] = useState(() => {
        const currentIndex = steps.findIndex((step) => step.status === "current");
        return currentIndex >= 0 ? currentIndex : Math.max(0, Math.min(1, steps.length - 1));
    });
    if (!steps.length) return null;
    const stateAt = (index) => steps[index]?.status || (index === 0 ? "current" : index < 3 ? "done" : "planned");
    const stateColor = (state) => state === "done" ? "space.green" : state === "current" ? "space.blue" : "#afafa8";
    const selected = steps[activeStep];
    const terminal = (key) => t(`dossier.roadmapTerminal.${key}`);
    const sideRows = [
        [terminal("releaseProfile"), selected.title],
        [terminal("nodeStatus"), t(`dossier.roadmapStatus.${stateAt(activeStep)}`)],
        [terminal("deliveryState"), stateAt(activeStep) === "planned" ? terminal("queued") : terminal("ready")],
    ];

    return <Box component="section" id="roadmap" sx={{ position: "relative", overflow: "hidden", p: { xs: 1.5, md: 2.5 }, border: "1px solid", borderColor: "divider", bgcolor: "rgba(241,237,227,.62)", backgroundImage: "radial-gradient(circle at 15% 18%, rgba(59,124,164,.06), transparent 18%), radial-gradient(circle at 72% 72%, rgba(213,180,59,.07), transparent 18%), radial-gradient(circle, rgba(23,32,42,.15) 1px, transparent 1.2px), radial-gradient(circle, rgba(23,32,42,.09) 1px, transparent 1.2px)", backgroundSize: "auto, auto, 92px 92px, 128px 128px", backgroundPosition: "center, center, 10px 12px, 58px 70px" }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "flex-end" }} gap={1.5} sx={{ position: "relative", zIndex: 2, mb: 2.5 }}><Box><Typography variant="h4" sx={{ mb: .6 }}>{roadmapTitle}</Typography><Typography sx={{ fontFamily: (theme) => theme.fonts.mono, fontSize: ".58rem", letterSpacing: ".13em", textTransform: "uppercase", color: "text.secondary" }}>{t("dossier.roadmapMeta")}</Typography></Box><Stack direction="row" gap={1.4} flexWrap="wrap" sx={{ fontFamily: (theme) => theme.fonts.mono, fontSize: ".52rem", letterSpacing: ".1em", textTransform: "uppercase", color: "text.secondary" }}>{["done", "current", "planned"].map((item) => <Box key={item} component="span" sx={{ display: "flex", alignItems: "center", gap: .65 }}><Box component="i" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: stateColor(item) }} />{t(`dossier.roadmapStatus.${item}`)}</Box>)}</Stack></Stack>
        <Box sx={{ position: "relative", zIndex: 2, height: { xs: 350, sm: 178 }, mb: 2 }}>
            <Box sx={{ position: "relative", display: "grid", gridTemplateColumns: { xs: "1fr", sm: `repeat(${steps.length}, 1fr)` }, height: "100%", alignItems: "center" }}>{steps.map((step, index) => { const state = stateAt(index); return <Button key={step.title} onClick={() => setActiveStep(index)} aria-pressed={activeStep === index} disableRipple sx={{ minWidth: 0, height: "100%", px: 1, py: 1, display: "flex", flexDirection: { xs: "row", sm: "column" }, justifyContent: "center", gap: { xs: 1.2, sm: 1 }, color: "text.primary", border: 0, bgcolor: "transparent !important", boxShadow: "none !important", borderRadius: 0, outline: "none !important", "&:focus, &:focus-visible, &.Mui-focusVisible, &:active": { outline: "none !important", backgroundColor: "transparent !important", boxShadow: "none !important" }, "&:hover .roadmap-orbit, &[aria-pressed=true] .roadmap-orbit": { transform: "translateY(-3px) scale(1.03)", borderColor: "text.primary", boxShadow: "0 10px 18px rgba(23,32,42,.08)" } }}><Box className="roadmap-orbit" sx={{ position: "relative", width: 68, height: 68, flexShrink: 0, display: "grid", placeItems: "center", border: "1px solid", borderColor: activeStep === index ? "text.primary" : "rgba(23,32,42,.24)", borderRadius: "50%", bgcolor: "rgba(255,255,255,.16)", transition: ".22s ease" }}><Box sx={{ position: "absolute", inset: 7, border: "1px dashed", borderColor: "rgba(23,32,42,.2)", borderRadius: "50%" }} /><Box sx={{ width: 18, height: 18, borderRadius: "50%", bgcolor: stateColor(state), boxShadow: state === "done" ? "0 0 0 8px rgba(111,149,119,.14)" : state === "current" ? "0 0 0 8px rgba(59,124,164,.18)" : "0 0 0 6px rgba(179,179,172,.12)" }} /></Box><Box sx={{ textAlign: { xs: "left", sm: "center" } }}><Typography sx={{ fontFamily: (theme) => theme.fonts.mono, fontSize: ".55rem", letterSpacing: ".14em", textTransform: "uppercase", color: "text.secondary" }}>{`${t("dossier.node")} ${String(index + 1).padStart(2, "0")}`}</Typography><Typography sx={{ fontWeight: 750, fontSize: ".86rem", lineHeight: 1.1 }}>{step.title}</Typography></Box></Button>; })}</Box>
        </Box>
        <Box sx={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0,1.15fr) minmax(280px,.85fr)" }, gap: 2 }}>
            <Terminal title={terminal("releaseConsole")}><Box sx={{ p: { xs: 1.5, md: 2 } }}><Prompt label={`${terminal("loadRelease")} // ${selected.title}`} /> <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={1.5} sx={{ mb: 1.8 }}><Typography variant="h5" sx={{ fontWeight: 800 }}>{selected.title}</Typography><Box sx={{ px: 1.5, py: 1, border: "1px solid", borderColor: "divider", bgcolor: "rgba(255,255,255,.18)", fontFamily: (theme) => theme.fonts.mono, fontSize: ".55rem", letterSpacing: ".14em", textTransform: "uppercase", color: "text.secondary" }}>{t(`dossier.roadmapStatus.${stateAt(activeStep)}`)}</Box></Stack><Stack spacing={1.2}>{(Array.isArray(selected.content) ? selected.content : [selected.content]).map((content, index) => <Stack key={content} direction="row" gap={1.2} alignItems="flex-start"><Typography sx={{ flexShrink: 0, fontFamily: (theme) => theme.fonts.mono, fontSize: ".58rem", letterSpacing: ".1em", color: "text.secondary", pt: .25 }}>{`[0${index + 1}]`}</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.5 }}>{content}</Typography></Stack>)}</Stack></Box></Terminal>
            <Terminal title={terminal("systemReadout")}><Box sx={{ p: { xs: 1.5, md: 2 } }}><Prompt label={terminal("activeModules")} /><Stack spacing={1.5} sx={{ mt: 1.5 }}>{sideRows.map(([label, value]) => <Stack key={label} direction="row" gap={1} alignItems="center" sx={{ fontFamily: (theme) => theme.fonts.mono, fontSize: ".58rem", color: "text.secondary" }}><Box component="span" sx={{ whiteSpace: "nowrap" }}>{label}</Box><Box component="span" sx={{ flex: 1, borderBottom: "1px dotted", borderColor: "divider", minWidth: 16 }} /><Box component="span" sx={{ textAlign: "right", textTransform: "uppercase" }}>{value}</Box></Stack>)}</Stack><Typography sx={{ mt: 2, fontFamily: (theme) => theme.fonts.mono, fontSize: ".52rem", lineHeight: 1.5, color: "text.secondary" }}>{terminal("note")}</Typography></Box></Terminal>
        </Box>
    </Box>;
}

function Terminal({ title, children }) {
    return <Box sx={{ minHeight: "100%", border: "1px solid", borderColor: "rgba(23,32,42,.48)", bgcolor: "rgba(243,240,232,.84)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.5)" }}><Stack direction="row" justifyContent="space-between" alignItems="center" gap={1.5} sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}><Typography sx={{ fontFamily: (theme) => theme.fonts.mono, fontSize: ".56rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "text.secondary" }}>{title}</Typography><Stack direction="row" gap={.75}>{["space.red", "space.yellow", "space.green"].map((color) => <Box key={color} sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: color }} />)}</Stack></Stack>{children}</Box>;
}

function Prompt({ label }) {
    return <Stack direction="row" gap={1} sx={{ mb: 1.5, fontFamily: (theme) => theme.fonts.mono, fontSize: ".58rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "text.secondary" }}><Box component="span" sx={{ color: "space.blue" }}>&gt;</Box><span>{label}</span></Stack>;
}
