import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";

export default function Blog() {
    const { t } = useTranslation("pages", { keyPrefix: "blog" });
    const baseStatus = t('work_in_progress', { count: 1, defaultValue: 'Work in progress' });
    const statusLabel = t('work_in_progress_label', {
        status: baseStatus,
        defaultValue: baseStatus,
    });

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
            <TechnicalLabel sx={{ position: "absolute", top: 24 }}>EXPLORATION LOG // PENDING</TechnicalLabel>
            <Typography variant="h1">
                {statusLabel}
            </Typography>
        </Box>
    )
}
