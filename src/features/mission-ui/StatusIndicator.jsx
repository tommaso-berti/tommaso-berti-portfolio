import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TechnicalLabel from "./TechnicalLabel.jsx";

export default function StatusIndicator({ children, pulse = true }) {
    return <Stack direction="row" spacing={.7} alignItems="center"><Box aria-hidden="true" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "success.main", animation: pulse ? "statusPulse 1.9s ease-in-out infinite" : "none" }} /><TechnicalLabel color="text.secondary">{children}</TechnicalLabel></Stack>;
}
