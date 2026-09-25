import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/features/mission-ui/SectionHeader.jsx";
import SpaceButton from "@/features/mission-ui/SpaceButton.jsx";
import MissionSectionHeading from "@/features/mission-ui/MissionSectionHeading.jsx";
import MissionSurface from "@/features/mission-ui/MissionSurface.jsx";
import SystemsAiWorkflow from "./SystemsAiWorkflow.jsx";
import SystemsInfrastructure from "./SystemsInfrastructure.jsx";

function SummaryStrip({ t }) {
    const items = t("summary.items", { returnObjects: true });
    return <MissionSurface sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" } }}>
        {items.map((item, index) => <Box key={item.label} sx={{ p: 1.75, borderLeft: { xs: 0, sm: index ? "1px solid" : 0 }, borderTop: { xs: index ? "1px solid" : 0, sm: 0 }, borderColor: "divider", minWidth: 0 }}>
            <Typography variant="overline" sx={{ color: "text.secondary", fontFamily: (theme) => theme.fonts.mono }}>{item.label}</Typography>
            <Typography variant="body2" sx={{ mt: .5, fontWeight: 700 }}>{item.value}</Typography>
        </Box>)}
    </MissionSurface>;
}

export default function Systems() {
    const { t } = useTranslation("pages", { keyPrefix: "systems" });
    const tools = t("environment.items", { returnObjects: true });

    return <Stack component="article" spacing={{ xs: 3, md: 4 }}>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} note={t("note")} systemId="DEVELOPMENT SYSTEM / SYS-05" />
        <Stack spacing={2} sx={{ maxWidth: 900 }}>
            <Typography component="p" color="text.secondary" sx={{ fontSize: { md: "1.1rem" }, lineHeight: 1.75 }}>{t("intro.lead")}</Typography>
            <Stack direction="row" gap={.75} flexWrap="wrap">{t("intro.tags", { returnObjects: true }).map((tag) => <Chip key={tag} label={tag} size="small" variant="outlined" />)}</Stack>
        </Stack>
        <SummaryStrip t={t} />

        <Box component="section" data-scroll-section data-scroll-label={`SYS-01 // ${t("sectionLabels.ai")}`}>
            <MissionSectionHeading code="SYS-01" label={t("sectionLabels.ai")} title={t("ai.title")} note={t("ai.note")} />
            <SystemsAiWorkflow t={t} />
        </Box>

        <Box component="section" data-scroll-section data-scroll-label={`SYS-02 // ${t("sectionLabels.infrastructure")}`}>
            <MissionSectionHeading code="SYS-02" label={t("sectionLabels.infrastructure")} title={t("infrastructure.title")} note={t("infrastructure.note")} />
            <SystemsInfrastructure t={t} />
        </Box>

        <Box component="section" data-scroll-section data-scroll-label={`SYS-03 // ${t("sectionLabels.boundary")}`}>
            <MissionSectionHeading code="SYS-03" label={t("sectionLabels.boundary")} title={t("boundary.title")} note={t("boundary.note")} />
            <MissionSurface sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
                {t("boundary.environments", { returnObjects: true }).map((environment, index) => <Box key={environment.title} sx={{ p: { xs: 2, sm: 2.5 }, borderLeft: { xs: 0, md: index ? "1px solid" : 0 }, borderTop: { xs: index ? "1px solid" : 0, md: 0 }, borderColor: "divider", minWidth: 0 }}>
                    <Typography variant="overline" sx={{ color: index ? "space.blue" : "space.orange", fontFamily: (theme) => theme.fonts.mono }}>{environment.label}</Typography>
                    <Typography component="h3" variant="h5" sx={{ mt: .5 }}>{environment.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: .75, minHeight: { md: 58 } }}>{environment.description}</Typography>
                    <Stack spacing={0} sx={{ mt: 1.5 }}>{environment.items.map((item) => <Typography key={item} variant="overline" sx={{ py: .8, borderBottom: "1px solid", borderColor: "divider", fontFamily: (theme) => theme.fonts.mono, "&:last-child": { borderBottom: 0 } }}>{item}</Typography>)}</Stack>
                </Box>)}
            </MissionSurface>
            <Box sx={{ mt: 1.25, p: 1.75, borderLeft: "3px solid", borderColor: "space.orange", bgcolor: "background.default" }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{t("boundary.policy.title")}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>{t("boundary.policy.description")}</Typography>
            </Box>
        </Box>

        <Box component="section" data-scroll-section data-scroll-label={`SYS-04 // ${t("sectionLabels.environment")}`}>
            <MissionSectionHeading code="SYS-04" label={t("sectionLabels.environment")} title={t("environment.title")} note={t("environment.note")} />
            <MissionSurface sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, minmax(0, 1fr))" } }}>
                {tools.map((item, index) => <Box key={item.label} sx={{ p: { xs: 1.5, sm: 2 }, minHeight: 132, position: "relative", borderLeft: { xs: index % 2 ? "1px solid" : 0, md: index ? "1px solid" : 0 }, borderTop: { xs: index > 1 ? "1px solid" : 0, md: 0 }, borderColor: "divider" }}>
                    <Typography variant="overline" sx={{ color: "text.secondary", fontFamily: (theme) => theme.fonts.mono }}>{item.label}</Typography>
                    <Typography sx={{ mt: .75, fontWeight: 700, letterSpacing: "-.02em" }}>{item.value}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: .5 }}>{item.detail}</Typography>
                    <Typography aria-hidden="true" sx={{ position: "absolute", right: 8, bottom: 0, color: "action.disabled", fontSize: "1.8rem", fontFamily: (theme) => theme.fonts.mono, fontWeight: 800 }}>{`0${index + 1}`}</Typography>
                </Box>)}
            </MissionSurface>
        </Box>

        <Box component="section" data-scroll-section data-scroll-label={`SYS-05 // ${t("sectionLabels.links")}`}>
            <MissionSectionHeading code="SYS-05" label={t("sectionLabels.links")} title={t("links.title")} note={t("links.note")} />
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={2} sx={{ p: { xs: 2, sm: 2.5 }, border: "1px solid", borderColor: "divider", bgcolor: "space.panel" }}>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 560 }}>{t("links.description")}</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                    <SpaceButton component={RouterLink} to="/services" variant="outlined">{t("links.services")} →</SpaceButton>
                    <SpaceButton component={RouterLink} to="/about#method" variant="outlined">{t("links.method")} →</SpaceButton>
                    <SpaceButton component={RouterLink} to="/contact">{t("links.contact")} →</SpaceButton>
                </Stack>
            </Stack>
        </Box>
    </Stack>;
}
