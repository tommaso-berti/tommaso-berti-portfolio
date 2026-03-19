import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { Link as RouterLink } from "react-router-dom";
import { FEATURED_CERTIFICATIONS } from "../../features/certifications/certifications.data.js";
import { formatIssuedAt } from "../../features/certifications/certifications.utils.js";
import { getCertificationIconDefinitions } from "../../features/certifications/certificationIcons.js";

export default function Home() {
    const { t } = useTranslation("pages.home");
    const hero = t("hero", { returnObjects: true });
    const heroParagraphs = Array.isArray(hero) ? hero : [];
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
            transform: "translateY(-4px)",
            boxShadow: 6,
            borderColor: "text.secondary",
            backgroundColor: "action.hover",
            cursor: "pointer",
        },
    };
    const certificationActionButtonSx = {
        ...outlinedActionButtonSx,
        width: "50%",
        minWidth: 0,
        justifyContent: "center",
        alignSelf: "flex-start",
    };

    return (
        <Stack
            component="article"
            spacing={{ xs: 3, md: 4 }}
            sx={{
                minHeight: {
                    xs: "calc(100dvh - 15.4rem)",
                    md: "calc(100dvh - 17.1rem)",
                },
                justifyContent: "center",
            }}
        >
            <Stack
                component="section"
                direction={{ xs: "column", md: "row" }}
                gap={{ xs: 2.5, md: 3 }}
                alignItems={{ xs: "stretch", md: "center" }}
            >
                <Stack sx={{ flex: 1, minWidth: 0 }} gap={1.25}>
                    <Typography color="text.primary" variant="h5">
                        {t("welcome")}
                    </Typography>
                    <Typography color="text.primary" variant="h2" fontWeight="bold">
                        Tommaso Berti
                    </Typography>
                    <Typography color="text.secondary" variant="h6" sx={{ mt: 0.25 }}>
                        {`Software Developer ${t("and")} Delivery Expert`}
                    </Typography>
                    <Stack direction="row" sx={{ pt: 1 }} spacing={1.1} flexWrap="wrap">
                        <Button
                            component={RouterLink}
                            to="/projects"
                            variant="contained"
                            sx={{
                                transition: "0.25s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            {t("primaryCta")}
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/contact"
                            variant="outlined"
                            sx={{
                                ...outlinedActionButtonSx,
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                    borderColor: "text.secondary",
                                    backgroundColor: "action.hover",
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {t("contactCta")}
                        </Button>
                    </Stack>
                    {heroParagraphs.map((paragraph, index) => (
                        <Typography key={index} variant="body1" sx={{ lineHeight: 1.75 }}>
                            {paragraph}
                        </Typography>
                    ))}
                </Stack>

                <Paper
                    component="aside"
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        maxWidth: { xs: "100%", md: 420 },
                        p: { xs: 2, md: 2.3 },
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.4,
                    }}
                >
                    <Typography variant="h5">{t("certifications.title")}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("certifications.subtitle")}
                    </Typography>

                    <Stack spacing={1.2}>
                        {FEATURED_CERTIFICATIONS.map((cert) => {
                            const iconDefinitions = getCertificationIconDefinitions(cert);

                            return (
                                <Paper
                                    key={cert.id}
                                    variant="outlined"
                                    sx={{
                                        p: 1.3,
                                        borderRadius: 2,
                                        backgroundColor: "background.paper",
                                        borderColor: "divider",
                                        position: "relative",
                                    }}
                                >
                                    <Stack spacing={0.8}>
                                        <Box
                                            aria-hidden="true"
                                            sx={{
                                                position: "absolute",
                                                top: 10,
                                                right: 10,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 0.6,
                                            }}
                                        >
                                            {iconDefinitions.map((iconDefinition, index) => {
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
                                                    >
                                                        <TopicIcon size={15} color={iconDefinition.color} />
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 700, lineHeight: 1.35, pr: 3.8 }}
                                        >
                                            {cert.title}
                                        </Typography>
                                        <Stack direction="row" spacing={0.8} flexWrap="wrap">
                                            <Chip label={cert.platform} size="small" variant="outlined" />
                                            <Chip
                                                label={t(`certifications.areas.${cert.areaKey}`, { defaultValue: cert.area })}
                                                size="small"
                                            />
                                            <Chip
                                                label={t(`certifications.status.${cert.status}`, { defaultValue: cert.status })}
                                                size="small"
                                                color={cert.status === "completed" ? "success" : "default"}
                                                variant={cert.status === "completed" ? "filled" : "outlined"}
                                            />
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary">
                                            {`${t("certifications.issuedAt")}: ${formatIssuedAt(cert.issuedAt)}`}
                                        </Typography>
                                        <Button
                                            component="a"
                                            href={cert.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            variant="outlined"
                                            sx={certificationActionButtonSx}
                                        >
                                            {t("certifications.verifyCta")}
                                        </Button>
                                    </Stack>
                                </Paper>
                            );
                        })}
                    </Stack>

                    <Box sx={{ pt: 0.4 }}>
                        <Button
                            component={RouterLink}
                            to="/about#certifications"
                            variant="outlined"
                            sx={outlinedActionButtonSx}
                        >
                            {t("certifications.viewAllCta")}
                        </Button>
                    </Box>
                </Paper>
            </Stack>
        </Stack>
    );
}
