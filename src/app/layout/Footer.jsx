import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <Container
            component="footer"
            maxWidth="xl"
            sx={{
                position: "sticky",
                bottom: 0,
                zIndex: 10,
                borderTop: "1px solid",
                borderColor: "divider",
                py: 1.6,
                bgcolor: "background.paper",
            }}
        >
            <Stack
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                    gap: 0.5,
                    "& > :nth-of-type(1)": { textAlign: { xs: "center", md: "left" } },
                    "& > :nth-of-type(2)": { textAlign: "center" },
                    "& > :nth-of-type(3)": { textAlign: { xs: "center", md: "right" } },
                }}
            >
                <Typography variant="overline" color="text.secondary">
                    TB // SOFTWARE DEVELOPER
                </Typography>
                <Typography variant="overline" color="text.secondary">
                    BUILD // EXPLORE // IMPROVE
                </Typography>
                <Typography variant="overline" color="text.secondary">
                    BASED ON EARTH // AVAILABLE REMOTELY
                </Typography>
            </Stack>
        </Container>
    );
}
