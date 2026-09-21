import { Box, Button, Stack, Typography } from "@mui/material";
import Bio from "./Bio.jsx";
import Experience from "./Experience.jsx";
import Hobbies from "./Hobbies.jsx";
import TechSkills from "./TechSkills.jsx";
import CertificationsSection from "../../features/certifications/CertificationsSection.jsx";
import MotionPanel from "../../features/mission-ui/MotionPanel.jsx";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";

const moduleOrder = ["identity", "method", "development", "beyond"];

function MethodModule({ t }) {
    const principles = t("personnel.principles", { returnObjects: true });

    return (
        <Stack spacing={3}>
            <Box>
                <TechnicalLabel>{t("personnel.modules.method")}</TechnicalLabel>
                <Typography component="h2" variant="h3" sx={{ mt: 1 }}>{t("personnel.methodTitle")}</Typography>
            </Box>
            <Stack spacing={1.25}>
                {principles.map((principle) => (
                    <Box key={principle.code} sx={{ borderLeft: "3px solid", borderColor: "space.blue", pl: 2, py: 0.5 }}>
                        <TechnicalLabel color="space.blue">{principle.code}</TechnicalLabel>
                        <Typography component="h3" variant="h6" sx={{ mt: 0.5 }}>{principle.title}</Typography>
                        <Typography color="text.secondary">{principle.body}</Typography>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}

function IdentityModule({ t }) {
    const systems = t("personnel.systems", { returnObjects: true });

    return (
        <Stack spacing={4}>
            <Box>
                <TechnicalLabel>{t("personnel.modules.identity")}</TechnicalLabel>
                <Typography component="h2" variant="h3" sx={{ mt: 1 }}>{t("personnel.identityTitle")}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>{t("personnel.identityLead")}</Typography>
            </Box>
            <Stack spacing={1}>
                {systems.map((system) => (
                    <Box key={system.label} sx={{ borderBottom: "1px solid", borderColor: "divider", display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "space-between", py: 1 }}>
                        <TechnicalLabel>{system.label}</TechnicalLabel>
                        <Typography sx={{ fontFamily: "monospace", fontSize: "0.78rem" }}>{system.value}</Typography>
                    </Box>
                ))}
            </Stack>
            <Bio embedded />
            <TechSkills embedded />
            <CertificationsSection />
        </Stack>
    );
}

function ModuleContent({ activeModule, t }) {
    if (activeModule === "method") return <MethodModule t={t} />;
    if (activeModule === "development") return <Experience embedded />;
    if (activeModule === "beyond") return <Hobbies embedded />;
    return <IdentityModule t={t} />;
}

export default function AboutModuleTabs({ activeModule, onChange, t }) {
    return (
        <Stack component="section" spacing={2.5} aria-label={t("personnel.modulesLabel")}>
            <Stack direction="row" flexWrap="wrap" gap={1} role="toolbar" aria-label={t("personnel.modulesLabel")}>
                {moduleOrder.map((module, index) => {
                    const selected = activeModule === module;
                    return (
                        <Button aria-pressed={selected} key={module} onClick={() => onChange(module)} size="small"
                            sx={{ border: "1px solid", borderColor: selected ? "space.blue" : "divider", color: selected ? "space.blue" : "text.primary", minHeight: 44, px: 1.5 }}
                            variant={selected ? "contained" : "text"}>
                            {String(index + 1).padStart(2, "0")}{" // "}{t(`personnel.modules.${module}`)}
                        </Button>
                    );
                })}
            </Stack>
            <MotionPanel key={activeModule} component="div" sx={{ p: { xs: 2, sm: 3 } }}>
                <ModuleContent activeModule={activeModule} t={t} />
            </MotionPanel>
        </Stack>
    );
}
