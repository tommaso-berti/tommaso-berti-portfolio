import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import BrandMark from "@/features/mission-ui/BrandMark.jsx";
import FriendlyNav from "@/features/FriendlyNav.jsx";
import HeaderControls from "./HeaderControls.jsx";

export default function Header() {
    return <Container component="header" maxWidth="xl" sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 20, py: { xs: .7, md: 1 } }}><Box sx={{ bgcolor: "background.paper", backgroundImage: "radial-gradient(circle, rgba(23,32,42,.07) 0 .5px, transparent .7px)", backgroundSize: "14px 14px", position: "relative", "&::before": { content: '""', position: "absolute", top: 0, left: 0, width: { xs: 16, md: 20 }, height: { xs: 16, md: 20 }, borderTop: "1px solid", borderLeft: "1px solid", borderColor: "text.primary", pointerEvents: "none", zIndex: 2 }, "&::after": { content: '""', position: "absolute", right: 0, bottom: 0, width: { xs: 16, md: 20 }, height: { xs: 16, md: 20 }, borderRight: "1px solid", borderBottom: "1px solid", borderColor: "text.primary", pointerEvents: "none", opacity: .92 } }}><Stack direction={{ xs: "column", lg: "row" }} alignItems={{ lg: "center" }} justifyContent="space-between" gap={{ xs: 1, lg: 1.5 }} sx={{ px: { xs: 1.15, md: 1.6 }, py: .7, position: "relative", zIndex: 1 }}><BrandMark /><Stack direction="row" alignItems="center" justifyContent={{ xs: "space-between", lg: "flex-end" }} gap={{ xs: .5, md: 1 }} sx={{ width: { xs: "100%", lg: "auto" }, minWidth: 0 }}><FriendlyNav /><HeaderControls /></Stack></Stack></Box></Container>;
}
