import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SearchMechanicsSection({ title, items }) {
    const points = Array.isArray(items) ? items : [];

    if (!points.length) {
        return null;
    }

    return (
        <Box component="section" id="search-mechanics">
            <Typography variant="h4" sx={{ mb: 4 }}>
                {title}
            </Typography>
            <List>
                {points.map((content, index) => (
                    <ListItem key={index} sx={{ p: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>•</ListItemIcon>
                        <ListItemText>{content}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
