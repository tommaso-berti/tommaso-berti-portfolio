import { useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";
import MethodSchematic from "./MethodSchematic.jsx";
import { getMethodProcessId, METHOD_PROCESS_META } from "./methodProcess.config.js";

export default function MethodModule({ t }) {
    const principles = t("personnel.principles", { returnObjects: true });
    const [activeIndex, setActiveIndex] = useState(0);
    const active = principles[activeIndex] || principles[0];
    const processId = getMethodProcessId(activeIndex);
    const meta = METHOD_PROCESS_META[processId];

    return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, .95fr) minmax(360px, .88fr)" }, gap: 2 }}>
        <Stack component="div" spacing={1.5} role="group" aria-label={t("personnel.methodUi.processLabel")}>
            {principles.map((principle, index) => <Button key={principle.code} type="button" onClick={() => setActiveIndex(index)} aria-pressed={activeIndex === index} sx={{ display: "grid", gridTemplateColumns: "6px minmax(0, 1fr) auto", gap: 1.5, alignItems: "start", minHeight: 0, p: { xs: 1.5, sm: 2 }, textAlign: "left", textTransform: "none", justifyContent: "stretch", color: "text.primary", border: "1px solid", borderColor: activeIndex === index ? "text.secondary" : "divider", bgcolor: activeIndex === index ? "background.paper" : "space.panel", boxShadow: activeIndex === index ? "0 12px 28px rgba(23,32,42,.08)" : "none", transform: activeIndex === index ? "translateY(-1px)" : "none", transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease", "&:hover": { borderColor: "text.secondary", transform: "translateY(-2px)" } }}>
                <Box aria-hidden="true" sx={{ width: 6, minHeight: 76, borderRadius: 1, bgcolor: metaFor(index).accent }} />
                <Box sx={{ minWidth: 0, fontFamily: (theme) => theme.typography.fontFamily, letterSpacing: "normal" }}><TechnicalLabel color={metaFor(index).accent}>{principle.code}</TechnicalLabel><Typography component="span" sx={{ display: "block", mt: .5, fontFamily: "inherit", fontSize: { xs: "1.15rem", sm: "1.375rem" }, fontWeight: 740, lineHeight: 1.08, letterSpacing: "-.03em" }}>{principle.title}</Typography><Typography component="span" variant="body2" color="text.secondary" sx={{ display: "block", mt: .55, fontFamily: "inherit", fontSize: { xs: ".82rem", sm: ".875rem" }, fontWeight: 400, lineHeight: 1.55, letterSpacing: "normal" }}>{principle.body}</Typography></Box>
                <Typography aria-hidden="true" sx={{ fontFamily: (theme) => theme.typography.overline.fontFamily, fontSize: "2.4rem", fontWeight: 900, lineHeight: 1, color: activeIndex === index ? "text.secondary" : "divider" }}>{`0${index + 1}`}</Typography>
            </Button>)}
        </Stack>
        <Box component="section" aria-live="polite" sx={{ border: "1px solid", borderColor: "divider", bgcolor: "background.paper", p: { xs: 1.5, sm: 2 }, minWidth: 0 }}>
            <Stack direction="row" justifyContent="space-between" gap={1} alignItems="center"><TechnicalLabel>{active.panelCode}</TechnicalLabel><TechnicalLabel color={meta.accent}>{active.state}</TechnicalLabel></Stack>
            <Typography component="h3" variant="h4" sx={{ mt: 1 }}>{active.title}</Typography><Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>{active.detail}</Typography>
            <Box sx={{ mt: 2 }}><TechnicalLabel>{t("personnel.methodUi.focusLabel")}</TechnicalLabel><Stack direction="row" flexWrap="wrap" gap={.75} sx={{ mt: .75 }}>{active.focus.map((focus) => <Chip key={focus} label={focus} size="small" variant="outlined" />)}</Stack></Box>
            <MethodSchematic type={meta.schematic} labels={active.schematicLabels} />
            <Box sx={{ mt: 2 }}><Box sx={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", height: 4, bgcolor: "divider" }}><Box sx={{ bgcolor: "space.blue" }} /><Box sx={{ bgcolor: "space.yellow" }} /><Box sx={{ bgcolor: "space.orange" }} /><Box aria-hidden="true" sx={{ position: "absolute", top: -4, left: meta.signalPosition, width: 2, height: 12, bgcolor: "text.primary", transform: "translateX(-50%)" }} /></Box><Stack direction="row" justifyContent="space-between" gap={1} sx={{ mt: .8, fontFamily: (theme) => theme.typography.overline.fontFamily, fontSize: ".55rem", letterSpacing: ".1em", textTransform: "uppercase", color: "text.secondary" }}><span>{active.telemetry.left}</span><span>{t("personnel.methodUi.selectionLabel")}</span><span>{active.telemetry.right}</span></Stack></Box>
        </Box>
    </Box>;

    function metaFor(index) {
        return METHOD_PROCESS_META[getMethodProcessId(index)];
    }
}
