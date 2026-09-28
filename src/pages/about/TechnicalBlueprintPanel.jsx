import { useLayoutEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { getBrandIconDefinition } from "@/config/brandIcons.js";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";
import { getTechnicalBlueprint, TECH_BLUEPRINTS } from "./technicalBlueprints.config.js";
import { buildConnectorPaths } from "./technicalBlueprints.utils.js";

function getNodeCopy(t, blueprintId, nodeId) {
    return t(`blueprints.${blueprintId}.nodes.${nodeId}`, { returnObjects: true });
}

function NodeCard({ node, blueprintId, active, onSelect, setCardRef, t }) {
    const copy = getNodeCopy(t, blueprintId, node.id);
    const icon = getBrandIconDefinition(node.iconId);
    const Icon = icon.component;

    return (
        <ButtonBase
            component="button"
            ref={(element) => setCardRef(node.id, element)}
            onClick={() => onSelect(node.id)}
            onMouseEnter={() => onSelect(node.id)}
            onFocus={() => onSelect(node.id)}
            aria-pressed={active}
            sx={{ display: "block", width: "100%", minWidth: 0, p: { xs: 1, md: 1.25 }, textAlign: "left", border: "1px solid", borderColor: active ? "text.primary" : "divider", bgcolor: active ? "background.paper" : (theme) => theme.palette.mode === "dark" ? "rgba(29,45,58,.92)" : "rgba(247,243,234,.72)", color: "text.primary", position: "relative", transition: "transform 160ms ease, border-color 160ms ease, background-color 160ms ease", "&::before": { content: '""', position: "absolute", left: -1, top: -1, width: active ? 64 : 34, height: 3, bgcolor: active ? "space.orange" : "space.blue", transition: "width 160ms ease" }, "&:hover": { transform: "translateY(-2px)", borderColor: "text.primary" }, "&:focus-visible": { outline: "2px solid", outlineColor: "space.blue", outlineOffset: 2 } }}
        >
            <Stack direction="row" alignItems="center" gap={1}>
                <Box sx={{ width: 32, height: 32, display: "grid", placeItems: "center", border: "1px solid", borderColor: "divider", flexShrink: 0 }}>
                    <Icon size={20} color={icon.color} title={icon.title || copy.name} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <TechnicalLabel color={active ? "space.orange" : "space.blue"} sx={{ fontSize: ".56rem" }}>{copy.code}</TechnicalLabel>
                    <Typography sx={{ fontWeight: 850, fontSize: ".94rem", lineHeight: 1.15, mt: .25, overflowWrap: "anywhere" }}>{copy.name}</Typography>
                </Box>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: .8, fontSize: ".78rem", lineHeight: 1.45, overflowWrap: "anywhere", wordBreak: "break-word" }}>{copy.description}</Typography>
            <Box aria-hidden="true" sx={{ position: "absolute", top: "50%", width: 8, height: 8, borderRadius: "50%", bgcolor: active ? "space.orange" : "space.blue", boxShadow: active ? "0 0 0 4px rgba(223,115,61,.14)" : "0 0 0 4px rgba(52,124,178,.11)", transform: "translateY(-50%)", ...(node.side === "left" ? { right: -5 } : { left: -5 }) }} />
        </ButtonBase>
    );
}

export default function TechnicalBlueprintPanel({ t, showHeader = true }) {
    const theme = useTheme();
    const [activeBlueprintId, setActiveBlueprintId] = useState(TECH_BLUEPRINTS[0].id);
    const [activeNodeId, setActiveNodeId] = useState(TECH_BLUEPRINTS[0].nodes[0].id);
    const [paths, setPaths] = useState([]);
    const diagramRef = useRef(null);
    const cardRefs = useRef(new Map());
    const dotRefs = useRef(new Map());
    const blueprint = getTechnicalBlueprint(activeBlueprintId);

    const selectBlueprint = (id) => {
        const next = getTechnicalBlueprint(id);
        setActiveBlueprintId(next.id);
        setActiveNodeId(next.nodes[0].id);
    };

    useLayoutEffect(() => {
        const updatePaths = () => setPaths(buildConnectorPaths(diagramRef.current, cardRefs.current, dotRefs.current, blueprint));
        updatePaths();
        window.addEventListener("resize", updatePaths);
        return () => window.removeEventListener("resize", updatePaths);
    }, [blueprint]);

    return (
        <Stack spacing={2.25}>
            {showHeader ? <Box>
                <TechnicalLabel color="space.blue">{t("eyebrow")}</TechnicalLabel>
                <Typography component="h3" variant="h4" sx={{ mt: .7 }}>{t("title")}</Typography>
                <Typography color="text.secondary" sx={{ mt: .8 }}>{t("lead")}</Typography>
            </Box> : null}
            <Box component="nav" aria-label={t("tabsLabel")} sx={{ display: "flex", overflowX: "auto", gap: .75, p: .75, border: "1px solid", borderColor: "divider", bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(22,33,44,.82)" : "rgba(242,239,230,.55)" }}>
                {TECH_BLUEPRINTS.map((item, index) => <Button key={item.id} onClick={() => selectBlueprint(item.id)} aria-pressed={item.id === activeBlueprintId} variant={item.id === activeBlueprintId ? "contained" : "outlined"} sx={{ flex: "1 0 150px", minHeight: 46, justifyContent: "flex-start", gap: 1, fontSize: ".6rem" }}><span style={{ opacity: .7 }}>{`0${index + 1}`}</span>{t(`tabs.${item.id}`)}</Button>)}
            </Box>
            <Box sx={{ border: "1px solid", borderColor: "divider", bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(22,33,44,.68)" : "rgba(242,239,230,.45)", overflow: "hidden" }}>
                <Box ref={diagramRef} sx={{ position: "relative", display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(190px, .9fr) minmax(400px, 1.6fr) minmax(190px, .9fr)" }, gap: { xs: 1.25, md: 1.5 }, p: { xs: 1.25, sm: 2 }, minHeight: { md: 760 } }}>
                    <Stack spacing={1.25} sx={{ zIndex: 2, justifyContent: "space-around" }}>{blueprint.nodes.filter((node) => node.side === "left").map((node) => <NodeCard key={node.id} node={node} blueprintId={blueprint.id} active={node.id === activeNodeId} onSelect={setActiveNodeId} setCardRef={(id, element) => element ? cardRefs.current.set(id, element) : cardRefs.current.delete(id)} t={t} />)}</Stack>
                    <Box sx={{ position: "relative", minHeight: { xs: 620, md: 720 }, overflow: "hidden", order: { xs: -1, md: 0 } }}>
                        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
                            <Box component="img" src={blueprint.asset} alt={t(`blueprints.${blueprint.id}.alt`)} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
                            {blueprint.nodes.map((node) => <Box key={node.id} ref={(element) => element ? dotRefs.current.set(node.id, element) : dotRefs.current.delete(node.id)} aria-hidden="true" sx={{ position: "absolute", zIndex: 3, left: `${node.dotX}%`, top: `${node.dotY}%`, width: 10, height: 10, borderRadius: "50%", bgcolor: node.id === activeNodeId ? "space.yellow" : "#F7FAFB", border: "1px solid rgba(255,255,255,.7)", boxShadow: node.id === activeNodeId ? "0 0 0 4px rgba(242,198,101,.2), 0 0 16px rgba(242,198,101,.5)" : "0 0 0 4px rgba(255,255,255,.12)", transform: "translate(-50%, -50%)" }} />)}
                        </Box>
                    </Box>
                    <Stack spacing={1.25} sx={{ zIndex: 2, justifyContent: "space-around" }}>{blueprint.nodes.filter((node) => node.side === "right").map((node) => <NodeCard key={node.id} node={node} blueprintId={blueprint.id} active={node.id === activeNodeId} onSelect={setActiveNodeId} setCardRef={(id, element) => element ? cardRefs.current.set(id, element) : cardRefs.current.delete(id)} t={t} />)}</Stack>
                    <Box component="svg" aria-hidden="true" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, display: { xs: "none", md: "block" } }}>
                        {paths.map((path) => <path key={path.id} d={path.d} fill="none" stroke={path.id === activeNodeId ? theme.space.orange : alpha(theme.palette.text.primary, .38)} strokeWidth={path.id === activeNodeId ? 1.8 : 1.1} strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />)}
                    </Box>
                </Box>
            </Box>
        </Stack>
    );
}
