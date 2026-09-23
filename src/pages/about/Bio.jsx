import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { SKILL_GROUPS } from "../../features/skills/skillGroups.js";
import { getCvProfile } from "../cv/cv.data.js";
import PersonnelCredential from "./PersonnelCredential.jsx";

const CREDENTIAL_STACK = ["react", "mui", "nodejs", "express"];

function getCredentialStack() {
    const skills = SKILL_GROUPS.flatMap((group) => group.skills);
    return CREDENTIAL_STACK.map((iconId) => skills.find((skill) => skill.iconId === iconId)?.label || iconId);
}

export default function Bio({ embedded = false, systems = [], telemetry = [] }) {
    const { t, i18n } = useTranslation("pages", { keyPrefix: "about.bio" });
    const language = i18n.language?.toLowerCase().startsWith("it") ? "it" : "en";
    const profile = getCvProfile(language);

    return (
        <Stack
            id="bio"
            data-scroll-section
            data-scroll-label={t("credential.moduleLabel")}
            spacing={{ xs: 2.5, md: 3.5 }}
            component="section"
            sx={{ scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}
        >
            <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1.5, md: 4 }} alignItems={{ md: "flex-end" }} justifyContent="space-between">
                <Stack spacing={1.2} sx={{ maxWidth: 760 }}>
                    <Typography component={embedded ? "h3" : "h2"} variant={embedded ? "h4" : "h3"}>{t("title")}</Typography>
                </Stack>
                <Typography color="text.secondary" sx={{ fontFamily: "monospace", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", flexShrink: 0 }}>{t("credential.moduleLabel")}</Typography>
            </Stack>
            <PersonnelCredential profile={profile} stack={getCredentialStack()} systems={systems} telemetry={telemetry} bioDescription={t("description")} t={t} />
        </Stack>
    );
}
