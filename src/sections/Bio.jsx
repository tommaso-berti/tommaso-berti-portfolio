import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import profilePic from "../assets/images/profilepicture.jpeg";
import { useTranslation } from "../hooks/useTranslation.js";

export default function Bio() {
    const { t } = useTranslation();
    return (
        <Stack
            direction="row"
            id="bio"
            spacing={4}
            alignItems="flex-start"
            component="section"
        >
            <Stack sx={{flex: 1}} spacing={4}>
                <Typography variant="h3">
                    {t('pages.about.bio')}
                </Typography>
                <Typography variant="body1">
                    I’m Tommaso Berti, 22, passionate about technology and always eager to learn. I enjoy tackling challenges, discovering solutions, and continuously expanding my skills. Working in teams and collaborating efficiently drives me to achieve great results.
                </Typography>
            </Stack>
            <Stack
                component="aside"
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    component="img"
                    src={profilePic}
                    alt="Profile picture"
                    sx={{
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        objectFit: "cover"
                    }}
                />
            </Stack>
        </Stack>
    )
}