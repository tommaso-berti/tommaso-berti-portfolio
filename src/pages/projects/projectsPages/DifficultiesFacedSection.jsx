import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useTranslation } from "../../../hooks/useTranslation.js";
import Box from "@mui/material/Box";

export default function DifficultiesFacedSection({difficulties}) {
    const { t } = useTranslation(`pages.projects`);
    const items = Array.isArray(difficulties) ? difficulties : [];

    return (
        <Box component="section" id="difficulties-faced">
            <Typography variant="h4" sx={{ mb: 4 }}>
                {t('difficulties_faced')}
            </Typography>
            <List>
                {
                    items.map((content, index) => (
                        <ListItem key={index} sx={{p: 0}}>
                            <ListItemIcon sx={{ minWidth: 24 }}>•</ListItemIcon>
                            <ListItemText>
                                {content}
                            </ListItemText>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}
