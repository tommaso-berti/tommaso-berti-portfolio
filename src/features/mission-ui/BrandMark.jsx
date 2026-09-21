import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function BrandMark({ compact = false }) {
    return <Stack direction="row" spacing={1.2} alignItems="center" sx={{ minWidth: 0 }}>
        <Box component="img" src="/tb-logo-1024.png" alt="Tommaso Berti" sx={{ width: 52, height: 52, objectFit: "cover", borderRadius: "50%", display: "block", flexShrink: 0 }} />
        {!compact && <Box sx={{ minWidth: 0 }}><Typography sx={{ fontWeight: 900, fontSize: ".9rem", letterSpacing: ".12em", whiteSpace: "nowrap" }}>TOMMASO BERTI</Typography><Typography variant="overline" color="text.secondary" sx={{ fontSize: ".6rem", whiteSpace: "nowrap" }}>SOFTWARE DEVELOPMENT // EXPLORATION UNIT</Typography></Box>}
    </Stack>;
}
