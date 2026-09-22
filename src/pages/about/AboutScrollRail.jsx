import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const STEP_FRACTIONS = [0, .34, .68, 1];

export default function AboutScrollRail({ t }) {
    const [progress, setProgress] = useState(0);
    const steps = [
        t("personnel.rail.steps.archive"),
        t("personnel.rail.steps.identity"),
        t("personnel.rail.steps.systems"),
        t("personnel.rail.steps.closing"),
    ];

    useEffect(() => {
        let frame = 0;
        const updateProgress = () => {
            frame = 0;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0);
        };
        const handleScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(updateProgress);
        };
        updateProgress();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    const activeStep = Math.min(steps.length - 1, Math.round(progress * (steps.length - 1)));
    const scrollToStep = (fraction) => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: maxScroll * fraction, behavior: reducedMotion ? "auto" : "smooth" });
    };

    return (
        <Box component="aside" aria-label={t("personnel.rail.label")} sx={{ display: { xs: "none", lg: "flex" }, position: "sticky", top: "9rem", alignSelf: "flex-start", minHeight: "calc(100vh - 12rem)", justifyContent: "center", width: 32 }}>
            <Stack alignItems="center" spacing={2} sx={{ position: "relative", height: "min(620px, calc(100vh - 14rem))", py: 1 }}>
                <Typography sx={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "text.secondary", fontFamily: "monospace", fontSize: ".48rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {t("personnel.archiveHeader")}
                </Typography>
                <Box sx={{ position: "relative", flex: 1, width: 16, minHeight: 240 }}>
                    <Box aria-hidden="true" sx={{ position: "absolute", top: 8, bottom: 8, left: "50%", width: 1, bgcolor: "divider", transform: "translateX(-50%)" }} />
                    <Box aria-hidden="true" sx={{ position: "absolute", top: 8, left: "50%", width: 1, height: "calc(100% - 16px)", bgcolor: "space.orange", transform: "translateX(-50%) scaleY(var(--scroll-progress))", transformOrigin: "top", "--scroll-progress": progress }} />
                    {steps.map((label, index) => (
                        <ButtonBase
                            key={label}
                            component="button"
                            type="button"
                            aria-label={label}
                            aria-current={index === activeStep ? "step" : undefined}
                            onClick={() => scrollToStep(STEP_FRACTIONS[index])}
                            sx={{ position: "absolute", top: `${STEP_FRACTIONS[index] * 100}%`, left: "50%", width: 18, height: 18, borderRadius: "50%", transform: "translate(-50%, -50%)", "&:focus-visible": { outline: "2px solid", outlineColor: "space.blue", outlineOffset: 3 } }}
                        >
                            <Box aria-hidden="true" sx={{ width: index === activeStep ? 9 : 7, height: index === activeStep ? 9 : 7, border: "1px solid", borderColor: index === activeStep ? "space.orange" : "text.primary", borderRadius: "50%", bgcolor: index <= activeStep ? "space.orange" : "background.paper", transition: "background-color 180ms ease, border-color 180ms ease, width 180ms ease, height 180ms ease" }} />
                        </ButtonBase>
                    ))}
                </Box>
            </Stack>
        </Box>
    );
}
