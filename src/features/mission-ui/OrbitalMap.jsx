import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TechnicalLabel from "./TechnicalLabel.jsx";
import ColorRail from "./ColorRail.jsx";
import StatusIndicator from "./StatusIndicator.jsx";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";

export default function OrbitalMap({ title, status, labels = [] }) {
    const reducedMotion = useReducedMotion();
    return <Paper component="section" variant="outlined" sx={{ overflow: "hidden", bgcolor: (theme) => theme.space.secondaryPaper }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 1.5, py: 1, borderBottom: "1px solid", borderColor: "divider" }}><TechnicalLabel>{title}</TechnicalLabel><StatusIndicator>{status}</StatusIndicator></Stack>
        <Box sx={{ position: "relative", minHeight: { xs: 280, md: 340 }, display: "grid", placeItems: "center", overflow: "hidden" }}>
            <svg viewBox="0 0 400 400" role="img" aria-label={title} style={{ width: "88%", maxWidth: 380 }}>
                <g stroke="currentColor" opacity=".45" fill="none"><circle cx="200" cy="200" r="154"/><circle cx="200" cy="200" r="110"/><circle cx="200" cy="200" r="70"/><path d="M45 200h310M200 45v310"/></g>
                <g style={{ transformOrigin: "200px 200px", animation: reducedMotion ? "none" : "orbitalSpin 15s linear infinite" }}><ellipse cx="200" cy="200" rx="150" ry="60" transform="rotate(-14 200 200)" fill="none" stroke="var(--orbit-blue, #347CB2)" strokeWidth="2"/><circle cx="330" cy="165" r="4" fill="#347CB2" /></g>
                <g style={{ transformOrigin: "200px 200px", animation: reducedMotion ? "none" : "orbitalSpinBack 21s linear infinite" }}><path d="M83 298 A154 154 0 0 0 138 339" fill="none" stroke="#DF733D" strokeWidth="4" strokeLinecap="round"/></g>
            </svg>
            <Box aria-hidden="true" sx={{ position: "absolute", width: { xs: 84, md: 105 }, height: { xs: 84, md: 105 }, borderRadius: "50%", background: "radial-gradient(circle at 34% 28%,#fbf3d9 0 5%,#b4b5ae 23%,#75848b 54%,#44545d 82%)", boxShadow: "inset -20px -12px 28px rgba(0,0,0,.3)" }} />
            {labels.map((label, index) => <TechnicalLabel key={label} sx={{ position: "absolute", fontSize: ".53rem", ...(index === 0 ? { top: 15, left: 16 } : index === 1 ? { top: 15, right: 16 } : index === 2 ? { bottom: 15, right: 16 } : { bottom: 15, left: 16 }) }}>{label}</TechnicalLabel>)}
        </Box><ColorRail />
    </Paper>;
}
