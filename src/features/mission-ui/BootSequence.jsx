import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";

export default function BootSequence({ lines }) {
    const reducedMotion = useReducedMotion();
    return <Stack aria-label="System status" spacing={.35} sx={{ fontFamily: "monospace", fontSize: ".68rem", color: "text.secondary" }}>
        {lines.map((line, index) => <Typography key={line} variant="caption" sx={{ fontFamily: "inherit", opacity: reducedMotion ? 1 : .25, transform: reducedMotion ? "none" : "translateY(4px)", animation: reducedMotion ? "none" : `bootLine .45s ease ${index * 220}ms forwards` }}>{line}</Typography>)}
    </Stack>;
}
