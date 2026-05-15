import { Box, Link, Stack, Typography } from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import profilePicture from "../../../assets/images/profilepicture.jpeg";
import { contactMetaSx } from "../cv.styles.js";

/**
 * @param {{ profile: import("../cv.data.js").CvProfile }} props
 */
export default function CvHeaderSection({ profile }) {
    return (
        <Stack data-cv-section spacing={1.1}>
            <Box
                data-cv-hero-grid
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
                    gap: { xs: 1.2, md: 2.2 },
                    alignItems: "start",
                }}
            >
                <Stack spacing={1.1}>
                    <Typography variant="h3" sx={{ lineHeight: 1.1 }}>
                        {profile.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
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

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.6, sm: 1.5 }} useFlexGap>
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
                    sx={{
                        justifySelf: { xs: "flex-start", md: "end" },
                        alignSelf: "start",
                    }}
                >
                    <Box
                        data-cv-photo
                        component="img"
                        src={profilePicture}
                        alt="Tommaso Berti profile"
                        sx={{
                            width: { xs: 80, sm: 88, md: 112 },
                            height: { xs: 80, sm: 88, md: 112 },
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: 1,
                        }}
                    />
                </Box>
            </Box>
        </Stack>
    );
}
