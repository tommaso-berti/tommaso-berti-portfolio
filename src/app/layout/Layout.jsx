import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Container, Link } from "@mui/material";
import Box from "@mui/material/Box";

export default function Layout() {
    const { t } = useTranslation("common");

    return (
        <Container
            maxWidth="xl"
            sx={{
                minHeight: "100dvh",
                backgroundColor: "transparent",
            }}
        >
            <Link
                href="#main-content"
                sx={{
                    position: "absolute",
                    left: -9999,
                    top: "auto",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    zIndex: 200,
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    bgcolor: "background.paper",
                    color: "text.primary",
                    textDecoration: "none",
                    "&:focus": {
                        left: 16,
                        top: 16,
                        width: "auto",
                        height: "auto",
                        overflow: "visible",
                    },
                }}
            >
                {t("a11y.skipToContent")}
            </Link>
            <Header />
            <Box
                id="main-content"
                component="main"
                sx={{
                    width: "100%",
                    maxWidth: "1020px",
                    mx: "auto",
                    paddingTop: { xs: "8.4rem", md: "9.1rem" },
                    paddingBottom: { xs: "7rem", md: "8rem" },
                    height: "100%",
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </Container>
    );
}
