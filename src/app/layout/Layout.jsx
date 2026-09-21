import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const MAIN_CONTENT_ID = "main-content";

export default function Layout() {
    const { t } = useTranslation("common");

    return (
        <Container
            maxWidth="xl"
            sx={{
                minHeight: "100dvh",
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
            <Box
                id={MAIN_CONTENT_ID}
                component="main"
                tabIndex={-1}
                sx={{
                    width: "100%",
                    maxWidth: 1160,
                    mx: "auto",
                    pt: { xs: "10.5rem", lg: "6.8rem" },
                    pb: { xs: 5, md: 7 },
                    minHeight: "calc(100dvh - 128px)",
                    animation: "panelEnter 300ms cubic-bezier(.2,.75,.2,1)",
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </Container>
    );
}
