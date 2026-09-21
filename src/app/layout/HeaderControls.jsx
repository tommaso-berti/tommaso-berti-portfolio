import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useThemeMode } from "../../contexts/ThemeContext.jsx";
import ItFlag from "../../assets/icons/italy.png";
import EnFlag from "../../assets/icons/united-kingdom.png";
import { ensureLanguageLoaded } from "@/i18n/index.js";

const ACCENTS = { blue: "space.blue", orange: "space.orange", yellow: "space.yellow", red: "space.red" };

function ControlButton({ label, accent, active, children, ...props }) {
    return (
        <Tooltip title={label} placement="bottom" arrow>
            <IconButton
                {...props}
                size="small"
                aria-label={label}
                sx={{
                    width: 48,
                    height: 48,
                    border: 0,
                    borderRadius: 0,
                    color: "text.secondary",
                    position: "relative",
                    transition: "transform 220ms cubic-bezier(.2,.8,.2,1), color 200ms ease, background-color 200ms ease, border-color 200ms ease",
                    "&::after": { content: '""', position: "absolute", left: 9, right: 9, bottom: 4, height: 2, bgcolor: ACCENTS[accent], transform: active ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 220ms ease" },
                    "&:hover, &:focus-visible": { color: "text.primary", bgcolor: "transparent", transform: "translateY(-2px)", "&::after": { transform: "scaleX(1)" } },
                    ...(active ? { color: "text.primary", bgcolor: "transparent", transform: "translateY(-2px)" } : {}),
                    "&:active": { transform: "translateY(0) scale(.96)" },
                    "& .MuiSvgIcon-root, & img": { position: "relative", zIndex: 1 },
                }}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
}

function PopoverShell({ anchorEl, onClose, title, code, accent = "blue", children, minWidth = 224 }) {
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            slotProps={{ paper: { sx: { mt: 1.5, width: minWidth, maxWidth: "calc(100vw - 32px)", p: 1, borderColor: "divider", borderRadius: 0, boxShadow: "0 12px 28px rgba(23,32,42,.14)" } } }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: .75, pb: .9, borderBottom: "1px solid", borderColor: "divider", color: "text.secondary", fontFamily: "monospace", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".13em", textTransform: "uppercase" }}>
                <span>{title}</span>
                {code ? <Box component="span" sx={{ color: ACCENTS[accent] }}>{code}</Box> : <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "space.green", boxShadow: "0 0 0 3px color-mix(in srgb, currentColor 18%, transparent)" }} />}
            </Stack>
            {children}
        </Popover>
    );
}

const itemSx = { width: "100%", minHeight: 38, px: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, color: "text.primary", fontFamily: "monospace", fontSize: ".68rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", textDecoration: "none", "&:hover": { bgcolor: "action.hover" } };

export default function HeaderControls({ onOpenReleaseNotes }) {
    const { i18n, t } = useTranslation("common");
    const { mode, toggleTheme } = useThemeMode();
    const [anchor, setAnchor] = useState(null);
    const [panel, setPanel] = useState(null);
    const language = i18n.language?.toLowerCase().startsWith("it") ? "it" : "en";

    useEffect(() => {
        const handleKeyDown = (event) => { if (event.key === "Escape") { setAnchor(null); setPanel(null); } };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const togglePanel = (event, nextPanel) => {
        setAnchor(anchor && panel === nextPanel ? null : event.currentTarget);
        setPanel(anchor && panel === nextPanel ? null : nextPanel);
    };

    const selectLanguage = async (nextLanguage) => {
        await ensureLanguageLoaded(nextLanguage);
        await i18n.changeLanguage(nextLanguage);
        setAnchor(null);
        setPanel(null);
    };

    const modeCode = mode === "dark" ? "DARK" : "LIGHT";

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: .15 }}>
            <ControlButton label={t("a11y.openReleaseNotes")} accent="red" onClick={onOpenReleaseNotes}>
                <DescriptionOutlinedIcon fontSize="small" />
            </ControlButton>
            <ControlButton label={`${t("headerControls.languageTooltip")} / ${language.toUpperCase()}`} accent="orange" active={panel === "language"} onClick={(event) => togglePanel(event, "language")} aria-expanded={panel === "language"}>
                <Box component="img" src={language === "it" ? ItFlag : EnFlag} alt="" aria-hidden sx={{ width: 28, height: 20, display: "block", objectFit: "cover", border: "1px solid rgba(0,0,0,.08)" }} />
            </ControlButton>
            <ControlButton label={mode === "light" ? t("a11y.toggleThemeDark") : t("a11y.toggleThemeLight")} accent="yellow" active={panel === "theme"} onClick={(event) => { toggleTheme(); togglePanel(event, "theme"); }} aria-expanded={panel === "theme"}>
                {mode === "light" ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
            </ControlButton>

            <PopoverShell anchorEl={panel === "language" ? anchor : null} onClose={() => { setAnchor(null); setPanel(null); }} title={t("headerControls.languageTitle")} code="02" accent="orange">
                <Box sx={{ pt: .65 }}>
                    {[['it', t("headerControls.italian"), ItFlag], ['en', t("headerControls.english"), EnFlag]].map(([id, label, flag]) => <ButtonBase key={id} onClick={() => void selectLanguage(id)} sx={{ ...itemSx, justifyContent: "space-between", bgcolor: language === id ? "action.selected" : "transparent", boxShadow: language === id ? "inset 2px 0 0" : "none", boxShadowColor: "space.blue" }}><span>{label}</span><Box component="img" src={flag} alt="" aria-hidden sx={{ width: 24, height: 17, objectFit: "cover" }} /></ButtonBase>)}
                </Box>
            </PopoverShell>

            <PopoverShell anchorEl={panel === "theme" ? anchor : null} onClose={() => { setAnchor(null); setPanel(null); }} title={t("headerControls.themeTitle")} code={modeCode} accent="yellow" minWidth={224}>
                <Box sx={{ px: .75, pt: .8, pb: .55, color: "text.secondary", fontFamily: "monospace", fontSize: ".63rem", lineHeight: 1.5, whiteSpace: "normal", overflowWrap: "anywhere" }}>{t("headerControls.themeCopy")}</Box>
                <Box sx={{ mx: .75, mt: .35, height: 5, bgcolor: "action.hover", overflow: "hidden" }}><Box sx={{ width: mode === "dark" ? "88%" : "72%", height: "100%", background: "linear-gradient(90deg, #347CB2, #DF733D)" }} /></Box>
            </PopoverShell>
        </Box>
    );
}
