import { useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const infraIds = ["apps", "api", "data", "experiments"];
const serviceIds = ["apps", "api", "data", "jobs", "monitor", "experiments"];

export default function SystemsInfrastructure({ t }) {
    const [activeInfra, setActiveInfra] = useState("apps");
    const active = t(`infrastructure.modes.${activeInfra}`, { returnObjects: true });
    const labels = t("infrastructure.modeNames", { returnObjects: true });

    return <Box sx={{ border: "1px solid", borderColor: "divider", bgcolor: "space.panel" }}>
        <Box role="group" aria-label={t("infrastructure.modeLabel")} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, minmax(0, 1fr))" }, borderBottom: "1px solid", borderColor: "divider" }}>
            {infraIds.map((id, index) => <ButtonBase key={id} type="button" aria-pressed={activeInfra === id} aria-controls="systems-infrastructure-detail" onClick={() => setActiveInfra(id)} sx={{ minHeight: 46, px: 1, borderRight: { xs: index % 2 === 0 ? "1px solid" : 0, sm: index < infraIds.length - 1 ? "1px solid" : 0 }, borderBottom: { xs: index < 2 ? "1px solid" : 0, sm: 0 }, borderColor: "divider", bgcolor: activeInfra === id ? "text.primary" : "transparent", color: activeInfra === id ? "background.paper" : "text.primary", "&:focus-visible": { outline: "2px solid", outlineColor: "space.blue", outlineOffset: -3 } }}>
                <Typography variant="overline" sx={{ fontFamily: "monospace", fontWeight: 700 }}>{labels[id]}</Typography>
            </ButtonBase>)}
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.15fr .85fr" } }}>
            <Box sx={{ p: { xs: 2, sm: 2.5 }, minWidth: 0 }}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={.25} sx={{ mb: 1.75 }}>
                    <Typography variant="overline" sx={{ color: "text.secondary", fontFamily: "monospace", overflowWrap: "anywhere" }}>{t("infrastructure.diagram.label")}</Typography>
                    <Typography variant="overline" sx={{ color: "space.orange", fontFamily: "monospace", flexShrink: 0 }}>{t("infrastructure.diagram.code")}</Typography>
                </Stack>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "minmax(0, 1fr) 32px minmax(0, 1fr)" }, alignItems: "center", gap: 1, minWidth: 0 }}>
                    <Box sx={{ p: 1.25, border: "1px solid", borderColor: "divider", bgcolor: "background.default", textAlign: "center", minWidth: 0 }}>
                        <Typography variant="overline" sx={{ fontFamily: "monospace", display: "block", overflowWrap: "anywhere" }}>{t("infrastructure.diagram.internet")}</Typography>
                    </Box>
                    <Typography aria-hidden="true" sx={{ textAlign: "center", color: "text.secondary", display: { xs: "none", sm: "block" } }}>→</Typography>
                    <Box sx={{ p: 1.25, border: "1px solid", borderColor: "divider", bgcolor: "background.default", textAlign: "center", minWidth: 0 }}>
                        <Typography variant="overline" sx={{ fontFamily: "monospace", display: "block", overflowWrap: "anywhere" }}>{t("infrastructure.diagram.edge")}</Typography>
                    </Box>
                    <Typography aria-hidden="true" sx={{ gridColumn: { xs: "1", sm: "1 / -1" }, textAlign: "center", color: "text.secondary", lineHeight: 1, py: .25 }}>↓</Typography>
                    <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" }, p: 1.25, border: "1px solid", borderColor: "text.primary", bgcolor: "background.default", textAlign: "center", minWidth: 0 }}>
                        <Typography variant="overline" sx={{ fontFamily: "monospace", display: "block", mb: 1, overflowWrap: "anywhere" }}>{t("infrastructure.diagram.server")}</Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: .6, minWidth: 0 }}>
                            {serviceIds.map((id) => <Typography key={id} variant="caption" sx={{ p: .65, border: "1px solid", borderColor: active.services.includes(id) ? "space.orange" : "divider", color: active.services.includes(id) ? "text.primary" : "text.secondary", fontFamily: "monospace", minWidth: 0, overflowWrap: "anywhere", lineHeight: 1.3 }}>{t(`infrastructure.services.${id}`)}</Typography>)}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Stack id="systems-infrastructure-detail" role="region" aria-live="polite" aria-label={active.title} spacing={1.25} sx={{ p: { xs: 2, sm: 2.5 }, borderTop: { xs: "1px solid", md: 0 }, borderLeft: { md: "1px solid" }, borderColor: "divider", bgcolor: "background.default", minWidth: 0 }}>
                <Box><Typography variant="overline" sx={{ color: "space.orange", fontFamily: "monospace" }}>{t("infrastructure.detailLabel")}</Typography><Typography component="h3" variant="h5" sx={{ mt: .4 }}>{active.title}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: .75, lineHeight: 1.7 }}>{active.description}</Typography></Box>
                <Stack spacing={0}>{active.facts.map((fact) => <Stack key={fact.label} direction={{ xs: "column", sm: "row" }} gap={.5} sx={{ py: .8, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: 0 } }}><Typography variant="overline" sx={{ color: "text.secondary", fontFamily: "monospace", minWidth: 100 }}>{fact.label}</Typography><Typography variant="body2">{fact.value}</Typography></Stack>)}</Stack>
            </Stack>
        </Box>
    </Box>;
}
