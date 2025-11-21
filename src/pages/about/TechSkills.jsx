import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import StorageIcon from "@mui/icons-material/Storage";
import GitHubIcon from "@mui/icons-material/GitHub";
import { cloneElement } from "react";

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

    const ICON_SIZE = 22;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1.5),
        textAlign: "left",
        color: (theme.vars ?? theme).palette.text.secondary,
        ...theme.applyStyles("dark", {
            backgroundColor: "#1A2027",
        }),
    }));

    const IconWrapper = ({ children }) => (
        <div
            style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {children}
        </div>
    );

    const Skill = ({ icon, label }) => (
        <Item sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconWrapper>
                {cloneElement(icon, {
                    sx: { ...(icon.props.sx || {}), fontSize: ICON_SIZE }
                })}
            </IconWrapper>
            <Typography variant="subtitle1">{label}</Typography>
        </Item>
    );

    return (
        <Stack
            id="tech-skills"
            spacing={2.5}
            component="section"
            sx={{ marginTop: "3rem", width: "100%" }}
        >
            <Typography variant="h3">Tech Skills</Typography>

            <Typography variant="h5">Frontend</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomHtmlIcon sx={{ color: "#e34c26" }} />} label="HTML" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomCssIcon sx={{ color: "#264de4" }} />} label="CSS" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomTailwindIcon />} label="Tailwind" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomMuiIcon sx={{ color: "#007fff" }} />} label="MUI" />
                </Grid>
            </Grid>

            <Typography variant="h5">Backend</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomJavascriptIcon />} label="JavaScript" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomReactIcon />} label="React" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomReduxIcon />} label="Redux" />
                </Grid>
                {/*
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomNodeIcon />} label="Node.js" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomNextJsIcon />} label="Next.js" />
                </Grid>
                */}
            </Grid>

            <Typography variant="h5">Database</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomMongoDbIcon />} label="MongoDB" />
                </Grid>
                {/*
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<StorageIcon sx={{ color: "#00758f" }} />} label="SQL" />
                </Grid>
                */}
            </Grid>

            <Typography variant="h5">Tools</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomGitIcon />} label="Git" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<GitHubIcon />} label="GitHub" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomPostmanIcon />} label="Postman" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomWebstormIcon />} label="WebStorm" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomVSCIcon />} label="VS Code" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomGPTIcon />} label="ChatGPT" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skill icon={<CustomBashIcon />} label="Bash" />
                </Grid>
            </Grid>
        </Stack>
    );
}
