import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CapabilityCard({ code, title, description }) {
    return <Card component="article" variant="outlined" sx={{ "&:hover": { transform: "translateY(-2px)", borderColor: "text.secondary" } }}><CardContent sx={{ p: 2.25 }}><Box sx={{ width: 38, height: 38, border: "1px solid", borderColor: "divider", borderRadius: "50%", display: "grid", placeItems: "center", mb: 2.2, fontFamily: "monospace", fontWeight: 900 }}>{code}</Box><Typography component="h2" variant="h5" sx={{ mb: .7 }}>{title}</Typography><Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{description}</Typography><Box aria-hidden="true" sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", height: 5, mt: 2.25, background: (theme) => `linear-gradient(90deg, ${theme.space.blue} 0 33%, ${theme.space.yellow} 33% 66%, ${theme.space.orange} 66%)` }} /></CardContent></Card>;
}
