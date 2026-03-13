import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";

import {
    CustomBashIcon,
    CustomCssIcon,
    CustomGitIcon,
    CustomGPTIcon,
    CustomHtmlIcon,
    CustomJavascriptIcon,
    CustomMongoDbIcon,
    CustomMuiIcon,
    CustomPostmanIcon,
    CustomReactIcon,
    CustomReduxIcon,
    CustomTailwindIcon,
    CustomVSCIcon,
    CustomWebstormIcon,
} from "../../assets/icons/customIcons/index.js";

const ICON_SIZE = 22;

const SkillItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    textAlign: "left",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

const SKILL_GROUPS = [
    {
        titleKey: "frontend",
        skills: [
            { label: "HTML", Icon: CustomHtmlIcon, iconSx: { color: "#e34c26" } },
            { label: "CSS", Icon: CustomCssIcon, iconSx: { color: "#264de4" } },
            { label: "Tailwind", Icon: CustomTailwindIcon },
            { label: "MUI", Icon: CustomMuiIcon, iconSx: { color: "#007fff" } },
        ],
    },
    {
        titleKey: "backend",
        skills: [
            { label: "JavaScript", Icon: CustomJavascriptIcon },
            { label: "React", Icon: CustomReactIcon },
            { label: "Redux", Icon: CustomReduxIcon },
        ],
    },
    {
        titleKey: "database",
        skills: [{ label: "MongoDB", Icon: CustomMongoDbIcon }],
    },
    {
        titleKey: "tools",
        skills: [
            { label: "Git", Icon: CustomGitIcon },
            { label: "GitHub", Icon: GitHubIcon },
            { label: "Postman", Icon: CustomPostmanIcon },
            { label: "WebStorm", Icon: CustomWebstormIcon },
            { label: "VS Code", Icon: CustomVSCIcon },
            { label: "ChatGPT", Icon: CustomGPTIcon },
            { label: "Bash", Icon: CustomBashIcon },
        ],
    },
];

function IconWrapper({ children }) {
    return (
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
}

function SkillCard({ label, Icon, iconSx }) {
    return (
        <SkillItem sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconWrapper>
                <Icon sx={{ fontSize: ICON_SIZE, ...(iconSx || {}) }} />
            </IconWrapper>
            <Typography variant="subtitle1">{label}</Typography>
        </SkillItem>
    );
}

export default function TechSkills() {
    const { t } = useTranslation("pages.about.tech-skills");

    return (
        <Stack
            id="tech-skills"
            spacing={2.5}
            component="section"
            sx={{ marginTop: "3rem", width: "100%" }}
        >
            <Typography variant="h3">{t("title")}</Typography>

            {SKILL_GROUPS.map((group) => (
                <Stack key={group.titleKey} spacing={2}>
                    <Typography variant="h5">{t(group.titleKey)}</Typography>
                    <Grid container spacing={2}>
                        {group.skills.map((skill) => (
                            <Grid key={skill.label} item xs={12} sm={6} md={3}>
                                <SkillCard label={skill.label} Icon={skill.Icon} iconSx={skill.iconSx} />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            ))}
        </Stack>
    );
}
