import Box from "@mui/material/Box";

export default function ColorRail({ sx }) {
    return <Box aria-hidden="true" sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", height: 5, ...sx }}>
        {["red", "orange", "yellow", "blue"].map((color) => <Box key={color} sx={{ bgcolor: (theme) => theme.space[color] }} />)}
    </Box>;
}
