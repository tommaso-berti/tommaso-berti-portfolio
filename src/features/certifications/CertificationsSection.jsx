import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { CERTIFICATIONS } from "./certifications.data.js";
import { formatIssuedAt } from "./certifications.utils.js";
import { getCertificationIconDefinitions } from "./certificationIcons.js";
import TechnicalLabel from "@/features/mission-ui/TechnicalLabel.jsx";

const MAX_VISIBLE_CERT_ICONS = 4;
const FILTER_KEYS = ["all", "fullstack", "frontend", "javascript", "tooling-workflow", "database"];
const ACCENTS = ["space.red", "space.orange", "space.green", "space.yellow"];
const TECH_ACCENT_TOKENS = { html: "space.orange", css: "space.blue", javascript: "space.yellow", react: "space.blue", nodejs: "space.green", redux: "space.orange", git: "space.red", github: "text.primary", bash: "space.orange", express: "text.primary", postgresql: "space.blue", sql: "space.green", yaml: "space.yellow", postman: "space.red" };
const tooltipSlotProps = { tooltip: { sx: { maxWidth: 260, p: 1.2, borderRadius: "0 0 6px 6px", border: "1px solid", borderTop: "3px solid", borderColor: "divider", borderTopColor: (theme) => theme.space.blue, backgroundColor: "background.paper", color: "text.primary", boxShadow: "0 10px 22px rgba(23,32,42,.13)", fontSize: ".75rem" } }, arrow: { sx: { color: "background.paper" } } };

function CertificationTechnologies({ cert, t }) {
    const iconDefinitions = getCertificationIconDefinitions(cert);
    const visibleIcons = iconDefinitions.slice(0, MAX_VISIBLE_CERT_ICONS);
    const hiddenCount = Math.max(iconDefinitions.length - MAX_VISIBLE_CERT_ICONS, 0);
    return <Stack direction="row" gap={.65} flexWrap="wrap" sx={{ minHeight: 24 }}>
        {visibleIcons.map((icon, index) => <Chip key={`${cert.id}-${icon.id}-${index}`} label={icon.title || icon.id} size="small" variant="outlined" sx={{ borderRadius: 1.1, borderColor: TECH_ACCENT_TOKENS[icon.id] || "space.blue", "& .MuiChip-label": { color: "text.primary" } }} />)}
        {hiddenCount > 0 ? <Tooltip arrow placement="top" slotProps={tooltipSlotProps} title={<Stack spacing={.55}>{iconDefinitions.map((icon, index) => { const Icon = icon.component; return <Stack key={`${cert.id}-tooltip-${icon.id}-${index}`} direction="row" spacing={.7} alignItems="center"><Icon size={14} color={icon.color} /><Typography variant="caption">{icon.title || icon.id}</Typography></Stack>; })}</Stack>}><ButtonBase aria-label={t("moreTechAria", { count: hiddenCount, title: cert.title })} sx={{ minWidth: 42, height: 24, minHeight: 24, px: .8, display: "inline-flex", alignItems: "center", lineHeight: 1, border: "1px solid", borderColor: "divider", borderRadius: 1.1, fontFamily: (theme) => theme.fonts.mono, fontSize: ".65rem", fontWeight: 800, color: "text.secondary" }}>{`+${hiddenCount}`}</ButtonBase></Tooltip> : null}
    </Stack>;
}

function CertificationCard({ cert, index, t }) {
    const metadata = [
        { label: t("track"), value: t(`areas.${cert.areaKey}`, { defaultValue: cert.areaKey }) },
        { label: t("platform"), value: cert.platform },
        { label: t("issuedAt"), value: formatIssuedAt(cert.issuedAt) },
        { label: t("statusLabel"), value: t(`status.${cert.status}`, { defaultValue: cert.status }) },
    ];
    return <Paper component="article" variant="outlined" sx={{ position: "relative", display: "flex", height: "100%", p: { xs: 1.8, md: 2 }, borderRadius: 2.5, overflow: "hidden", backgroundColor: "rgba(255,255,255,.18)", transition: "transform 260ms cubic-bezier(.2,.8,.2,1), box-shadow 260ms ease, border-color 260ms ease", "&::before": { content: '""', position: "absolute", right: -28, top: -28, width: 122, height: 122, border: "1px solid", borderColor: "rgba(52,124,178,.2)", borderRadius: "50%" }, "&::after": { content: '""', position: "absolute", right: 10, top: 22, width: 52, height: 52, border: "1px dashed", borderColor: "rgba(52,124,178,.22)", borderRadius: "50%" }, "&:hover": { transform: "translateY(-4px)", boxShadow: "0 18px 42px rgba(18,32,45,.08)", borderColor: "space.blue" } }}>
        <Stack spacing={1.1} sx={{ flex: 1, position: "relative", zIndex: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1}><TechnicalLabel sx={{ fontSize: ".54rem" }}>{`CREDENTIAL / C-${String(index + 14).padStart(3, "0")}`}</TechnicalLabel><TechnicalLabel color="space.green" sx={{ fontSize: ".54rem", whiteSpace: "nowrap" }}><Box component="span" sx={{ display: "inline-block", width: 6, height: 6, mr: .55, borderRadius: "50%", bgcolor: "currentColor", boxShadow: "0 0 10px currentColor" }} />{t("verified")}</TechnicalLabel></Stack>
            <Typography component="h3" variant="h6" sx={{ maxWidth: "88%", minHeight: { xs: "4.15rem", md: "4.6rem" }, fontWeight: 800, fontSize: { xs: "1.18rem", md: "1.3rem" }, lineHeight: 1.18, letterSpacing: "-0.028em" }}>{cert.title}</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: .75 }}>{metadata.map((item) => <Box key={item.label} sx={{ minHeight: 56, p: .95, border: "1px solid", borderColor: "divider", borderRadius: 1.5, backgroundColor: "rgba(255,255,255,.12)" }}><Typography sx={{ mb: .5, color: "text.secondary", fontFamily: (theme) => theme.fonts.mono, fontSize: ".51rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>{item.label}</Typography><Typography sx={{ fontSize: ".78rem", fontWeight: 700, lineHeight: 1.25 }}>{item.value}</Typography></Box>)}</Box>
            <CertificationTechnologies cert={cert} t={t} />
            <Stack direction="row" gap={.8} alignItems="center" sx={{ mt: "auto" }}><Button component="a" href={cert.url} target="_blank" rel="noreferrer" variant="outlined" sx={{ flex: 1, minWidth: 0, height: 44, borderRadius: 1.5, fontFamily: (theme) => theme.fonts.mono, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>{t("verifyCta")}</Button><Box aria-hidden="true" sx={{ width: 44, height: 44, display: "grid", placeItems: "center", border: "1px solid", borderColor: "divider", borderRadius: "50%", fontSize: "1.1rem" }}>↗</Box></Stack>
        </Stack>
    </Paper>;
}

function CertificationGrid({ certifications, t }) {
    return <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, alignItems: "stretch" }}>{certifications.map((cert) => <CertificationCard key={cert.id} cert={cert} index={CERTIFICATIONS.indexOf(cert)} t={t} />)}</Box>;
}

export default function CertificationsSection({ embedded = false }) {
    const { t } = useTranslation("pages", { keyPrefix: "about.certifications" });
    const [activeFilter, setActiveFilter] = useState("all");
    const filteredCertifications = useMemo(() => activeFilter === "all" ? CERTIFICATIONS : CERTIFICATIONS.filter((cert) => cert.areaKey === activeFilter), [activeFilter]);
    const certificationGroups = useMemo(() => {
        if (activeFilter !== "all") return [{ key: activeFilter, certifications: filteredCertifications }];
        return filteredCertifications.reduce((groups, cert) => {
            const group = groups.find((item) => item.key === cert.areaKey);
            if (group) group.certifications.push(cert);
            else groups.push({ key: cert.areaKey, certifications: [cert] });
            return groups;
        }, []);
    }, [activeFilter, filteredCertifications]);
    const completedCount = CERTIFICATIONS.filter((cert) => cert.status === "completed").length;
    const latestCertification = CERTIFICATIONS[0];
    const summary = [
        { label: t("archiveStatus"), value: `${t("online")} / ${t("verified")}` },
        { label: t("credentials"), value: `${CERTIFICATIONS.length} ${t("activeEntries")}` },
        { label: t("completed"), value: `${completedCount} / ${CERTIFICATIONS.length}` },
        { label: t("latestIssue"), value: formatIssuedAt(latestCertification?.issuedAt) },
    ];

    return <Stack id="certifications" data-scroll-section data-scroll-label={t("archiveEyebrow")} spacing={2.2} component="section" sx={{ marginTop: embedded ? 0 : "3rem", width: "100%", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}>
        {!embedded ? <Paper variant="outlined" sx={{ position: "relative", p: { xs: 2, md: 3 }, overflow: "hidden", background: "radial-gradient(circle at 84% 20%, rgba(52,124,178,.12), transparent 25%), linear-gradient(rgba(23,32,42,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(23,32,42,.025) 1px, transparent 1px), rgba(255,255,255,.12)", backgroundSize: "auto, 34px 34px, 34px 34px, auto", "&::after": { content: '""', position: "absolute", width: 170, height: 170, right: -55, bottom: -90, border: "1px dashed", borderColor: "rgba(52,124,178,.3)", borderRadius: "50%" } }}><TechnicalLabel>{t("archiveEyebrow")}</TechnicalLabel><Typography component="h2" variant="h3" sx={{ mt: .8 }}>{t("title")}</Typography><Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>{t("subtitle")}</Typography></Paper> : null}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }, gap: 1.1 }}>{summary.map((item, index) => <Box key={item.label} sx={{ position: "relative", p: 1.35, border: "1px solid", borderColor: "divider", borderRadius: 1.8, overflow: "hidden", "&::before": { content: '""', position: "absolute", inset: "0 auto auto 0", width: "100%", height: 3, bgcolor: ACCENTS[index] } }}><TechnicalLabel sx={{ fontSize: ".5rem" }}>{item.label}</TechnicalLabel><Typography sx={{ mt: .45, fontSize: { xs: ".78rem", md: ".92rem" }, fontWeight: 750 }}>{item.value}</Typography></Box>)}</Box>
        <Paper variant="outlined" sx={{ p: { xs: 1.2, md: 1.5 }, backgroundColor: "rgba(255,255,255,.1)" }}><Stack direction={{ xs: "column", md: "row" }} spacing={1.2} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }}><Box><TechnicalLabel>{t("filterLabel")}</TechnicalLabel><Typography variant="body2" color="text.secondary" sx={{ mt: .35 }}>{t("filterCount", { count: filteredCertifications.length, total: CERTIFICATIONS.length })}</Typography></Box><Stack direction="row" gap={.6} flexWrap="wrap" role="group" aria-label={t("filterLabel")}>{FILTER_KEYS.map((filterKey) => <Button key={filterKey} size="small" variant={activeFilter === filterKey ? "contained" : "outlined"} aria-pressed={activeFilter === filterKey} onClick={() => setActiveFilter(filterKey)} sx={{ minHeight: 32, px: 1, fontSize: ".58rem", borderRadius: 1.2 }}>{filterKey === "all" ? t("filterAll") : t(`areas.${filterKey}`)}</Button>)}</Stack></Stack></Paper>
        {activeFilter === "all" ? certificationGroups.map((group) => <Stack key={group.key} spacing={1.1}><Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ borderBottom: "1px solid", borderColor: "divider", pb: .7 }}><TechnicalLabel>{`${t("sectionLabel")} / ${t(`areas.${group.key}`, { defaultValue: group.key })}`}</TechnicalLabel><Typography variant="body2" color="text.secondary">{group.certifications.length}</Typography></Stack><CertificationGrid certifications={group.certifications} t={t} /></Stack>) : <CertificationGrid certifications={filteredCertifications} t={t} />}
    </Stack>;
}
