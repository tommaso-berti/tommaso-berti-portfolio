import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MotionPanel from "../../../features/mission-ui/MotionPanel.jsx";
import SpaceButton from "../../../features/mission-ui/SpaceButton.jsx";
import TechnicalLabel from "../../../features/mission-ui/TechnicalLabel.jsx";
import LayeredApplicationPreview from "./LayeredApplicationPreview.jsx";

export default function ProjectApplicationModule({ project, preview, t }) {
    if (project.id === "wattdacar") {
        return (
            <MotionPanel
                component="section"
                sx={{
                    minHeight: { xs: 290, md: 360 },
                    p: { xs: 2.2, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "space.secondaryPaper",
                }}
            >
                <Box>
                    <TechnicalLabel>{t("wattdacar.restrictedAccess")}</TechnicalLabel>
                    <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                        {t("wattdacar.title")}
                    </Typography>
                    <Typography color="text.secondary">
                        {t("wattdacar.restrictedDescription")}
                    </Typography>
                </Box>
                <Stack direction="row" justifyContent="flex-start" sx={{ pt: 3 }}>
                    <SpaceButton
                        component="a"
                        href={preview.url}
                        target="_blank"
                        rel="noreferrer"
                        variant="contained"
                    >
                        {t("wattdacar.restrictedAction")} →
                    </SpaceButton>
                </Stack>
            </MotionPanel>
        );
    }

    return <LayeredApplicationPreview project={project} preview={preview} t={t} />;
}
