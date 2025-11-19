import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import StorageIcon from "@mui/icons-material/Storage";

import {
    CustomBashIcon,
    CustomCssIcon,
    CustomGitIcon,
    CustomHtmlIcon,
    CustomJavascriptIcon,
    CustomjQueryIcon,
    CustomMongoDbIcon,
    CustomMuiIcon,
    CustomReactIcon,
    CustomReduxIcon,
    CustomNodeIcon,
    CustomGPTIcon,
    CustomVSCIcon,
    CustomWebstormIcon,
    CustomTailwindIcon,
    CustomNextJsIcon,
    CustomPostmanIcon
} from "../../icons/customIcons/index.js";

export default function TechSkills() {
    const { t } = useTranslation();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: "left",
        color: (theme.vars ?? theme).palette.text.secondary,
        ...theme.applyStyles("dark", {
            backgroundColor: "#1A2027",
        }),
    }));

    const Skill = ({ icon, label }) => (
        <Item sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {icon}
            <Typography variant="subtitle1">{label}</Typography>
        </Item>
    );

    return (
        <Stack
            id="tech-skills"
            spacing={4}
            component="section"
            sx={{ marginTop: "3rem", width: "100%" }}
        >
            <Typography variant="h3">Tech Skills</Typography>

            <Typography variant="h5">Frontend</Typography>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomHtmlIcon sx={{ fontSize: 40, color: "#e34c26" }} />}
                        label="HTML"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomCssIcon sx={{ fontSize: 40, color: "#264de4" }} />}
                        label="CSS"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomTailwindIcon style={{ width: 40, height: 40 }} />}
                        label="Tailwind"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomMuiIcon sx={{ fontSize: 40, color: "#007fff" }} />}
                        label="MUI"
                    />
                </Grid>
            </Grid>

            <Typography variant="h5">Backend</Typography>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomJavascriptIcon sx={{ fontSize: 40, color: "#f7df1e" }} />}
                        label="JavaScript"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomNodeIcon style={{ width: 40, height: 40 }} />}
                        label="Node.js"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomNextJsIcon style={{ width: 40, height: 40 }} />}
                        label="Next.js"
                    />
                </Grid>
            </Grid>

            <Typography variant="h5">Database</Typography>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomMongoDbIcon style={{ width: 40, height: 40 }} />}
                        label="MongoDB"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<StorageIcon sx={{ fontSize: 40, color: "#00758f" }} />}
                        label="SQL"
                    />
                </Grid>
            </Grid>

            <Typography variant="h5">Tools</Typography>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomPostmanIcon style={{ width: 40, height: 40 }} />}
                        label="Postman"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomWebstormIcon style={{ width: 40, height: 40 }} />}
                        label="WebStorm"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomVSCIcon style={{ width: 40, height: 40 }} />}
                        label="VS Code"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill
                        icon={<CustomGPTIcon style={{ width: 40, height: 40 }} />}
                        label="ChatGPT"
                    />
                </Grid>
            </Grid>
        </Stack>
    );
}
