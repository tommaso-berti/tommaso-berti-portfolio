import Box from "@mui/material/Box";

export default function MissionPatch({ label = "TB", size = "md" }) {
    const dimensions = { sm: 58, md: 108, lg: 152 };
    const dimension = dimensions[size] ?? dimensions.md;
    return <Box aria-label={label} sx={{ width: dimension, height: dimension, borderRadius: "50%", border: "7px solid", borderColor: "background.paper", outline: "1px solid", outlineColor: "divider", background: (theme) => `radial-gradient(circle, ${theme.space.blue} 0 28%, #234f70 29% 45%, ${theme.space.yellow} 46% 54%, ${theme.space.orange} 55% 62%, ${theme.space.red} 63% 70%, ${theme.palette.text.primary} 71%)`, color: "#fff", display: "grid", placeItems: "center", fontWeight: 900, fontSize: dimension / 4 }} />;
}
