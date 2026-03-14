import { createTheme } from '@mui/material/styles';

const lightPalette = {
    mode: "light",
    primary: { main: "#0f172a" },
    secondary: { main: "#2f7a62" },
    background: {
        default: "#f2f5f3",
        paper: "#f8fbf9",
    },
    text: {
        primary: "#12201c",
        secondary: "#4f655d",
    },
    divider: "rgba(47, 122, 98, 0.2)",
    action: {
        hover: "rgba(47, 122, 98, 0.1)",
        selected: "rgba(47, 122, 98, 0.15)",
        focus: "rgba(47, 122, 98, 0.24)",
    },
};

const darkPalette = {
    mode: "dark",
    primary: { main: "#e7f4ef" },
    secondary: { main: "#7dc4ac" },
    background: {
        default: "#0f1714",
        paper: "#14201c",
    },
    text: {
        primary: "#e4f1ec",
        secondary: "#a9c5bb",
    },
    divider: "rgba(125, 196, 172, 0.28)",
    action: {
        hover: "rgba(125, 196, 172, 0.17)",
        selected: "rgba(125, 196, 172, 0.24)",
        focus: "rgba(125, 196, 172, 0.3)",
    },
};

const fontStack = '"Roboto", "Avenir", "Helvetica", "Arial", sans-serif';

const customShadows = [
    "none",
    "0 1px 2px rgba(15, 23, 42, 0.06)",
    "0 2px 8px rgba(15, 23, 42, 0.08)",
    "0 6px 18px rgba(15, 23, 42, 0.1)",
    "0 10px 24px rgba(15, 23, 42, 0.12)",
    "0 12px 30px rgba(15, 23, 42, 0.14)",
    "0 16px 38px rgba(15, 23, 42, 0.16)",
    "0 18px 42px rgba(15, 23, 42, 0.18)",
    "0 22px 46px rgba(15, 23, 42, 0.2)",
    "0 24px 52px rgba(15, 23, 42, 0.22)",
    "0 26px 56px rgba(15, 23, 42, 0.24)",
    "0 30px 60px rgba(15, 23, 42, 0.26)",
    "0 32px 64px rgba(15, 23, 42, 0.28)",
    "0 34px 68px rgba(15, 23, 42, 0.3)",
    "0 36px 72px rgba(15, 23, 42, 0.32)",
    "0 38px 76px rgba(15, 23, 42, 0.34)",
    "0 40px 80px rgba(15, 23, 42, 0.36)",
    "0 42px 84px rgba(15, 23, 42, 0.38)",
    "0 44px 88px rgba(15, 23, 42, 0.4)",
    "0 46px 92px rgba(15, 23, 42, 0.42)",
    "0 48px 96px rgba(15, 23, 42, 0.44)",
    "0 50px 100px rgba(15, 23, 42, 0.46)",
    "0 52px 104px rgba(15, 23, 42, 0.48)",
    "0 54px 108px rgba(15, 23, 42, 0.5)",
    "0 56px 112px rgba(15, 23, 42, 0.52)",
];

export const makeTheme = (mode) => {
    const palette = mode === "dark" ? darkPalette : lightPalette;
    const surfaceTint = mode === "dark" ? "rgba(125, 196, 172, 0.08)" : "rgba(47, 122, 98, 0.06)";

    return createTheme({
        palette,
        shape: { borderRadius: 14 },
        shadows: customShadows,
        typography: {
            fontFamily: fontStack,
            h2: {
                fontWeight: 750,
                fontSize: "clamp(2.1rem, 4vw, 3.3rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.018em",
            },
            h3: {
                fontWeight: 700,
                fontSize: "clamp(1.65rem, 2.3vw, 2.25rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.012em",
            },
            h5: {
                fontWeight: 600,
                fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                lineHeight: 1.3,
                letterSpacing: "-0.004em",
            },
            h6: {
                fontWeight: 500,
                lineHeight: 1.35,
            },
            subtitle2: {
                fontWeight: 600,
                letterSpacing: "0.01em",
            },
            body1: {
                fontSize: "1rem",
                lineHeight: 1.72,
                letterSpacing: "0.002em",
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        height: "100%",
                        backgroundColor: palette.background.default,
                    },
                    body: {
                        minHeight: "100%",
                        backgroundColor: palette.background.default,
                    },
                    "#root": {
                        minHeight: "100%",
                        backgroundColor: palette.background.default,
                    },
                    "::selection": {
                        backgroundColor: mode === "dark" ? "rgba(125,196,172,0.34)" : "rgba(47,122,98,0.26)",
                    },
                },
            },
            MuiContainer: {
                styleOverrides: {
                    root: {
                        paddingLeft: "clamp(1rem, 2.2vw, 2.25rem)",
                        paddingRight: "clamp(1rem, 2.2vw, 2.25rem)",
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        border: "1px solid",
                        borderColor: palette.divider,
                        boxShadow: customShadows[1],
                        backgroundColor: palette.background.paper,
                        backgroundImage: `linear-gradient(180deg, ${surfaceTint}, transparent 68%)`,
                        backdropFilter: "blur(6px)",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        border: "1px solid",
                        borderColor: palette.divider,
                        boxShadow: customShadows[2],
                        backgroundColor: palette.background.paper,
                        backgroundImage: `linear-gradient(180deg, ${surfaceTint}, transparent 72%)`,
                        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                    },
                },
            },
            MuiButtonBase: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        transition: "background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
                        "&.Mui-focusVisible": {
                            outline: "2px solid",
                            outlineColor: palette.secondary.main,
                            outlineOffset: 2,
                            boxShadow: `0 0 0 3px ${mode === "dark" ? "rgba(125,196,172,0.2)" : "rgba(47,122,98,0.18)"}`,
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        border: "1px solid transparent",
                        "&:hover": {
                            backgroundColor: palette.action.hover,
                            borderColor: palette.divider,
                            transform: "translateY(-1px)",
                            boxShadow:
                                mode === "dark"
                                    ? "0 6px 18px rgba(125,196,172,0.18)"
                                    : "0 6px 18px rgba(47,122,98,0.18)",
                        },
                    },
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        textDecorationColor: "transparent",
                        textUnderlineOffset: "0.18em",
                        transition: "color 180ms ease, text-decoration-color 180ms ease",
                        "&:hover": {
                            textDecorationColor: "currentColor",
                        },
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        height: 3,
                        borderRadius: 999,
                        backgroundColor: palette.secondary.main,
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        minHeight: 40,
                        textTransform: "none",
                        paddingInline: 14,
                        transition: "background-color 180ms ease, color 180ms ease",
                        "&:hover": {
                            backgroundColor: palette.action.hover,
                        },
                    },
                },
            },
        },
    });
};

export default makeTheme;
