import { createTheme } from "@mui/material/styles";

const motion = { fast: "160ms", normal: "260ms", slow: "380ms", easing: "cubic-bezier(.2,.75,.2,1)" };
const palettes = {
    light: {
        mode: "light", primary: { main: "#17202A", contrastText: "#F7F3EA" }, secondary: { main: "#347CB2" }, success: { main: "#668A69" },
        background: { default: "#F3F0E7", paper: "#F7F3EA" }, text: { primary: "#17202A", secondary: "#555A5B" }, divider: "#C5C0B5",
        action: { hover: "rgba(52,124,178,.09)", selected: "rgba(52,124,178,.15)" },
        space: { blue: "#347CB2", orange: "#DF733D", yellow: "#D0AB3D", red: "#C94F4A", green: "#668A69", panel: "#F1EDE3", secondaryPaper: "#ECE8DC", border: "#C5C0B5" },
    },
    dark: {
        mode: "dark", primary: { main: "#ECE8DC", contrastText: "#121B25" }, secondary: { main: "#6FA9D1" }, success: { main: "#83A987" },
        background: { default: "#121B25", paper: "#192632" }, text: { primary: "#F2EDE2", secondary: "#BEC6C6" }, divider: "#40505A",
        action: { hover: "rgba(111,169,209,.14)", selected: "rgba(111,169,209,.22)" },
        space: { blue: "#6FA9D1", orange: "#E69362", yellow: "#D8B957", red: "#D56F69", green: "#83A987", panel: "#1D2D3A", secondaryPaper: "#16212C", border: "#40505A" },
    },
};
const fontStack = '"Roboto", "Avenir", "Helvetica", "Arial", sans-serif';
const monoStack = '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export const makeTheme = (mode) => {
    const palette = palettes[mode === "dark" ? "dark" : "light"];
    const isDark = palette.mode === "dark";
    return createTheme({
        palette, space: palette.space, motion, shape: { borderRadius: 4 },
        typography: {
            fontFamily: fontStack,
            h1: { fontWeight: 900, letterSpacing: "-.052em", lineHeight: .92 },
            h2: { fontWeight: 850, fontSize: "clamp(2.25rem, 5vw, 4.6rem)", letterSpacing: "-.045em", lineHeight: .96 },
            h3: { fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.7rem)", letterSpacing: "-.035em", lineHeight: 1 },
            h4: { fontWeight: 750, letterSpacing: "-.02em" }, h5: { fontWeight: 700 }, body1: { lineHeight: 1.7 },
            overline: { fontFamily: monoStack, fontWeight: 800, fontSize: ".68rem", letterSpacing: ".13em", lineHeight: 1.4 },
        },
        components: {
            MuiCssBaseline: { styleOverrides: {
                html: { minHeight: "100%", fontSize: "112.5%", backgroundColor: palette.background.default }, body: { minHeight: "100%", backgroundColor: palette.background.default }, "#root": { minHeight: "100%" }, "::selection": { backgroundColor: `${palette.space.blue}55` },
                "@keyframes orbitalSpin": { to: { transform: "rotate(360deg)" } }, "@keyframes orbitalSpinBack": { to: { transform: "rotate(-360deg)" } }, "@keyframes statusPulse": { "0%,100%": { opacity: .45 }, "50%": { opacity: 1 } }, "@keyframes panelEnter": { from: { opacity: .35, transform: "translateY(5px)" }, to: { opacity: 1, transform: "translateY(0)" } }, "@keyframes bootLine": { to: { opacity: 1, transform: "translateY(0)" } }, "@keyframes missionRail": { to: { transform: "scaleX(1)" } },
                "@media (prefers-reduced-motion: reduce)": { "*, *::before, *::after": { animationDuration: "0.01ms !important", animationIterationCount: "1 !important", transitionDuration: "0.01ms !important", scrollBehavior: "auto !important" } },
            } },
            MuiContainer: { styleOverrides: { root: { paddingLeft: "clamp(1rem, 2.2vw, 2.5rem)", paddingRight: "clamp(1rem, 2.2vw, 2.5rem)" } } },
            MuiPaper: { styleOverrides: { root: { border: "1px solid", borderColor: palette.divider, borderRadius: "4px !important", boxShadow: "none", backgroundColor: palette.background.paper, backgroundImage: "none" } } },
            MuiCard: { styleOverrides: { root: { border: "1px solid", borderColor: palette.divider, borderRadius: "4px !important", boxShadow: "none", backgroundColor: palette.space.panel, transition: `transform ${motion.normal} ${motion.easing}, border-color ${motion.normal} ease` } } },
            MuiButton: { styleOverrides: { root: { borderRadius: 2, minHeight: 42, fontFamily: monoStack, fontSize: ".7rem", fontWeight: 800, letterSpacing: ".1em", cursor: "pointer", transition: `transform ${motion.fast} ease, background-color ${motion.normal} ease, border-color ${motion.normal} ease`, "&:active": { transform: "translateY(1px) scale(.98)" }, "&.Mui-disabled": { cursor: "default" } } } },
            MuiButtonBase: { styleOverrides: { root: { cursor: "pointer", "&.Mui-focusVisible": { outline: `2px solid ${palette.space.blue}`, outlineOffset: 3 }, "&.Mui-disabled": { cursor: "default" } } } },
            MuiChip: { styleOverrides: { root: { borderRadius: 1, fontFamily: monoStack, fontSize: ".66rem", fontWeight: 700, letterSpacing: ".04em" } } },
            MuiTooltip: { styleOverrides: { tooltip: { maxWidth: 280, padding: "10px 12px", border: "1px solid", borderTop: `3px solid ${palette.space.blue}`, borderColor: palette.divider, borderRadius: "0 0 6px 6px", backgroundColor: palette.background.paper, color: palette.text.primary, boxShadow: "0 10px 22px rgba(23,32,42,.13)", fontSize: ".75rem", lineHeight: 1.45 }, arrow: { color: palette.background.paper, "&::before": { border: "1px solid", borderColor: palette.divider } } } },
            MuiTextField: { styleOverrides: { root: { "& .MuiOutlinedInput-root": { borderRadius: 1, backgroundColor: isDark ? "#14202A" : "#FBF7EE" } } } },
        },
    });
};

export default makeTheme;
