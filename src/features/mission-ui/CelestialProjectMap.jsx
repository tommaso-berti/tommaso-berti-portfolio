import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import TechnicalLabel from "./TechnicalLabel.jsx";
import { createOrbitConfig, getOrbitPoint, projectPoint, smoothstep } from "./celestialMap.utils.js";

const VIEWBOX = { width: 920, height: 600, center: { x: 460, y: 300 } };
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function CelestialProjectMap({ items, labels }) {
    const reducedMotion = useReducedMotion();
    const stageRef = useRef(null);
    const cardRef = useRef(null);
    const bodyRefs = useRef(new Map());
    const orbitRefs = useRef(new Map());
    const backBodiesRef = useRef(null);
    const frontBodiesRef = useRef(null);
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
                    const frontness = smoothstep(-165, 165, (first.z + second.z) / 2);
                    const gray = Math.round(145 - frontness * 48);
                    path.setAttribute("d", `M ${first.x.toFixed(1)} ${first.y.toFixed(1)} L ${second.x.toFixed(1)} ${second.y.toFixed(1)}`);
                    path.setAttribute("stroke", active ? item.orbit.accent : `rgb(${gray}, ${gray + 7}, ${gray + 10})`);
                    path.setAttribute("opacity", String((active ? 0.26 : 0.16) + frontness * (active ? 0.25 : 0.18)));
                    path.setAttribute("stroke-width", String((active ? 0.9 : 0.7) + frontness * 0.38));
                });
                const point = projectPoint(getOrbitPoint(item.orbit, item.orbit.phase + elapsed * item.orbit.speed), state.yaw, state.pitch, VIEWBOX.center);
                const body = bodyRefs.current.get(item.id);
                if (body) {
                    body.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)}) scale(${clamp(point.scale, 0.72, 1.25).toFixed(3)})`);
                    (point.z >= 0 ? frontBodiesRef.current : backBodiesRef.current)?.appendChild(body);
                }
                if (active && cardRef.current) {
                    const card = cardRef.current;
                    const left = clamp((point.x / VIEWBOX.width) * 100 + (point.x > VIEWBOX.center.x ? -27 : 4), 3, 67);
                    const top = clamp((point.y / VIEWBOX.height) * 100 - 12, 15, 62);
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
    const reset = () => { Object.assign(stateRef.current, { targetYaw: -8, targetPitch: 7 }); selectedRef.current = null; setSelectedId(null); setRenderKey((value) => value + 1); };
    const fullscreen = async () => {
        const stage = stageRef.current;
        if (document.fullscreenElement) { await document.exitFullscreen?.(); setExpanded(false); return; }
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

    return <Paper component="section" variant="outlined" ref={stageRef} onPointerMove={moveViewpoint} onPointerLeave={resetViewpoint} sx={{ position: "relative", overflow: "hidden", minHeight: { xs: 520, md: 560 }, bgcolor: "space.secondaryPaper", ...(expanded && { position: "fixed", inset: 12, zIndex: 1300, minHeight: "auto" }), "&:fullscreen": { width: "100%", height: "100%", borderRadius: 0 } }}>
        <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, opacity: .32, backgroundImage: "linear-gradient(rgba(23,32,42,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(23,32,42,.03) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={1} sx={{ position: "absolute", zIndex: 5, top: 14, left: 16, right: 16 }}><Box><TechnicalLabel>{labels.title}</TechnicalLabel><Typography variant="caption" color="text.secondary">{labels.hint}</Typography></Box><Stack direction="row" gap={.6} flexWrap="wrap"><Button size="small" onClick={togglePause}>{paused ? labels.play : labels.pause}</Button><Button size="small" onClick={fullscreen}>{nativeFullscreen || expanded ? labels.exit : labels.fullscreen}</Button><Button size="small" onClick={reset}>{labels.reset}</Button></Stack></Stack>
        <svg viewBox="0 0 920 600" role="img" aria-label={labels.title} style={{ width: "100%", height: "100%", minHeight: "inherit", display: "block" }}>
            <defs><radialGradient id="celestial-core" cx="34%" cy="28%" r="76%"><stop offset="0%" stopColor="#fffdf4"/><stop offset="30%" stopColor="#f4dfaa"/><stop offset="70%" stopColor="#d9aa50"/><stop offset="100%" stopColor="#9a6d2d"/></radialGradient><filter id="celestial-shadow"><feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity=".2"/></filter></defs>
            <g>{configs.map((item) => <g key={item.id}>{Array.from({ length: 88 }, (_, index) => <path key={index} ref={(node) => { if (node) { const paths = orbitRefs.current.get(item.id) || []; paths[index] = node; orbitRefs.current.set(item.id, paths); } }} fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />)}</g>)}</g>
            <g ref={backBodiesRef}/>
            <g transform={`translate(${VIEWBOX.center.x} ${VIEWBOX.center.y})`}><circle r="72" fill="rgba(216,170,76,.08)"/><circle r="47" fill="none" stroke="rgba(114,94,54,.19)" strokeDasharray="4 7"/><circle r="38" fill="none" stroke="rgba(114,94,54,.28)" strokeDasharray="10 8"/><ellipse rx="44" ry="16" fill="none" stroke="rgba(114,94,54,.35)" strokeDasharray="13 7" transform="rotate(24)"/><ellipse rx="43" ry="15" fill="none" stroke="rgba(114,94,54,.26)" strokeDasharray="8 9" transform="rotate(82)"/><ellipse rx="15" ry="43" fill="none" stroke="rgba(89,94,94,.22)" strokeDasharray="7 9"/><circle r="26" fill="url(#celestial-core)" stroke="#9a7837" filter="url(#celestial-shadow)"/><circle cx="-8" cy="-9" r="6" fill="rgba(255,255,255,.38)"/><path d="M-19 -2 Q0 10 19 -2" fill="none" stroke="rgba(255,255,255,.38)"/><text y="67" textAnchor="middle" fontSize="8" fontWeight="800" letterSpacing="2" fill="#2b3a49">TB // DYSON CORE</text><text y="80" textAnchor="middle" fontSize="6.5" letterSpacing="1.8" fill="#858a88">DEVELOPER SYSTEM</text></g>
            <g ref={frontBodiesRef}>{configs.map((item) => <g key={item.id} ref={(node) => { if (node) bodyRefs.current.set(item.id, node); }} role="button" tabIndex="0" aria-label={item.name} aria-pressed={item.id === selectedId} onClick={() => select(item.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(item.id); } }} style={{ cursor: "pointer", transformOrigin: "0 0" }}><circle r={item.orbit.size + 8} fill="none" stroke={item.orbit.accent} strokeWidth="1.1" opacity={item.id === selectedId ? .75 : 0}/><circle r={item.orbit.size} fill={item.orbit.accent} filter="url(#celestial-shadow)"/><circle cx={-item.orbit.size * .24} cy={-item.orbit.size * .26} r={item.orbit.size * .22} fill="rgba(255,255,255,.32)"/></g>)}</g>
        </svg>
        {selected ? <Paper ref={cardRef} component="aside" elevation={0} sx={{ position: "absolute", zIndex: 6, width: { xs: "min(250px, 58vw)", md: 270 }, p: 1.1, borderLeft: "3px solid", borderColor: selected.orbit.accent, bgcolor: "background.paper", pointerEvents: "auto", transformOrigin: "top left", transition: "opacity 160ms ease" }}><TechnicalLabel sx={{ fontSize: ".52rem" }}>{labels.selected}</TechnicalLabel><Typography variant="h6" sx={{ mt: .25 }}>{selected.name}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: .35, fontSize: ".78rem", lineHeight: 1.45 }}>{selected.description}</Typography><Stack direction="row" gap={.55} flexWrap="wrap" sx={{ mt: .9 }}><Button component={RouterLink} to={selected.detailPath} size="small" variant="contained">{labels.details}</Button><Button component="a" href={selected.liveHref} target="_blank" rel="noreferrer" size="small" variant="outlined">{labels.live}</Button>{selected.githubHref ? <Button component="a" href={selected.githubHref} target="_blank" rel="noreferrer" size="small" variant="outlined">GitHub</Button> : null}</Stack></Paper> : null}
        <Stack direction="row" gap={.5} flexWrap="wrap" sx={{ position: "absolute", zIndex: 5, left: 16, right: 16, bottom: 14 }}>{configs.map((item) => <Button key={item.id} size="small" variant={item.id === selectedId ? "contained" : "outlined"} onClick={() => select(item.id)} aria-pressed={item.id === selectedId}>{item.name}</Button>)}</Stack>
    </Paper>;
}
