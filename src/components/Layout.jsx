import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Container } from "@mui/material";

export default function Layout() {
    return (
        <Container maxWidth="lg" >
            <Header />
            <Footer />
            <Outlet />
        </Container>
    )
}