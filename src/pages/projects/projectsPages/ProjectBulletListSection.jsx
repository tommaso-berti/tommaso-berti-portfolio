import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function ProjectBulletListSection({ id, title, items }) {
    const entries = Array.isArray(items) ? items : [];

    return (
        <Box component="section" id={id}>
            <Typography variant="h4" sx={{ mb: 1.5 }}>
                {title}
            </Typography>
            <List disablePadding>
                {entries.map((content, index) => (
                    <ListItem key={index} sx={{ p: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>•</ListItemIcon>
                        <ListItemText>{content}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
