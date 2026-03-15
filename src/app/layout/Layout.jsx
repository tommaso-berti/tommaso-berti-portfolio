import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

export default function Layout() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                minHeight: "100dvh",
                backgroundColor: "transparent",
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    width: "100%",
                    maxWidth: "1020px",
                    mx: "auto",
                    paddingTop: { xs: "5.75rem", md: "6.75rem" },
                    paddingBottom: { xs: "7rem", md: "8rem" },
                    height: '100%'
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </Container>
    )
}
