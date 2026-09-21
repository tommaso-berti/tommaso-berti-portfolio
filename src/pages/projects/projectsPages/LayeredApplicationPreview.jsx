import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MiniWebappPreview from "../components/MiniWebappPreview.jsx";

const TAB_ROWS = {
    survey: { progress: 76, status: "statusLink", rows: [["type", "FULL-STACK"], ["scope", "E-COMMERCE"], ["auth", "SESSION"], ["api", "REST"], ["status", "READY"]] },
    stack: { progress: 92, status: "statusStack", rows: [["client", "REACT"], ["bundler", "VITE"], ["router", "REACT ROUTER"], ["ui", "MUI"], ["lang", "JAVASCRIPT"]] },
    deploy: { progress: 100, status: "statusDeploy", rows: [["target", "VPS"], ["channel", "PUBLIC"], ["build", "READY"], ["source", "AVAILABLE"], ["health", "NOMINAL"]] },
};

const MODES = ["layered", "scan", "focus"];

export default function LayeredApplicationPreview({ project, preview, t }) {
    const [mode, setMode] = useState("layered");
    const [tab, setTab] = useState("survey");
    const [previewFront, setPreviewFront] = useState(false);
    const current = TAB_ROWS[tab];
    const tx = (key) => t(`dossier.layeredPreview.${key}`);

    const activatePreview = () => {
        if (mode === "layered") setPreviewFront((active) => !active);
    };

    return <Box component="section" sx={{ minWidth: 0, color: "text.primary" }}>
        <Box sx={{ border: "1px solid", borderColor: "divider", bgcolor: "space.secondaryPaper", overflow: "hidden" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ minHeight: 43, px: 1.5, borderBottom: "1px solid", borderColor: "divider", fontFamily: "monospace", fontSize: ".55rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "text.secondary" }}>
                <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{`${project.id.toUpperCase()} // ${tx("module")}`}</Box>
                <Box component="span" sx={{ display: "flex", alignItems: "center", gap: .7, whiteSpace: "nowrap" }}><Box component="i" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "space.green" }} />{tx("ready")}</Box>
            </Stack>

            <Box className={`layered-viewport ${mode} ${previewFront ? "preview-front" : ""}`} sx={{ position: "relative", height: { xs: 560, sm: 430 }, overflow: "hidden", bgcolor: "space.secondaryPaper", backgroundImage: "radial-gradient(circle, rgba(23,32,42,.08) .6px, transparent .7px)", backgroundSize: "12px 12px", "& .layered-scanner, & .layered-preview": { transition: "transform 420ms cubic-bezier(.2,.8,.2,1), left 420ms cubic-bezier(.2,.8,.2,1), right 420ms cubic-bezier(.2,.8,.2,1), top 420ms cubic-bezier(.2,.8,.2,1), bottom 420ms cubic-bezier(.2,.8,.2,1), opacity 300ms ease, filter 300ms ease, box-shadow 420ms ease" }, "&.preview-front .layered-preview": { zIndex: 8, left: { xs: 12, sm: "145px" }, top: { xs: 238, sm: 35 }, boxShadow: "11px 15px 0 rgba(23,32,42,.06), 0 18px 30px rgba(23,32,42,.15)" }, "&.preview-front .layered-scanner": { zIndex: 2, transform: { xs: "translateY(23px) scale(.975)", sm: "translate(-8px,26px) scale(.975)" }, filter: "saturate(.78)", opacity: .82 }, "&.scan .layered-preview": { left: { xs: 30, sm: "210px" }, top: { xs: 290, sm: 76 }, zIndex: 2 }, "&.scan .layered-scanner": { zIndex: 7 }, "&.focus .layered-scanner": { transform: { xs: "translateY(-245px)", sm: "translate(-220px,-24px)" }, opacity: 0 }, "&.focus .layered-preview": { left: { xs: 12, sm: 26 }, right: { xs: 12, sm: 26 }, top: { xs: 20, sm: 27 }, bottom: 48, zIndex: 8 }, "&:not(.focus):not(.scan) .layered-preview:hover": { zIndex: 8, left: { xs: 12, sm: "145px" }, top: { xs: 238, sm: 35 } } }}>
                <Box aria-hidden="true" sx={{ position: "absolute", width: 360, height: 360, right: -185, top: 108, border: "1px solid", borderColor: "rgba(23,32,42,.11)", borderRadius: "50%" }} />
                <Box aria-hidden="true" sx={{ position: "absolute", width: 590, height: 205, right: -290, top: 218, border: "1px solid", borderColor: "rgba(23,32,42,.11)", borderRadius: "50%", transform: "rotate(8deg)" }} />

                <Box className="layered-scanner" component="aside" sx={{ position: "absolute", zIndex: 5, left: { xs: 12, sm: 19 }, right: { xs: 12, sm: "auto" }, top: { xs: 12, sm: 19 }, width: { xs: "auto", sm: 196 }, bgcolor: "rgba(241,237,227,.95)", border: "1px solid", borderColor: "#aaa79e", borderLeft: "3px solid", borderLeftColor: "text.primary", boxShadow: "6px 9px 0 rgba(23,32,42,.045), 0 6px 15px rgba(23,32,42,.08)", backdropFilter: "blur(7px)" }}>
                    <Box sx={{ p: 1.35, borderBottom: "1px solid", borderColor: "#b8b5ab" }}><Typography sx={{ fontFamily: "monospace", fontSize: ".42rem", letterSpacing: ".15em", color: "text.secondary", mb: .6 }}>{tx("surveyCode")}</Typography><Typography sx={{ fontWeight: 800, fontSize: "1rem", lineHeight: 1, letterSpacing: "-.035em", mb: .35 }}>{t(project.titleKey)}</Typography><Typography sx={{ fontFamily: "monospace", fontSize: ".4rem", letterSpacing: ".07em", color: "text.secondary" }}>{tx("system")}</Typography></Box>
                    <Stack direction="row" sx={{ borderBottom: "1px solid", borderColor: "#b8b5ab" }}>{["survey", "stack", "deploy"].map((item) => <Button key={item} onClick={() => setTab(item)} sx={{ minWidth: 0, flex: 1, height: 28, px: .3, borderRadius: 0, borderRight: item !== "deploy" ? "1px solid" : 0, borderColor: "#c5c1b7", color: tab === item ? "text.primary" : "text.secondary", bgcolor: tab === item ? "rgba(23,32,42,.035)" : "transparent", fontSize: ".4rem", letterSpacing: ".1em", "&:hover": { bgcolor: "rgba(23,32,42,.07)" } }}>{tx(`${item}Tab`)}</Button>)}</Stack>
                    <Box sx={{ p: 1 }}><Stack direction="row" justifyContent="space-between" sx={{ fontFamily: "monospace", fontSize: ".4rem", letterSpacing: ".08em", textTransform: "uppercase", color: "text.secondary", mb: .55 }}><span>{tx("survey")}</span><span>{current.progress}%</span></Stack><Box sx={{ height: 3, bgcolor: "#cfcbbf", mb: 1 }}><Box sx={{ width: `${current.progress}%`, height: "100%", bgcolor: "text.secondary", transition: "width 300ms ease" }} /></Box>{current.rows.map(([label, value]) => <Stack key={label} direction="row" sx={{ minHeight: 21, borderBottom: "1px solid", borderColor: "#cbc7bc", fontFamily: "monospace", fontSize: ".4rem", letterSpacing: ".035em", textTransform: "uppercase" }}><Box sx={{ width: "44%", px: .6, display: "flex", alignItems: "center", bgcolor: "rgba(23,32,42,.055)", color: "text.secondary" }}>{tx(label)}</Box><Box sx={{ width: "56%", px: .6, display: "flex", alignItems: "center", justifyContent: "flex-end", textAlign: "right", fontWeight: 700 }}>{value}</Box></Stack>)}<Typography sx={{ mt: 1, fontFamily: "monospace", fontSize: ".4rem", letterSpacing: ".1em", color: "text.secondary", textTransform: "uppercase" }}>{tx("resources")}</Typography><Stack direction="row" gap={.5} sx={{ mt: .55 }}>{["R", "V", "M", "API"].map((item) => <Box key={item} sx={{ width: 25, height: 25, display: "grid", placeItems: "center", border: "1px solid", borderColor: "#aaa89f", fontFamily: "monospace", fontSize: ".4rem", fontWeight: 700 }}>{item}</Box>)}</Stack></Box>
                </Box>

                <Box className="layered-preview" role="button" tabIndex={0} onClick={activatePreview} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") activatePreview(); }} aria-label={tx("previewAria")} sx={{ position: "absolute", zIndex: 3, left: { xs: 30, sm: 174 }, right: { xs: 12, sm: 24 }, top: { xs: 272, sm: 59 }, bottom: 47, border: "1px solid", borderColor: "#aaa79e", bgcolor: "background.paper", boxShadow: "9px 12px 0 rgba(23,32,42,.055), 0 12px 22px rgba(23,32,42,.10)", cursor: "pointer", outline: "none", "&:focus-visible": { outline: "2px solid", outlineColor: "space.blue", outlineOffset: 2 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: 31, px: 1.2, pt: .3, borderBottom: "1px solid", borderColor: "divider", bgcolor: "space.panel", fontFamily: "monospace", fontSize: ".4rem", letterSpacing: ".1em", textTransform: "uppercase", color: "text.secondary" }}><span>{tx("previewId")}</span><span><Box component="i" sx={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", bgcolor: "space.green", mr: .5 }} />{tx("online")}</span></Stack>
                    <Box sx={{ position: "absolute", inset: "31px 0 0", p: { xs: 1, sm: 1.3 }, bgcolor: "background.paper" }} onClick={(event) => event.stopPropagation()}><MiniWebappPreview url={preview.url} title={t(project.titleKey)} width="100%" height="100%" scale={1} disableFullscreen deferLoad loadPreviewLabel={t("load_preview")} loadPreviewTooltip={t("load_preview_tooltip")} sx={{ borderRadius: 0, height: "100%", boxShadow: "none", border: 0, "&:hover": { transform: "none", boxShadow: "none" } }} /></Box>
                </Box>

                <Stack direction="row" justifyContent="space-between" sx={{ position: "absolute", left: 19, right: 18, bottom: 16, zIndex: 10, fontFamily: "monospace", fontSize: ".42rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "text.secondary" }}><span>{`${tx("node")} ${project.id.toUpperCase()}`}</span><span>{tx(TAB_ROWS[tab].status)}</span></Stack>
            </Box>
            <Box aria-hidden="true" sx={{ height: 5, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", "& span:nth-of-type(1)": { bgcolor: "space.red" }, "& span:nth-of-type(2)": { bgcolor: "space.orange" }, "& span:nth-of-type(3)": { bgcolor: "space.yellow" }, "& span:nth-of-type(4)": { bgcolor: "space.blue" } }}><span /><span /><span /><span /></Box>
        </Box>
        <Stack direction="row" justifyContent="flex-end" gap={.6} flexWrap="wrap" sx={{ mt: 1 }}><Typography component="span" sx={{ position: "absolute", width: 1, height: 1, p: 0, m: -1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }}>{tx("modeLabel")}</Typography>{MODES.map((item) => <Button key={item} onClick={() => { setMode(item); setPreviewFront(false); }} aria-pressed={mode === item} variant={mode === item ? "contained" : "outlined"} sx={{ minHeight: 32, px: 1.2, fontSize: ".45rem" }}>{tx(item)}</Button>)}</Stack>
    </Box>;
}
