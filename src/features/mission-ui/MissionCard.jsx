import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TechnicalLabel from "./TechnicalLabel.jsx";

export default function MissionCard({ mission, selected, onSelect }) {
    return <Card component="article" variant="outlined" sx={{ height: "100%", position: "relative", overflow: "hidden", borderColor: selected ? "text.primary" : "divider", transform: selected ? "translateY(-2px)" : "none", "&::before": { content: '""', position: "absolute", left: 0, top: 0, width: 6, height: 48, bgcolor: mission.color } }}>
        <CardActionArea onClick={onSelect} aria-pressed={selected} sx={{ height: "100%", alignItems: "stretch" }}><CardContent sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
            <TechnicalLabel>{mission.overline}</TechnicalLabel><Typography component="h2" variant="h5" sx={{ mt: 2.4, mb: .8 }}>{mission.title}</Typography><Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55, flexGrow: 1 }}>{mission.description}</Typography>
            <Stack direction="row" flexWrap="wrap" gap={.55} sx={{ mt: 1.8 }}>{mission.technologies.slice(0, 4).map((technology) => <Chip key={technology} label={technology} variant="outlined" size="small" />)}</Stack>
            <Box aria-hidden="true" sx={{ height: 3, mt: 1.8, bgcolor: "divider", overflow: "hidden" }}><Box sx={{ height: "100%", bgcolor: "text.primary", transform: selected ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", animation: selected ? "missionRail 1.1s ease forwards" : "none" }} /></Box>
        </CardContent></CardActionArea>
    </Card>;
}
