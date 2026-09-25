import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function MissionSectionHeading({ code, label, title, note }) {
    return <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} gap={1.25} sx={{ mb: 1.5 }}>
        <Box>
            <Typography variant="overline" sx={{ color: "space.orange", fontFamily: (theme) => theme.fonts.mono }}>{code}{" // "}{label}</Typography>
            <Typography component="h2" variant="h4" sx={{ fontSize: { xs: "1.55rem", sm: "1.8rem" }, letterSpacing: "-.035em" }}>{title}</Typography>
        </Box>
        {note ? <Typography variant="overline" sx={{ color: "text.secondary", fontFamily: (theme) => theme.fonts.mono, textAlign: { sm: "right" } }}>{note}</Typography> : null}
    </Stack>;
}
