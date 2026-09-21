import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import BrandMark from "../../features/mission-ui/BrandMark.jsx";
import FriendlyNav from "../../features/FriendlyNav.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";
import LanguageToggle from "./LanguageToggle.jsx";

const ReleaseNotesModal = lazy(() => import("./ReleaseNotesModal.jsx"));

export default function Header() {
    const { t } = useTranslation("common");
    const [open, setOpen] = useState(false);
    return <Container component="header" maxWidth="xl" sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 20, py: { xs: .7, md: 1 } }}><Box sx={{ border: "1px solid", borderColor: "divider", bgcolor: "background.paper", position: "relative", "&::after": { content: '""', position: "absolute", inset: 0, pointerEvents: "none", opacity: .07, backgroundImage: "radial-gradient(circle, currentColor 0 .5px, transparent .7px)", backgroundSize: "14px 14px" } }}><Stack direction={{ xs: "column", lg: "row" }} alignItems={{ lg: "center" }} justifyContent="space-between" gap={.5} sx={{ px: { xs: 1.15, md: 1.6 }, py: .7, position: "relative", zIndex: 1 }}><BrandMark /><Stack direction="row" alignItems="center" justifyContent={{ xs: "space-between", lg: "flex-end" }} gap={1} sx={{ width: { xs: "100%", lg: "auto" }, minWidth: 0 }}><FriendlyNav /><Stack direction="row" alignItems="center" flexShrink={0}><IconButton aria-label={t("a11y.openReleaseNotes")} onClick={() => setOpen(true)} size="small"><ArticleOutlinedIcon fontSize="small" /></IconButton><LanguageToggle /><DarkModeToggle /></Stack></Stack></Stack>{open ? <Suspense fallback={null}><ReleaseNotesModal open={open} onClose={() => setOpen(false)} /></Suspense> : null}</Box></Container>;
}
