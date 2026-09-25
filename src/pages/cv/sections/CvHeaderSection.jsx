import { Box, Link, Stack, Typography } from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ProfileImage from "../../../features/ProfileImage.jsx";
import { contactMetaSx, cvSectionSx } from "../cv.styles.js";

/**
 * @param {{ profile: import("../cv.data.js").CvProfile }} props
 */
export default function CvHeaderSection({ profile, profileImageAlt }) {
    return (
        <Stack data-cv-section spacing={1.1} sx={cvSectionSx}>
            <Box
                data-cv-hero-grid
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "minmax(0, 1fr) auto", md: "minmax(0, 1fr) auto" },
                    gap: { xs: 1.2, md: 2.2 },
                    alignItems: "start",
                }}
            >
                <Stack spacing={1.1}>
                    <Typography component="h1" variant="h2" sx={{ fontSize: "clamp(1.9rem, 3vw, 2.75rem)", lineHeight: 0.98 }}>
                        {profile.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                        {profile.role}
                    </Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.4} useFlexGap flexWrap="wrap">
                        <Stack direction="row" spacing={0.8} alignItems="center">
                            <EmailOutlinedIcon fontSize="small" />
                            <Link
                                data-cv-link
                                href={`mailto:${profile.email}`}
                                underline="hover"
                                color="inherit"
                                sx={contactMetaSx}
                            >
                                {profile.email}
                            </Link>
                        </Stack>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                            <PhoneOutlinedIcon fontSize="small" />
                            <Link
                                data-cv-link
                                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                                underline="hover"
                                color="inherit"
                                sx={contactMetaSx}
                            >
                                {profile.phone}
                            </Link>
                        </Stack>
                        <Link
                            data-cv-link
                            component="span"
                            underline="none"
                            color="inherit"
                            sx={contactMetaSx}
                        >
                            {profile.location}
                        </Link>
                    </Stack>

                    <Stack data-cv-social-links direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.6, sm: 1.5 }} useFlexGap>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                            <LanguageRoundedIcon fontSize="small" />
                            <Link data-cv-link data-cv-social-link href={profile.websiteUrl} target="_blank" rel="noreferrer" color="inherit">
                                {profile.websiteLabel}
                            </Link>
                        </Stack>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                            <LinkedInIcon fontSize="small" />
                            <Link data-cv-link data-cv-social-link href={profile.linkedinUrl} target="_blank" rel="noreferrer" color="inherit">
                                {profile.linkedinLabel}
                            </Link>
                        </Stack>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                            <GitHubIcon fontSize="small" />
                            <Link data-cv-link data-cv-social-link href={profile.githubUrl} target="_blank" rel="noreferrer" color="inherit">
                                {profile.githubLabel}
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>

                <Box
                    sx={{ justifySelf: { xs: "end", md: "end" }, alignSelf: "start" }}
                >
                    <Box
                        data-cv-photo
                        sx={{
                            position: "relative",
                            display: "grid",
                            placeItems: "center",
                            justifyItems: "center",
                            width: { xs: 94, sm: 110, md: 144 },
                            height: { xs: 94, sm: 110, md: 144 },
                            borderRadius: "50%",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                inset: 0,
                                border: "1px dashed",
                                borderColor: "space.blue",
                                borderRadius: "50%",
                                opacity: 0.65,
                                transform: "rotate(12deg) scaleX(1.04)",
                                pointerEvents: "none",
                            },
                        }}
                    >
                        <ProfileImage
                            alt={profileImageAlt}
                            width={112}
                            height={112}
                            sx={{
                                width: { xs: 72, sm: 82, md: 110 },
                                height: { xs: 72, sm: 82, md: 110 },
                                mx: "auto",
                                borderRadius: "50%",
                                overflow: "hidden",
                                "& img": {
                                    objectPosition: "center center",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Stack>
    );
}
