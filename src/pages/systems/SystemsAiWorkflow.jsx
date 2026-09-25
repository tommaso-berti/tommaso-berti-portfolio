import { useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MissionSurface from "@/features/mission-ui/MissionSurface.jsx";

const modeIds = ["ui", "research", "integration", "iteration"];

export default function SystemsAiWorkflow({ t }) {
    const [activeMode, setActiveMode] = useState("ui");
    const active = t(`ai.modes.${activeMode}`, { returnObjects: true });
    const modeNames = t("ai.modeNames", { returnObjects: true });

    return <MissionSurface>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="overline" sx={{ color: "space.orange", fontFamily: (theme) => theme.fonts.mono }}>{t("ai.intro.label")}</Typography>
                <Typography component="h3" variant="h5" sx={{ mt: .5 }}>{t("ai.intro.title")}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>{t("ai.intro.description")}</Typography>
                <Stack direction="row" gap={.75} sx={{ mt: 1.5 }}>
                    {t("ai.intro.tools", { returnObjects: true }).map((tool) => <Typography key={tool} variant="overline" sx={{ px: 1, py: .6, bgcolor: "text.primary", color: "background.paper", fontFamily: (theme) => theme.fonts.mono }}>{tool}</Typography>)}
                </Stack>
            </Box>
            <Box sx={{ p: { xs: 2, sm: 2.5 }, borderTop: { xs: "1px solid", md: 0 }, borderLeft: { md: "1px solid" }, borderColor: "divider", bgcolor: "background.default" }}>
                <Typography variant="overline" sx={{ color: "text.secondary", fontFamily: (theme) => theme.fonts.mono }}>{t("ai.constraint.label")}</Typography>
                <Typography component="h3" variant="h5" sx={{ mt: .5 }}>{t("ai.constraint.title")}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>{t("ai.constraint.description")}</Typography>
                <Typography variant="overline" sx={{ display: "block", mt: 1.5, pt: 1, borderTop: "1px solid", borderColor: "divider", color: "space.blue", fontFamily: (theme) => theme.fonts.mono }}>{t("ai.constraint.outcome")}</Typography>
            </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(220px, .7fr) minmax(0, 1.3fr)" }, borderTop: "1px solid", borderColor: "divider" }}>
            <Box role="group" aria-label={t("ai.modeLabel")} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr" }, alignContent: "start", borderRight: { md: "1px solid" }, borderColor: "divider" }}>
                {modeIds.map((mode, index) => <ButtonBase key={mode} type="button" aria-pressed={activeMode === mode} aria-controls="systems-ai-stage" onClick={() => setActiveMode(mode)} sx={{ minHeight: 58, px: 1.5, py: 1, display: "grid", gridTemplateColumns: "32px 1fr", gap: 1, textAlign: "left", borderBottom: "1px solid", borderRight: { xs: index % 2 === 0 ? "1px solid" : 0, md: 0 }, borderColor: "divider", bgcolor: activeMode === mode ? "text.primary" : "transparent", color: activeMode === mode ? "background.paper" : "text.primary", justifyContent: "stretch", "&:focus-visible": { outline: "2px solid", outlineColor: "space.blue", outlineOffset: -3 } }}>
                    <Typography variant="overline" sx={{ color: activeMode === mode ? "space.orange" : "text.secondary", fontFamily: (theme) => theme.fonts.mono }}>{`0${index + 1}`}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{modeNames[mode]}</Typography>
                </ButtonBase>)}
            </Box>
            <Stack id="systems-ai-stage" role="region" aria-live="polite" aria-label={active.title} spacing={1.5} sx={{ p: { xs: 2, sm: 2.5 }, minWidth: 0 }}>
                <Box>
                    <Typography variant="overline" sx={{ color: "space.orange", fontFamily: (theme) => theme.fonts.mono }}>{active.code}</Typography>
                    <Typography component="h3" variant="h5" sx={{ mt: .4 }}>{active.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: .75, lineHeight: 1.7 }}>{active.description}</Typography>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr auto 1.1fr auto 1fr" }, alignItems: "center", gap: 1 }}>
                    {[t("ai.flow.direction"), active.flow, t("ai.flow.review")].map((label, index) => <Box key={`${label}-${index}`} sx={{ display: "contents" }}>
                        {index > 0 ? <Typography aria-hidden="true" sx={{ textAlign: "center", color: "text.secondary", display: { xs: "none", sm: "block" } }}>→</Typography> : null}
                        <Box sx={{ p: 1.25, border: "1px solid", borderColor: index === 1 ? "space.blue" : "divider", boxShadow: index === 1 ? "inset 0 -3px 0" : "none", bgcolor: "background.default", textAlign: "center" }}>
                            <Typography variant="overline" sx={{ fontFamily: (theme) => theme.fonts.mono }}>{label}</Typography>
                        </Box>
                    </Box>)}
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, borderTop: "1px solid", borderColor: "divider", pt: 1.5, gap: 2 }}>
                    {["human", "ai"].map((side) => <Box key={side}>
                        <Typography variant="overline" sx={{ color: side === "human" ? "space.orange" : "space.blue", fontFamily: (theme) => theme.fonts.mono }}>{t(`ai.responsibilities.${side}.label`)}</Typography>
                        {(side === "human" ? t("ai.responsibilities.human.items", { returnObjects: true }) : active.support).map((item) => <Typography key={item} variant="body2" sx={{ py: .55, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: 0 } }}>{item}</Typography>)}
                    </Box>)}
                </Box>
            </Stack>
        </Box>
    </MissionSurface>;
}
