import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NAV = [["home", "/", "01"], ["projects", "/projects", "02"], ["about", "/about", "03"], ["services", "/services", "04"], ["systems", "/systems", "05"], ["contact", "/contact", "06"]];

export default function FriendlyNav() {
    const { pathname } = useLocation();
    const { t } = useTranslation("common");
    return <Box component="nav" aria-label={t("a11y.primaryNavigation")} sx={{ overflowX: "auto" }}><Stack direction="row" spacing={{ xs: .25, md: .9 }} sx={{ width: "max-content", minWidth: "100%", justifyContent: { md: "flex-end" } }}>{NAV.map(([id, path, number]) => {
        const active = path === "/" ? pathname === path : pathname === path || pathname.startsWith(`${path}/`);
        return <ButtonBase key={id} component={RouterLink} to={path} aria-current={active ? "page" : undefined} sx={{ minHeight: 42, px: { xs: .75, sm: 1 }, position: "relative", fontFamily: "monospace", fontSize: ".76rem", fontWeight: 800, letterSpacing: ".07em", whiteSpace: "nowrap", color: active ? "text.primary" : "text.secondary", "&::after": { content: '""', position: "absolute", bottom: 2, left: 8, right: 8, height: 2, bgcolor: "space.blue", transform: active ? "scaleX(1)" : "scaleX(0)", transition: "transform 220ms ease" }, "&:hover::after": { transform: "scaleX(1)" } }}>{number} {t(`nav.${id}`)}</ButtonBase>;
    })}</Stack></Box>;
}
