import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {useTranslation} from "../../hooks/useTranslation.js";

export default function Blog() {
    const { t } = useTranslation('pages.blog');

    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                width: "100%",
                height: "70vh",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
        }}
        >
            <Typography variant="h1">
                {t('work_in_progress')}
            </Typography>
        </Box>
    )
}