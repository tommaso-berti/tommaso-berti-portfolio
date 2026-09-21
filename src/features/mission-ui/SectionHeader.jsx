import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TechnicalLabel from "./TechnicalLabel.jsx";

export default function SectionHeader({ eyebrow, title, note, component = "h1" }) {
    return <Stack spacing={2} sx={{ mb: { xs: 2.5, md: 3.5 } }}>
        <Box sx={{ borderBlock: "1px solid", borderColor: "divider", py: 1 }}><TechnicalLabel>{eyebrow}</TechnicalLabel></Box>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "flex-end" }} justifyContent="space-between" gap={1.5}>
            <Typography component={component} variant="h3">{title}</Typography>
            {note ? <TechnicalLabel sx={{ textAlign: { sm: "right" } }}>{note}</TechnicalLabel> : null}
        </Stack>
    </Stack>;
}
