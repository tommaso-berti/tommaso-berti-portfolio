import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

export default function Layout() {
    return (
        <Container maxWidth="lg" >
            <Header />
            <Box
                component="main"
                sx={{
                    paddingTop: '6rem',
                    paddingBottom: '8rem',
                    height: '100%'
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </Container>
    )
}