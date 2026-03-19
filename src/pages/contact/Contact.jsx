import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

import { useTranslation } from "../../hooks/useTranslation.js";

export default function Contact() {
    const { t } = useTranslation("pages.contact");
    const secondaryActions = [
        {
            id: "linkedin",
            href: "https://www.linkedin.com/in/tommasoberti/",
            title: t("linkedinCta"),
            description: t("linkedinDescription"),
            icon: LinkedInIcon,
            external: true,
        },
        {
            id: "resume",
            href: "/Curriculum_Tommaso_Berti.pdf",
            title: t("resumeCta"),
            description: t("resumeDescription"),
            icon: DescriptionIcon,
            external: true,
        },
    ];

    const socialLinks = [
        {
            id: "github",
            href: "https://github.com/tommaso-berti",
            icon: GitHubIcon,
            label: "GitHub",
        },
        {
            id: "linkedin",
            href: "https://www.linkedin.com/in/tommasoberti/",
            icon: LinkedInIcon,
            label: "LinkedIn",
        },
        {
            id: "email",
            href: "mailto:tommaso.berti.15@gmail.com?subject=Contatto%20portfolio",
            icon: EmailIcon,
            label: "Email",
        },
        {
            id: "resume",
            href: "/Curriculum_Tommaso_Berti.pdf",
            icon: DescriptionIcon,
            label: "PDF",
        },
    ];

    return (
        <Stack component="article" spacing={{ xs: 3.5, md: 4.2 }} sx={{ width: "100%" }}>
            <Paper
                component="section"
                variant="outlined"
                sx={{
                    p: { xs: 2.2, md: 3.2 },
                    borderRadius: 3,
                    display: "grid",
                    gap: { xs: 2.3, md: 2.8 },
                }}
            >
                <Stack spacing={1.1}>
                    <Typography
                        variant="subtitle2"
                        color="secondary.main"
                        sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
                    >
                        {t("eyebrow")}
                    </Typography>
                    <Typography variant="h3">{t("title")}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
                        {t("subtitle")}
                    </Typography>
                </Stack>

                <Stack spacing={1.1} alignItems={{ xs: "stretch", sm: "flex-start" }}>
                    <Button
                        component="a"
                        href="mailto:tommaso.berti.15@gmail.com?subject=Contatto%20portfolio"
                        variant="contained"
                        size="large"
                        startIcon={<EmailOutlinedIcon />}
                        sx={{
                            transition: "0.25s",
                            textTransform: "none",
                            px: { xs: 2.4, sm: 3 },
                            py: 1.15,
                            fontWeight: 700,
                            fontSize: "0.98rem",
                            boxShadow: 4,
                            width: { xs: "100%", sm: "auto" },
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 6,
                            },
                        }}
                    >
                        {t("emailCta")}
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                        {t("emailHelper")}
                    </Typography>
                </Stack>
            </Paper>

            <Box
                component="section"
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                    gap: 1.2,
                }}
            >
                {secondaryActions.map((action) => {
                    const ActionIcon = action.icon;
                    return (
                        <Paper
                            key={action.id}
                            component="a"
                            href={action.href}
                            target={action.external ? "_blank" : undefined}
                            rel={action.external ? "noreferrer" : undefined}
                            aria-label={action.title}
                            variant="outlined"
                            sx={{
                                p: { xs: 1.55, md: 1.75 },
                                borderRadius: 2.6,
                                textDecoration: "none",
                                color: "inherit",
                                display: "grid",
                                gridTemplateColumns: "auto 1fr auto",
                                alignItems: "center",
                                gap: 1.15,
                                transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    borderColor: "text.secondary",
                                    boxShadow: 4,
                                },
                                "&:focus-visible": {
                                    outline: "2px solid",
                                    outlineColor: "secondary.main",
                                    outlineOffset: 2,
                                },
                            }}
                        >
                            <Box
                                aria-hidden="true"
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    display: "grid",
                                    placeItems: "center",
                                    backgroundColor: "background.paper",
                                }}
                            >
                                <ActionIcon fontSize="small" />
                            </Box>
                            <Stack spacing={0.15} sx={{ minWidth: 0 }}>
                                <Typography variant="subtitle2" color="text.primary">
                                    {action.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {action.description}
                                </Typography>
                            </Stack>
                            <NorthEastRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                        </Paper>
                    );
                })}
            </Box>

            <Paper
                component="section"
                variant="outlined"
                sx={{
                    p: { xs: 1.4, md: 1.65 },
                    borderRadius: 2.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1.2,
                    flexWrap: "wrap",
                }}
            >
                <Stack spacing={0.2}>
                    <Typography variant="subtitle2">{t("socialTitle")}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("responseTime")}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={0.45}>
                    {socialLinks.map((social) => {
                        const SocialIcon = social.icon;
                        return (
                            <Tooltip key={social.id} title={social.label}>
                                <IconButton
                                    aria-label={social.label}
                                    component="a"
                                    href={social.href}
                                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                                    rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                                >
                                    <SocialIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        );
                    })}
                </Stack>
            </Paper>
        </Stack>
    );
}
