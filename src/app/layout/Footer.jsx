import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Footer() {
    return <Container component="footer" maxWidth="xl" sx={{ position: "sticky", bottom: 0, zIndex: 10, borderTop: "1px solid", borderColor: "divider", py: 1.6, bgcolor: "background.paper" }}><Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={.5}><Typography variant="overline" color="text.secondary">TB // SOFTWARE DEVELOPER</Typography><Typography variant="overline" color="text.secondary">BUILD // EXPLORE // IMPROVE</Typography><Typography variant="overline" color="text.secondary">BASED ON EARTH // AVAILABLE REMOTELY</Typography></Stack></Container>;
}
