import { Box, Stack, Typography } from "@mui/material";
import Bio from "./Bio.jsx";
import Experience from "./Experience.jsx";
import Hobbies from "./Hobbies.jsx";
import TechSkills from "./TechSkills.jsx";
import CertificationsSection from "../../features/certifications/CertificationsSection.jsx";
import MotionPanel from "../../features/mission-ui/MotionPanel.jsx";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";
import ProjectMissionTabs from "../projects/projectsPages/ProjectMissionTabs.jsx";
import MethodModule from "./MethodModule.jsx";

const moduleOrder = ["identity", "technical", "certifications", "development", "method", "beyond"];
const moduleAccentOverrides = {
    identity: "space.blue", technical: "space.red", certifications: "space.orange",
    development: "space.yellow", method: "space.blue", beyond: "space.red",
};

function AboutModuleHeader({ eyebrow, title, lead }) {
    return <Box>
        <TechnicalLabel>{eyebrow}</TechnicalLabel>
        <Typography component="h2" variant="h3" sx={{ mt: 1 }}>{title}</Typography>
        {lead ? <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>{lead}</Typography> : null}
    </Box>;
}

function IdentityModule({ t, telemetry }) {
    const systems = t("personnel.systems", { returnObjects: true });

    return (
        <Stack spacing={4}>
            <Bio embedded systems={systems} telemetry={telemetry} />
        </Stack>
    );
}

function TechnicalModule({ t }) {
    return <Stack spacing={3}>
        <AboutModuleHeader eyebrow={t("personnel.moduleEyebrows.technical")} title={t("tech-skills.title")} lead={t("tech-skills.lead")} />
        <TechSkills embedded />
    </Stack>;
}

function CertificationsModule({ t }) {
    return <Stack spacing={3}>
        <AboutModuleHeader eyebrow={t("personnel.moduleEyebrows.certifications")} title={t("certifications.title")} lead={t("certifications.subtitle")} />
        <CertificationsSection embedded />
    </Stack>;
}

function ModuleContent({ activeModule, t, telemetry }) {
    if (activeModule === "technical") return <TechnicalModule t={t} />;
    if (activeModule === "certifications") return <CertificationsModule t={t} />;
    if (activeModule === "method") return <Stack spacing={3}><AboutModuleHeader eyebrow={t("personnel.moduleEyebrows.method")} title={t("personnel.methodTitle")} /><MethodModule t={t} /></Stack>;
    if (activeModule === "development") return <Stack spacing={3}><AboutModuleHeader eyebrow={t("personnel.moduleEyebrows.development")} title={t("experience.title")} /><Experience embedded /></Stack>;
    if (activeModule === "beyond") return <Stack spacing={3}><AboutModuleHeader eyebrow={t("personnel.moduleEyebrows.beyond")} title={t("hobbies.title")} /><Hobbies embedded /></Stack>;
    return <Stack spacing={3}><AboutModuleHeader eyebrow={t("personnel.moduleEyebrows.identity")} title={t("personnel.identityTitle")} lead={t("personnel.identityLead")} /><IdentityModule t={t} telemetry={telemetry} /></Stack>;
}

export default function AboutModuleTabs({ activeModule, onChange, t, telemetry = [] }) {
    return (
        <Stack component="section" spacing={2.5} aria-label={t("personnel.modulesLabel")}>
            <ProjectMissionTabs modules={moduleOrder} active={activeModule} onChange={onChange} t={t} labelPrefix="personnel.modules" ariaLabel={t("personnel.modulesLabel")} accentOverrides={moduleAccentOverrides} />
            <MotionPanel key={activeModule} component="div" sx={{ p: { xs: 2, sm: 3 } }}>
                <ModuleContent activeModule={activeModule} t={t} telemetry={telemetry} />
            </MotionPanel>
        </Stack>
    );
}
