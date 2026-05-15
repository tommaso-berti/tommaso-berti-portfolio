import {
    Box,
    Button,
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
import { cvActionButtonSx } from "./cv.styles.js";

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
                px: { xs: 1.2, md: 1.6 },
                py: { xs: 1, md: 1.2 },
                borderRadius: 2.5,
                position: { xs: "static", md: "sticky" },
                top: { md: "7.9rem" },
                zIndex: 5,
                overflowX: "visible",
            }}
        >
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
                            borderRadius: "999px",
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                            "& .MuiToggleButtonGroup-grouped": {
                                border: "0 !important",
                                px: 1.8,
                                py: 0.65,
                                minWidth: 104,
                                textTransform: "uppercase",
                                letterSpacing: "0.02em",
                                fontWeight: 600,
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
                                    backgroundColor: "primary.main",
                                    color: "primary.contrastText",
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "primary.dark",
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
                                onChange={(event) => {
                                    setControls((previous) => ({
                                        ...previous,
                                        showExperience: event.target.checked,
                                    }));
                                }}
                            />
                        }
                        label={<Typography noWrap variant="body1">{t("cv.showExperience")}</Typography>}
                        sx={{ ml: 0.2, mr: 0.2, flexShrink: 0 }}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={controls.showProjects}
                                onChange={(event) => {
                                    setControls((previous) => ({
                                        ...previous,
                                        showProjects: event.target.checked,
                                    }));
                                }}
                            />
                        }
                        label={<Typography noWrap variant="body1">{t("cv.showProjects")}</Typography>}
                        sx={{ ml: 0.2, mr: 0.2, flexShrink: 0 }}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={controls.showCertifications}
                                onChange={(event) => {
                                    setControls((previous) => ({
                                        ...previous,
                                        showCertifications: event.target.checked,
                                    }));
                                }}
                            />
                        }
                        label={<Typography noWrap variant="body1">{t("cv.showCertifications")}</Typography>}
                        sx={{ ml: 0.2, mr: 0.2, flexShrink: 0 }}
                    />
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    alignItems={{ sm: "center", lg: "center" }}
                    sx={{ flexWrap: { lg: "nowrap" }, minWidth: 0, ml: { lg: "auto" }, flex: { lg: "0 0 auto" } }}
                >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "nowrap", minWidth: 0 }}>
                        <Button
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
                                            borderRadius: "999px",
                                            border: "1px solid rgba(255,255,255,0.55)",
                                            color: "rgba(255,255,255,0.92)",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "help",
                                            "&:focus-visible": {
                                                outline: "2px solid",
                                                outlineColor: "rgba(255,255,255,0.95)",
                                                outlineOffset: 2,
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
                        </Button>
                        <Button
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
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}
