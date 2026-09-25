import { useEffect, useId, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";
import TechnicalLabel from "./TechnicalLabel.jsx";
import SpaceButton from "./SpaceButton.jsx";
import { createOrbitConfig, getOrbitPoint, projectPoint, smoothstep } from "./celestialMap.utils.js";

const VIEWBOX = { width: 920, height: 600, center: { x: 460, y: 300 } };
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function CelestialProjectMap({ items, labels, decorative = false }) {
    const reducedMotion = useReducedMotion();
    const orbitClipId = `dyson-orbit-front-${useId().replaceAll(":", "")}`;
    const stageRef = useRef(null);
    const cardRef = useRef(null);
    const bodyRefs = useRef(new Map());
    const orbitRefs = useRef(new Map());
    const backBodiesRef = useRef(null);
    const frontBodiesRef = useRef(null);
    const frontOrbitsRef = useRef(null);
    const animationRef = useRef();
    const selectedRef = useRef(null);
    const stateRef = useRef({ yaw: -8, pitch: 7, targetYaw: -8, targetPitch: 7, paused: reducedMotion, started: performance.now(), pausedAt: 0, visible: true });
    const [selectedId, setSelectedId] = useState(null);
    const [paused, setPaused] = useState(reducedMotion);
    const [expanded, setExpanded] = useState(false);
    const [nativeFullscreen, setNativeFullscreen] = useState(false);
    const [renderKey, setRenderKey] = useState(0);
    const configs = useMemo(() => items.map((item, index) => ({ ...item, orbit: createOrbitConfig(item, index) })), [items]);
    const selected = configs.find((item) => item.id === selectedId);
    const renderOrbitPaths = (layer) => configs.map((item) => <g key={item.id}>{Array.from({ length: 88 }, (_, index) => <path key={index} ref={(node) => { if (node) { const paths = orbitRefs.current.get(item.id) || []; paths[index] = { ...paths[index], [layer]: node }; orbitRefs.current.set(item.id, paths); } }} fill="none" strokeLinecap="butt" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />)}</g>);

    useEffect(() => { selectedRef.current = selectedId; }, [selectedId]);
    useEffect(() => {
        stateRef.current.paused = reducedMotion;
        setPaused(reducedMotion);
    }, [reducedMotion]);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return undefined;
        const observer = new IntersectionObserver(([entry]) => { stateRef.current.visible = entry.isIntersecting; }, { threshold: 0.05 });
        observer.observe(stage);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const frame = (now) => {
            const state = stateRef.current;
            state.yaw += (state.targetYaw - state.yaw) * 0.035;
            state.pitch += (state.targetPitch - state.pitch) * 0.035;
            const elapsed = state.paused ? state.pausedAt : now - state.started;
            configs.forEach((item) => {
                const active = item.id === selectedRef.current;
                    const paths = orbitRefs.current.get(item.id) || [];
                    paths.forEach((path, index) => {
                    const a1 = (index / paths.length) * Math.PI * 2;
                    const a2 = ((index + 1) / paths.length) * Math.PI * 2;
                    const first = projectPoint(getOrbitPoint(item.orbit, a1), state.yaw, state.pitch, VIEWBOX.center);
                    const second = projectPoint(getOrbitPoint(item.orbit, a2), state.yaw, state.pitch, VIEWBOX.center);
                    const depth = (first.z + second.z) / 2;
                    const frontness = smoothstep(-165, 165, depth);
                    const frontLayer = smoothstep(-8, 8, depth);
                    const gray = Math.round(145 - frontness * 48);
                    const d = `M ${first.x.toFixed(1)} ${first.y.toFixed(1)} L ${second.x.toFixed(1)} ${second.y.toFixed(1)}`;
                    const stroke = active ? item.orbit.accent : `rgb(${gray}, ${gray + 7}, ${gray + 10})`;
                    const opacity = (active ? 0.3 : 0.19) + frontness * (active ? 0.25 : 0.18);
                    const width = (active ? 1.25 : 1.05) + frontness * 0.45;
                    path.back.setAttribute("d", d);
                    path.front.setAttribute("d", d);
                    path.back.setAttribute("stroke", stroke);
                    path.front.setAttribute("stroke", stroke);
                    path.back.setAttribute("opacity", String(opacity * (1 - frontLayer)));
                    path.front.setAttribute("opacity", String(opacity * frontLayer));
                    path.back.setAttribute("stroke-width", String(width));
                    path.front.setAttribute("stroke-width", String(width));
                });
                const point = projectPoint(getOrbitPoint(item.orbit, item.orbit.phase + elapsed * item.orbit.speed), state.yaw, state.pitch, VIEWBOX.center);
                const body = bodyRefs.current.get(item.id);
                if (body) {
                    body.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)}) scale(${clamp(point.scale, 0.72, 1.25).toFixed(3)})`);
                    (point.z >= 0 ? frontBodiesRef.current : backBodiesRef.current)?.appendChild(body);
                }
                if (active && cardRef.current) {
                    const card = cardRef.current;
                    const stageWidth = stageRef.current?.clientWidth || VIEWBOX.width;
                    const cardWidth = card.offsetWidth || 270;
                    const cardPercent = (cardWidth / stageWidth) * 100;
                    const pointPercent = (point.x / VIEWBOX.width) * 100;
                    const left = point.x > VIEWBOX.center.x
                        ? clamp(pointPercent - cardPercent - 4, 3, 100 - cardPercent - 3)
                        : clamp(pointPercent + 4, 3, 100 - cardPercent - 3);
                    const top = clamp((point.y / VIEWBOX.height) * 100 - 12, 15, 62);
                    card.style.right = "auto";
                    card.style.left = `${left}%`;
                    card.style.top = `${top}%`;
                    card.style.transform = `scale(${clamp(point.scale, 0.86, 1.04).toFixed(3)})`;
                    card.style.opacity = point.z < -190 ? "0.72" : "1";
                }
            });
            if ((!state.paused && state.visible) || Math.abs(state.targetYaw - state.yaw) > 0.05 || Math.abs(state.targetPitch - state.pitch) > 0.05) animationRef.current = requestAnimationFrame(frame);
        };
        animationRef.current = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(animationRef.current);
    }, [configs, selectedId, paused, renderKey]);

    useEffect(() => {
        const syncFullscreen = () => setNativeFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener("fullscreenchange", syncFullscreen);
        return () => document.removeEventListener("fullscreenchange", syncFullscreen);
    }, []);

    const select = (id) => {
        const nextId = selectedRef.current === id ? null : id;
        selectedRef.current = nextId;
        setSelectedId(nextId);
    };
    const togglePause = () => {
        const state = stateRef.current;
        if (state.paused) { state.started = performance.now() - state.pausedAt; state.paused = false; setPaused(false); }
        else { state.pausedAt = performance.now() - state.started; state.paused = true; setPaused(true); }
    };
    const fullscreen = async () => {
        const stage = stageRef.current;
        if (document.fullscreenElement || expanded) { await document.exitFullscreen?.(); setExpanded(false); return; }
        if (!stage?.requestFullscreen) { setExpanded((value) => !value); return; }
        try { await stage.requestFullscreen(); } catch { setExpanded((value) => !value); }
    };
    const moveViewpoint = (event) => {
        if (event.pointerType === "touch") return;
        const bounds = stageRef.current?.getBoundingClientRect();
        if (!bounds) return;
        stateRef.current.targetYaw = -8 + (((event.clientX - bounds.left) / bounds.width) - .5) * 26;
        stateRef.current.targetPitch = 7 - (((event.clientY - bounds.top) / bounds.height) - .5) * 16;
        if (stateRef.current.paused) setRenderKey((value) => value + 1);
    };
    const resetViewpoint = () => { Object.assign(stateRef.current, { targetYaw: -8, targetPitch: 7 }); if (stateRef.current.paused) setRenderKey((value) => value + 1); };

    return <Paper component="section" variant="outlined" ref={stageRef} onPointerMove={decorative ? undefined : moveViewpoint} onPointerLeave={decorative ? undefined : resetViewpoint} sx={{ position: "relative", overflow: "hidden", minHeight: decorative ? { xs: 315, md: 360 } : { xs: 520, md: 560 }, bgcolor: "space.secondaryPaper", ...(expanded && { position: "fixed", inset: 12, zIndex: 1300, minHeight: "auto" }), "&:fullscreen": { width: "100%", height: "100%", borderRadius: 0 } }}>
        {!decorative && <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, opacity: .32, backgroundImage: "linear-gradient(rgba(23,32,42,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(23,32,42,.03) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />}
        {!decorative && <Box sx={{ position: "absolute", zIndex: 5, top: 14, left: 16, right: { xs: 16, md: 220 } }}><TechnicalLabel>{labels.title}</TechnicalLabel></Box>}
        {!decorative && <Stack direction="row" gap={.35} flexWrap="wrap" sx={{ position: "absolute", zIndex: 5, top: 10, right: 12, maxWidth: { xs: "calc(100% - 24px)", sm: "none" }, p: .35, border: "1px solid", borderTop: "3px solid", borderColor: "divider", borderTopColor: selected?.orbit.accent || "space.blue", bgcolor: "rgba(241,237,227,.82)" }}><SpaceButton size="small" variant="outlined" barColor={selected?.orbit.accent || "space.blue"} onClick={togglePause} sx={{ minHeight: 28, px: .8, fontSize: ".58rem" }}>{paused ? labels.play : labels.pause}</SpaceButton><SpaceButton size="small" variant="outlined" barColor={selected?.orbit.accent || "space.blue"} onClick={fullscreen} sx={{ minHeight: 28, px: .8, fontSize: ".58rem" }}>{nativeFullscreen || expanded ? labels.exit : labels.fullscreen}</SpaceButton></Stack>}
        <svg viewBox="0 0 920 600" role="img" aria-label={labels.title} style={{ width: "100%", height: "100%", minHeight: "inherit", display: "block" }}>
            <g transform={`translate(${VIEWBOX.center.x} ${VIEWBOX.center.y}) scale(${decorative ? 1 : 1.22}) translate(${-VIEWBOX.center.x} ${-VIEWBOX.center.y})`}>
            <g>{renderOrbitPaths("back")}</g>
            <g ref={backBodiesRef}/>
            <g transform={`translate(${VIEWBOX.center.x} ${VIEWBOX.center.y})`}><circle r="47" fill="none" stroke="rgba(114,94,54,.46)" strokeWidth="1.15" strokeDasharray="4 7"/><circle r="38" fill="none" stroke="rgba(114,94,54,.55)" strokeWidth="1.15" strokeDasharray="10 8"/><ellipse rx="44" ry="16" fill="none" stroke="rgba(114,94,54,.68)" strokeWidth="1.2" strokeDasharray="13 7" transform="rotate(24)"/><ellipse rx="43" ry="15" fill="none" stroke="rgba(114,94,54,.58)" strokeWidth="1.2" strokeDasharray="8 9" transform="rotate(82)"/>{decorative ? <image href="/tb-logo-1024.png" x="-56" y="-56" width="112" height="112" preserveAspectRatio="xMidYMid slice" /> : <><image href="/assets/celestial-project-map/sun.png" x="-34" y="-34" width="68" height="68" preserveAspectRatio="xMidYMid meet"/><text y="67" textAnchor="middle" fontSize="8" fontWeight="800" letterSpacing="2" fill="#2b3a49">TB // DYSON CORE</text><text y="80" textAnchor="middle" fontSize="6.5" letterSpacing="1.8" fill="#858a88">DEVELOPER SYSTEM</text></>}</g>
            <defs><clipPath id={orbitClipId} clipPathUnits="userSpaceOnUse"><rect x="-55" y="0" width="110" height="55" /></clipPath></defs>
            <g transform={`translate(${VIEWBOX.center.x} ${VIEWBOX.center.y})`} clipPath={`url(#${orbitClipId})`}><circle r="47" fill="none" stroke="rgba(114,94,54,.46)" strokeWidth="1.15" strokeDasharray="4 7"/><circle r="38" fill="none" stroke="rgba(114,94,54,.55)" strokeWidth="1.15" strokeDasharray="10 8"/><ellipse rx="44" ry="16" fill="none" stroke="rgba(114,94,54,.68)" strokeWidth="1.2" strokeDasharray="13 7" transform="rotate(24)"/><ellipse rx="43" ry="15" fill="none" stroke="rgba(114,94,54,.58)" strokeWidth="1.2" strokeDasharray="8 9" transform="rotate(82)"/></g>
            <g ref={frontOrbitsRef}>{renderOrbitPaths("front")}</g>
            <g ref={frontBodiesRef}>{configs.map((item) => {
                const bodySize = (item.orbit.size + 5) * 2;
                return <g key={item.id} ref={(node) => { if (node) bodyRefs.current.set(item.id, node); }} {...(!decorative && { role: "button", tabIndex: "0", "aria-label": item.name, "aria-pressed": item.id === selectedId, onClick: () => select(item.id), onKeyDown: (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(item.id); } } })} style={{ cursor: decorative ? "default" : "pointer", transformOrigin: "0 0" }}><circle r={bodySize / 2 + 2} fill="none" stroke={item.orbit.accent} strokeWidth="1.1" opacity={item.id === selectedId ? .75 : 0}/><image href={item.orbit.bodyImage} x={-bodySize / 2} y={-bodySize / 2} width={bodySize} height={bodySize} preserveAspectRatio="xMidYMid meet"/><circle r={bodySize / 2 + 3} fill="transparent" pointerEvents="all" /></g>;
            })}</g>
            </g>
        </svg>
        {!decorative && selected ? <Paper ref={cardRef} component="aside" elevation={0} sx={{ position: "absolute", zIndex: 6, width: { xs: "min(250px, 58vw)", md: 270 }, p: 1.1, borderLeft: "3px solid", borderColor: selected.orbit.accent, bgcolor: "background.paper", pointerEvents: "auto", transformOrigin: "top left", transition: "opacity 160ms ease" }}><TechnicalLabel sx={{ fontSize: ".52rem" }}>{labels.selected}</TechnicalLabel><Typography variant="h6" sx={{ mt: .25 }}>{selected.name}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: .35, fontSize: ".78rem", lineHeight: 1.45 }}>{selected.description}</Typography><Stack direction="row" gap={.55} justifyContent="space-between" flexWrap="nowrap" sx={{ mt: .9 }}><SpaceButton component={RouterLink} to={selected.detailPath} size="small" variant="contained" barColor={selected.orbit.accent}>{labels.details}</SpaceButton><SpaceButton component="a" href={selected.liveHref} target="_blank" rel="noreferrer" size="small" variant="outlined" barColor={selected.orbit.accent}>{labels.live}</SpaceButton>{selected.githubHref ? <SpaceButton component="a" href={selected.githubHref} target="_blank" rel="noreferrer" size="small" variant="outlined" barColor={selected.orbit.accent} aria-label="GitHub" title="GitHub" sx={{ minWidth: 36, px: .75 }}><GitHubIcon fontSize="small" /></SpaceButton> : null}</Stack></Paper> : null}
        {!decorative && <Stack direction="row" gap={.5} flexWrap="wrap" sx={{ position: "absolute", zIndex: 5, left: 16, right: 16, bottom: 14 }}>{configs.map((item) => {
            const accent = selected?.orbit.accent || item.orbit.accent;
            const isSelected = item.id === selectedId;
            return <SpaceButton key={item.id} size="small" variant={isSelected ? "contained" : "outlined"} barColor={accent} onClick={() => select(item.id)} aria-pressed={isSelected} sx={{ borderColor: isSelected ? item.orbit.accent : undefined, "&:hover": { borderColor: accent } }}>{item.name}</SpaceButton>;
        })}</Stack>}
    </Paper>;
}
