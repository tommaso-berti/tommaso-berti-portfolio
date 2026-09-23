import {
    Box,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SpaceButton from "../../features/mission-ui/SpaceButton.jsx";
import { cvActionButtonSx } from "./cv.styles.js";

const cvToggleLabelSx = {
    fontFamily: "monospace",
    fontSize: ".56rem",
    fontWeight: 700,
    letterSpacing: ".055em",
    textTransform: "uppercase",
};

const cvSwitchSx = {
    ml: 0.2,
    mr: 0.2,
    flexShrink: 0,
    "& .MuiSwitch-switchBase.Mui-checked": { color: "space.orange" },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        bgcolor: "space.orange",
        opacity: 0.65,
    },
};

/**
 * @typedef {import("./cv.data.js").CvControlsState} CvControlsState
 */

/**
 * @param {{
 *   controls: CvControlsState,
 *   setControls: import("react").Dispatch<import("react").SetStateAction<CvControlsState>>,
 *   staticCvPdfPath: string,
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvControls({ controls, setControls, staticCvPdfPath, t }) {
    return (
        <Paper
            data-cv-controls
            variant="outlined"
            sx={{
                px: { xs: 1.3, md: 1.7 },
                py: { xs: 1.1, md: 1.35 },
                borderRadius: 0,
                position: { xs: "static", md: "sticky" },
                top: { md: "9.5rem", lg: "6.5rem" },
                zIndex: 5,
                overflowX: "visible",
                bgcolor: "background.paper",
                backgroundImage: "none",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 8px 26px rgba(23,32,42,.08)",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    bgcolor: "space.blue",
                },
            }}
        >
            <Typography
                sx={{
                    mb: 0.65,
                    color: "space.blue",
                    fontFamily: "monospace",
                    fontSize: ".6rem",
                    fontWeight: 800,
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                }}
            >
                {t("cv.controlDeckTitle")}
            </Typography>
            <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 1.1, lg: 0.8 }}
                alignItems={{ xs: "stretch", lg: "center" }}
                justifyContent="space-between"
                sx={{ flexWrap: { lg: "wrap" }, rowGap: { lg: 1 } }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 0.75, sm: 0.9, lg: 0.65 }}
                    alignItems={{ sm: "center", lg: "center" }}
                    sx={{ flexWrap: { lg: "nowrap" }, minWidth: 0, flex: { lg: "1 1 760px" } }}
                >
                    <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={controls.density}
                        onChange={(_, value) => {
                            if (!value) return;
                            setControls((previous) => ({ ...previous, density: value }));
                        }}
                        aria-label={t("cv.densityLabel")}
                        sx={{
                            borderRadius: 0,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                            "& .MuiToggleButtonGroup-grouped": {
                                border: "0 !important",
                                px: 1.5,
                                py: 0.55,
                                minWidth: 96,
                                fontFamily: "monospace",
                                fontSize: ".59rem",
                                textTransform: "uppercase",
                                letterSpacing: ".08em",
                                fontWeight: 800,
                                color: "text.secondary",
                                transition: "0.2s",
                                "&:not(:first-of-type)": {
                                    borderLeft: "1px solid",
                                    borderLeftColor: "divider",
                                },
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                    color: "text.primary",
                                },
                                "&.Mui-selected": {
                                    backgroundColor: "space.blue",
                                    color: "primary.contrastText",
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "space.blue",
                                },
                                "&.Mui-focusVisible": {
                                    outline: "2px solid",
                                    outlineColor: "primary.main",
                                    outlineOffset: -2,
                                },
                            },
                        }}
                    >
                        <ToggleButton value="full">{t("cv.full")}</ToggleButton>
                        <ToggleButton value="compact">{t("cv.compact")}</ToggleButton>
                    </ToggleButtonGroup>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={controls.showExperience}
                                slotProps={{ input: { "aria-label": t("cv.showExperience") } }}
                                onChange={(event) => {
                                    setControls((previous) => ({
                                        ...previous,
                                        showExperience: event.target.checked,
                                    }));
                                }}
                            />
                        }
            label={
                <Typography noWrap sx={cvToggleLabelSx}>
                    {t("cv.showExperience")}
                </Typography>
            }
            sx={cvSwitchSx}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={controls.showProjects}
                                slotProps={{ input: { "aria-label": t("cv.showProjects") } }}
                                onChange={(event) => {
                                    setControls((previous) => ({
                                        ...previous,
                                        showProjects: event.target.checked,
                                    }));
                                }}
                            />
                        }
            label={
                <Typography noWrap sx={cvToggleLabelSx}>
                    {t("cv.showProjects")}
                </Typography>
            }
            sx={cvSwitchSx}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={controls.showCertifications}
                                slotProps={{ input: { "aria-label": t("cv.showCertifications") } }}
                                onChange={(event) => {
                                    setControls((previous) => ({
                                        ...previous,
                                        showCertifications: event.target.checked,
                                    }));
                                }}
                            />
                        }
            label={
                <Typography noWrap sx={cvToggleLabelSx}>
                    {t("cv.showCertifications")}
                </Typography>
            }
            sx={cvSwitchSx}
                    />
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    alignItems={{ sm: "center", lg: "center" }}
                    sx={{
                        flexWrap: { lg: "nowrap" },
                        minWidth: 0,
                        ml: { lg: "auto" },
                        flex: { lg: "0 0 auto" },
                    }}
                >
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        sx={{ flexWrap: "nowrap", minWidth: 0 }}
                    >
                        <SpaceButton
                            variant="contained"
                            startIcon={<DownloadRoundedIcon />}
                            onClick={() => window.print()}
                            endIcon={
                                <Tooltip title={t("cv.dynamicPdfInfoTooltip")} arrow>
                                    <Box
                                        component="span"
                                        role="button"
                                        tabIndex={0}
                                        aria-label={t("cv.dynamicPdfInfoTooltip")}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        }}
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" || event.key === " ") {
                                                event.preventDefault();
                                                event.stopPropagation();
                                            }
                                        }}
                                        sx={{
                                            width: 18,
                                            height: 18,
                                            color: "rgba(255,255,255,0.92)",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "help",
                                            "&:focus-visible": {
                                                outline: "2px solid",
                                                outlineColor: "rgba(255,255,255,0.95)",
                                                outlineOffset: 1,
                                            },
                                        }}
                                    >
                                        <InfoOutlinedIcon sx={{ fontSize: 13 }} />
                                    </Box>
                                </Tooltip>
                            }
                            sx={{ ...cvActionButtonSx, minWidth: { sm: 230, lg: 0 } }}
                        >
                            {t("cv.downloadPdfCurrentView")}
                        </SpaceButton>
                        <SpaceButton
                            component="a"
                            href={staticCvPdfPath}
                            target="_blank"
                            rel="noreferrer"
                            download
                            variant="outlined"
                            startIcon={<DescriptionRoundedIcon />}
                            sx={{ ...cvActionButtonSx, minWidth: { sm: 230, lg: 0 } }}
                        >
                            {t("cv.downloadStaticPdf")}
                        </SpaceButton>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}
