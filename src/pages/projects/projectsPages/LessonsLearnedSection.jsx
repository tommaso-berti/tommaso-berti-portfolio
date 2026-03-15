import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LessonsLearnedSection({ title, items }) {
    const lessons = Array.isArray(items) ? items : [];

    if (!lessons.length) {
        return null;
    }

    return (
        <Box component="section" id="lessons-learned">
            <Typography variant="h4" sx={{ mb: 4 }}>
                {title}
            </Typography>
            <List>
                {lessons.map((content, index) => (
                    <ListItem key={index} sx={{ p: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>•</ListItemIcon>
                        <ListItemText>{content}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
