import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { BreadcrumbProvider } from "../contexts/BreadcrumbContext.jsx";

export default function Layout() {
    return (
        <BreadcrumbProvider>
            <Container maxWidth="lg" >
                <Header />
                <Box
                    component="main"
                    sx={{
                        paddingY: '2rem',
                        height: '100%'
                    }}
                >
                    <Outlet />
                </Box>
                <Box
                    component='footer'
                    sx={{
                        position: 'fixed',
                        bottom: '2rem',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}>
                    <Footer />
                </Box>
            </Container>
        </BreadcrumbProvider>
    )
}