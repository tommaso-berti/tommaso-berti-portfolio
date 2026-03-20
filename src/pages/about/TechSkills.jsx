import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { getBrandIconDefinition } from "../../config/brandIcons.js";
import { SKILL_GROUPS } from "../../features/skills/skillGroups.js";

const ICON_SIZE = 22;

const SkillItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    textAlign: "left",
    color: (theme.vars ?? theme).palette.text.secondary,
    transition: "0.25s",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: theme.shadows[6],
    },
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

function IconWrapper({ children }) {
    return (
        <div
            style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                borderRadius: "6px",
                border: "1px solid rgba(148, 163, 184, 0.25)",
            }}
        >
            {children}
        </div>
    );
}

function SkillCard({ label, iconId }) {
    const iconDefinition = getBrandIconDefinition(iconId);
    const IconComponent = iconDefinition.component;

    return (
        <SkillItem sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconWrapper>
                <IconComponent size={ICON_SIZE} color={iconDefinition.color} title={iconDefinition.title || label} />
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
            sx={{ marginTop: "3rem", width: "100%", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}
        >
            <Typography variant="h3">{t("title")}</Typography>

            {SKILL_GROUPS.map((group) => (
                <Stack key={group.titleKey} spacing={2}>
                    <Typography variant="h5">{t(group.titleKey)}</Typography>
                    <Grid container spacing={2}>
                        {group.skills.map((skill) => (
                            <Grid key={skill.label} item xs={12} sm={6} md={3}>
                                <SkillCard label={skill.label} iconId={skill.iconId} />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            ))}
        </Stack>
    );
}
