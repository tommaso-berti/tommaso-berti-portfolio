import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { lazy, Suspense, useState } from "react";
import BrandMark from "@/features/mission-ui/BrandMark.jsx";
import FriendlyNav from "@/features/FriendlyNav.jsx";
import HeaderControls from "./HeaderControls.jsx";

const ReleaseNotesModal = lazy(() => import("./ReleaseNotesModal.jsx"));

export default function Header() {
    const [open, setOpen] = useState(false);
    return <Container component="header" maxWidth="xl" sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 20, py: { xs: .7, md: 1 } }}><Box sx={{ bgcolor: "background.paper", position: "relative", "&::after": { content: '""', position: "absolute", inset: 0, pointerEvents: "none", opacity: .07, backgroundImage: "radial-gradient(circle, currentColor 0 .5px, transparent .7px)", backgroundSize: "14px 14px" } }}><Stack direction={{ xs: "column", lg: "row" }} alignItems={{ lg: "center" }} justifyContent="space-between" gap={{ xs: 1, lg: 1.5 }} sx={{ px: { xs: 1.15, md: 1.6 }, py: .7, position: "relative", zIndex: 1 }}><BrandMark /><Stack direction="row" alignItems="center" justifyContent={{ xs: "space-between", lg: "flex-end" }} gap={{ xs: .5, md: 1 }} sx={{ width: { xs: "100%", lg: "auto" }, minWidth: 0 }}><FriendlyNav /><HeaderControls onOpenReleaseNotes={() => setOpen(true)} /></Stack></Stack>{open ? <Suspense fallback={null}><ReleaseNotesModal open={open} onClose={() => setOpen(false)} /></Suspense> : null}</Box></Container>;
}
