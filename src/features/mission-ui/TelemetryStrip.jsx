import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TechnicalLabel from "./TechnicalLabel.jsx";

export default function TelemetryStrip({ items, ariaLabel = "Telemetry" }) {
    return <Box component="section" aria-label={ariaLabel} sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: "1px", bgcolor: "divider", border: "1px solid", borderColor: "divider" }}>
        {items.map((item) => <Box key={item.label} sx={{ p: 1.5, bgcolor: (theme) => theme.space.panel }}><TechnicalLabel sx={{ fontSize: ".55rem" }}>{item.label}</TechnicalLabel><Typography sx={{ fontWeight: 900, fontSize: "1.25rem", mt: .35, color: item.status ? "success.main" : "text.primary" }}>{item.value}</Typography></Box>)}
    </Box>;
}
