import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";

export default function BootSequence({ lines }) {
    const { t } = useTranslation("common");
    const reducedMotion = useReducedMotion();
    return <Stack aria-label={t("a11y.systemStatus")} spacing={.35} sx={{ fontFamily: (theme) => theme.fonts.mono, fontSize: ".68rem", color: "text.secondary" }}>
        {lines.map((line, index) => <Typography key={line} variant="caption" sx={{ fontFamily: "inherit", opacity: reducedMotion ? 1 : .25, transform: reducedMotion ? "none" : "translateY(4px)", animation: reducedMotion ? "none" : `bootLine .45s ease ${index * 220}ms forwards` }}>{line}</Typography>)}
    </Stack>;
}
