import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useTranslation } from "../../hooks/useTranslation.js";
import { CERTIFICATIONS } from "./certifications.data.js";
import { formatIssuedAt, groupCertificationsByArea } from "./certifications.utils.js";
import { getCertificationIconDefinitions } from "./certificationIcons.js";
import Tooltip from "@mui/material/Tooltip";
import ButtonBase from "@mui/material/ButtonBase";

const MAX_VISIBLE_CERT_ICONS = 6;
const CERT_TECH_TOOLTIP_SLOT_PROPS = {
    tooltip: {
        sx: {
            maxWidth: 260,
            p: 1.2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            color: "text.primary",
            boxShadow: 3,
            backgroundImage: (theme) =>
                theme.palette.mode === "dark"
                    ? "linear-gradient(160deg, rgba(125,196,172,0.12), rgba(20,32,28,0.94) 62%)"
                    : "linear-gradient(160deg, rgba(47,122,98,0.11), rgba(248,251,249,0.96) 62%)",
            backdropFilter: "blur(6px)",
            "& .MuiTypography-caption": {
                color: "text.secondary",
                lineHeight: 1.35,
            },
        },
    },
    arrow: {
        sx: {
            color: "background.paper",
            "&::before": {
                border: "1px solid",
                borderColor: "divider",
                boxSizing: "border-box",
            },
        },
    },
};

export default function CertificationsSection() {
    const { t } = useTranslation("pages.about.certifications");
    const groups = groupCertificationsByArea(CERTIFICATIONS);

    const outlinedActionButtonSx = {
        transition: "0.25s",
        whiteSpace: "nowrap",
        borderWidth: 1,
        borderColor: "divider",
        color: "text.primary",
        backgroundColor: "background.paper",
        cursor: "pointer",
        textTransform: "none",
        "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: 3,
            borderColor: "text.secondary",
            backgroundColor: "action.hover",
            cursor: "pointer",
        },
    };

    const certificationActionButtonSx = {
        ...outlinedActionButtonSx,
        width: "fit-content",
        minWidth: 132,
        justifyContent: "center",
        alignSelf: "flex-start",
        py: 0.45,
        px: 1.5,
    };

    return (
        <Stack id="certifications" spacing={2.2} component="section" sx={{ marginTop: "3rem", width: "100%", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}>
            <Typography variant="h3">{t("title")}</Typography>
            <Typography variant="body1" color="text.secondary">
                {t("subtitle")}
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    width: "100%",
                    gap: 2,
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, minmax(0, 1fr))",
                        md: "repeat(4, minmax(0, 1fr))",
                    },
                }}
            >
                {groups.map(([areaKey, certifications]) => (
                    <Box
                        key={areaKey}
                        sx={{
                            minWidth: 0,
                            width: "100%",
                            gridColumn: { xs: "auto", md: "span 4" },
                        }}
                    >
                        <Paper
                            sx={{
                                p: { xs: 1.8, md: 2.1 },
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.4,
                                minWidth: 0,
                            }}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography
                                    variant="h5"
                                    sx={{
                                        whiteSpace: "normal",
                                        overflowWrap: "anywhere",
                                        pr: 1,
                                    }}
                                >
                                    {t(`areas.${areaKey}`, { defaultValue: areaKey })}
                                </Typography>
                                <Chip label={certifications.length} size="small" variant="outlined" />
                            </Stack>

                            <Box
                                sx={{
                                    display: "grid",
                                    gap: 1.1,
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        md: "repeat(4, minmax(0, 1fr))",
                                    },
                                }}
                            >
                                {certifications.map((cert) => {
                                    const iconDefinitions = getCertificationIconDefinitions(cert);
                                    const visibleIconDefinitions = iconDefinitions.slice(0, MAX_VISIBLE_CERT_ICONS);
                                    const hiddenIconsCount = Math.max(iconDefinitions.length - MAX_VISIBLE_CERT_ICONS, 0);
                                    const useTwoIconColumns = iconDefinitions.length > 4;

                                    return (
                                        <Paper
                                            key={cert.id}
                                            variant="outlined"
                                            sx={{
                                                p: 1.3,
                                                borderRadius: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 0.9,
                                                gridColumn: "span 1",
                                                position: "relative",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 10,
                                                    right: 10,
                                                    display: "grid",
                                                    gridTemplateColumns: useTwoIconColumns ? "repeat(2, 22px)" : "22px",
                                                    gap: 0.6,
                                                }}
                                            >
                                                {visibleIconDefinitions.map((iconDefinition, index) => {
                                                    const TopicIcon = iconDefinition.component;
                                                    return (
                                                        <Box
                                                            key={`${cert.id}-${iconDefinition.id}-${index}`}
                                                            sx={{
                                                                width: 22,
                                                                height: 22,
                                                                borderRadius: 1.5,
                                                                border: "1px solid rgba(148, 163, 184, 0.25)",
                                                                backgroundColor: "#fff",
                                                                boxShadow: "0 1px 2px rgba(15, 23, 42, 0.08)",
                                                                display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                        aria-hidden="true"
                                                    >
                                                        <TopicIcon size={15} color={iconDefinition.color} />
                                                    </Box>
                                                );
                                            })}
                                                {hiddenIconsCount > 0 ? (
                                                    <Tooltip
                                                        arrow
                                                        placement="left"
                                                        slotProps={CERT_TECH_TOOLTIP_SLOT_PROPS}
                                                        title={
                                                            <Stack spacing={0.6} sx={{ py: 0.25 }}>
                                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                                                    {t("moreTechTooltip")}
                                                                </Typography>
                                                                {iconDefinitions.map((iconDefinition, index) => {
                                                                    const TopicIcon = iconDefinition.component;
                                                                    return (
                                                                        <Stack
                                                                            key={`${cert.id}-tooltip-${iconDefinition.id}-${index}`}
                                                                            direction="row"
                                                                            spacing={0.7}
                                                                            alignItems="center"
                                                                        >
                                                                            <TopicIcon size={14} color={iconDefinition.color} />
                                                                            <Typography variant="caption">
                                                                                {iconDefinition.title || iconDefinition.id}
                                                                            </Typography>
                                                                        </Stack>
                                                                    );
                                                                })}
                                                            </Stack>
                                                        }
                                                    >
                                                        <ButtonBase
                                                            aria-label={t("moreTechAria", {
                                                                values: { count: hiddenIconsCount, title: cert.title },
                                                            })}
                                                            sx={{
                                                                width: 22,
                                                                height: 22,
                                                                borderRadius: 1.5,
                                                                border: "1px solid",
                                                                borderColor: "divider",
                                                                backgroundColor: "background.paper",
                                                                fontSize: "0.67rem",
                                                                fontWeight: 700,
                                                                color: "text.secondary",
                                                            }}
                                                        >
                                                            {`+${hiddenIconsCount}`}
                                                        </ButtonBase>
                                                    </Tooltip>
                                                ) : null}
                                            </Box>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 700,
                                                    lineHeight: 1.34,
                                                    whiteSpace: "normal",
                                                    overflowWrap: "anywhere",
                                                    pr: useTwoIconColumns ? 6.5 : 3.8,
                                                }}
                                            >
                                                {cert.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {cert.platform}
                                            </Typography>
                                            <Stack direction="row" spacing={0.8} flexWrap="wrap">
                                                <Chip
                                                    label={t(`status.${cert.status}`, { defaultValue: cert.status })}
                                                    size="small"
                                                    color={cert.status === "completed" ? "success" : "default"}
                                                    variant={cert.status === "completed" ? "filled" : "outlined"}
                                                />
                                            </Stack>
                                            <Typography variant="caption" color="text.secondary">
                                                {`${t("issuedAt")}: ${formatIssuedAt(cert.issuedAt)}`}
                                            </Typography>
                                            <Button
                                                component="a"
                                                href={cert.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                variant="outlined"
                                                sx={certificationActionButtonSx}
                                            >
                                                {t("verifyCta")}
                                            </Button>
                                        </Paper>
                                    );
                                })}
                            </Box>
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Stack>
    );
}
