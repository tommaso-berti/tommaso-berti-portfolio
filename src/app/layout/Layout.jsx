import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import DocumentScrollRail from "./DocumentScrollRail.jsx";
import Stack from "@mui/material/Stack";
import TechnicalLabel from "@/features/mission-ui/TechnicalLabel.jsx";
import { lazy, Suspense, useState } from "react";

const ReleaseNotesModal = lazy(() => import("./ReleaseNotesModal.jsx"));

const MAIN_CONTENT_ID = "main-content";

export default function Layout() {
    const [releaseNotesOpen, setReleaseNotesOpen] = useState(false);
    const { t } = useTranslation("common");
    const { pathname } = useLocation();
    const closingPage = pathname === "/" ? "home"
        : pathname === "/projects" ? "projects"
            : pathname.startsWith("/projects/") ? "projectDetails"
                : pathname === "/about" ? "about"
                    : pathname === "/services" ? "services"
                        : pathname === "/systems" ? "systems"
                            : pathname === "/contact" ? "contact"
                                : pathname === "/cv" ? "cv"
                                        : pathname === "/blog" ? "blog"
                                            : pathname === "/style" ? "style"
                                        : "notFound";

    return (
        <Container
            maxWidth="xl"
            sx={{
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: 0.035,
                    backgroundImage: "radial-gradient(circle, currentColor 0 .5px, transparent .7px)",
                    backgroundSize: "14px 14px",
                },
            }}
        >
            <Box
                component="a"
                href={`#${MAIN_CONTENT_ID}`}
                sx={{
                    position: "absolute",
                    left: -9999,
                    zIndex: 30,
                    px: 2,
                    py: 1,
                    bgcolor: "background.paper",
                    color: "text.primary",
                    textDecoration: "none",
                    "&:focus": { left: 16, top: 16 },
                }}
            >
                {t("a11y.skipToContent")}
            </Box>
            <Header />
            <DocumentScrollRail />
            <Box
                id={MAIN_CONTENT_ID}
                component="main"
                tabIndex={-1}
                sx={{
                    width: "100%",
                    maxWidth: 1160,
                    mx: "auto",
                    flexGrow: 1,
                    pt: { xs: "10.5rem", lg: "6.8rem" },
                    pb: { xs: 5, md: 7 },
                    minHeight: "calc(100dvh - 128px)",
                    animation: "panelEnter 300ms cubic-bezier(.2,.75,.2,1)",
                }}
            >
                <Outlet />
                <Stack data-cv-closing={pathname === "/cv" ? "" : undefined} direction="row" alignItems="center" gap={1.5} sx={{ mt: { xs: 3, md: 4 }, color: "text.secondary" }}>
                    <Box sx={{ height: "1px", flex: 1, bgcolor: "divider" }} />
                    <TechnicalLabel>{t(`pageClosingLines.${closingPage}`)}</TechnicalLabel>
                    <Box sx={{ height: "1px", flex: 1, bgcolor: "divider" }} />
                </Stack>
            </Box>
            <Footer onOpenReleaseNotes={() => setReleaseNotesOpen(true)} />
            {releaseNotesOpen ? (
                <Suspense fallback={null}>
                    <ReleaseNotesModal open onClose={() => setReleaseNotesOpen(false)} />
                </Suspense>
            ) : null}
        </Container>
    );
}
