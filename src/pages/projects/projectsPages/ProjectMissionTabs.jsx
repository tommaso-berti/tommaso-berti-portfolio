import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const ACCENTS = {
    overview: "space.red", system: "space.orange", interface: "space.yellow", development: "space.blue",
    identity: "space.red", method: "space.orange", beyond: "space.blue",
    all: "space.blue", main: "space.red", side: "space.orange", practice: "space.yellow",
};

export default function ProjectMissionTabs({ modules, active, onChange, t, labelPrefix = "dossier.modules", labelKeys = {}, ariaLabel }) {
    const getLabel = (module) => labelKeys[module] ? t(labelKeys[module]) : labelPrefix ? t(`${labelPrefix}.${module}`) : t(module);
    return <Box sx={{ position: "relative", p: 1, border: "1px solid", borderColor: "divider", bgcolor: "rgba(242,239,230,.55)", overflow: "hidden", "&::after": { content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: 5, background: "linear-gradient(90deg, #cb4f45 0 25%, #e47b39 25% 50%, #d5b43b 50% 75%, #3b7ca4 75% 100%)" } }}><Stack component="nav" aria-label={ariaLabel || t("dossier.modulesLabel")} direction="row" gap={.75} sx={{ overflowX: "auto", pb: .25, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
        {modules.map((module, index) => <Button key={module} onClick={() => onChange(module)} aria-pressed={active === module} variant={active === module ? "contained" : "outlined"} sx={{ position: "relative", flex: "1 0 0", minWidth: { xs: 142, sm: 160 }, minHeight: 54, px: 1.75, justifyContent: "flex-start", gap: 1.25, borderColor: active === module ? "text.primary" : "rgba(23,32,42,.48)", color: active === module ? "background.paper" : "text.primary", bgcolor: active === module ? "text.primary" : "rgba(242,239,230,.66)", boxShadow: active === module ? "0 8px 18px rgba(23,32,42,.16)" : "none", transform: active === module ? "translateY(-1px)" : "none", "&::after": { content: '""', position: "absolute", left: -1, right: -1, bottom: -1, height: 3, bgcolor: ACCENTS[module], transform: active === module ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 220ms cubic-bezier(.2,.8,.2,1)" }, "&:hover": { transform: "translateY(-2px)", borderColor: "text.primary", boxShadow: "0 8px 18px rgba(23,32,42,.08)" }, "&:hover::after": { transform: "scaleX(.45)" } }}><span style={{ opacity: .68 }}>{`0${index + 1}`}</span><span>{getLabel(module)}</span><span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", marginLeft: "auto", background: active === module ? "currentColor" : "rgba(23,32,42,.24)" }} /></Button>)}
    </Stack></Box>;
}
