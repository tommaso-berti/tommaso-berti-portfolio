import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { Link as RouterLink } from "react-router-dom";
import { CERTIFICATIONS, FEATURED_CERTIFICATIONS } from "@/features/certifications/certifications.data.js";
import { formatIssuedAt } from "@/features/certifications/certifications.utils.js";
import { getCertificationIconDefinitions } from "@/features/certifications/certificationIcons.js";
import SpaceButton from "@/features/mission-ui/SpaceButton.jsx";
import { outlinedActionButtonSx } from "./homeHero.styles.js";

const MAX_VISIBLE_CERT_ICONS = 6;
const CERTIFICATION_ACCENTS = { fullstack: "space.blue", frontend: "space.orange", javascript: "space.yellow" };

const CERT_TECH_TOOLTIP_SLOT_PROPS = {
    tooltip: {
        sx: {
            maxWidth: 260, p: 1.2, borderRadius: "0 0 6px 6px", border: "1px solid", borderTop: "3px solid", borderColor: "divider", borderTopColor: (theme) => theme.space.blue,
            backgroundColor: "background.paper", color: "text.primary", boxShadow: "0 10px 22px rgba(23,32,42,.13)", fontSize: ".75rem", lineHeight: 1.45,
            "& .MuiTypography-caption": { color: "text.secondary", lineHeight: 1.35 },
        },
    },
    arrow: { sx: { color: "background.paper", "&::before": { border: "1px solid", borderColor: "divider", boxSizing: "border-box" } } },
};

const ARCHIVE_AREA_COLORS = ["space.blue", "space.orange", "space.yellow", "space.green", "space.red", "space.purple", "text.secondary"];

function ArchiveMap({ t }) {
    const areaCounts = Object.entries(CERTIFICATIONS.reduce((counts, cert) => {
        counts[cert.areaKey] = (counts[cert.areaKey] || 0) + 1;
        return counts;
    }, {})).sort(([, first], [, second]) => second - first);
    const nodes = areaCounts.map(([area, count], index) => {
        const angle = (-90 + (360 / areaCounts.length) * index) * Math.PI / 180;
        return { area, count, x: 100 + Math.cos(angle) * 62, y: 91 + Math.sin(angle) * 48, color: ARCHIVE_AREA_COLORS[index % ARCHIVE_AREA_COLORS.length] };
    });
    const maxCount = Math.max(...areaCounts.map(([, count]) => count));

    return (
        <Box component="figure" aria-label={t("certifications.archiveMapDescription")} sx={{ m: 0, p: { xs: 1.5, md: 1.8 }, border: "1px solid", borderColor: "divider", borderRadius: .5, backgroundColor: "rgba(255,255,255,.12)" }}>
            <Stack direction="row" justifyContent="space-between" gap={1} sx={{ mb: 1 }}>
                <Typography sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: ".57rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase" }}>{t("certifications.archiveMap")}</Typography>
                <Typography sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: ".57rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>{t("certifications.archiveDistribution")}</Typography>
            </Stack>
            <Box component="svg" viewBox="0 0 200 182" role="img" aria-label={t("certifications.archiveMapDescription")} sx={{ display: "block", width: "100%", height: { xs: 150, md: 170 } }}>
                {[30, 52, 76].map((radius, index) => <circle key={radius} cx="100" cy="91" r={radius} fill="none" stroke="currentColor" strokeOpacity={index === 2 ? ".16" : ".22"} strokeDasharray={index === 2 ? "2 3" : undefined} />)}
                {nodes.map((node) => <line key={`line-${node.area}`} x1="100" y1="91" x2={node.x} y2={node.y} stroke="currentColor" strokeOpacity=".18" />)}
                <circle cx="100" cy="91" r="19" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeOpacity=".22" />
                <text x="100" y="88" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="monospace" fontWeight="700">{CERTIFICATIONS.length}</text>
                <text x="100" y="99" textAnchor="middle" fill="currentColor" opacity=".7" fontSize="5" fontFamily="monospace">{t("certifications.credentials").toUpperCase()}</text>
                {nodes.map((node) => <g key={node.area}>
                    <Box component="circle" cx={node.x} cy={node.y} r={5 + (node.count / maxCount) * 4} fill="currentColor" fillOpacity=".9" sx={{ color: node.color }} />
                    <text x={node.x} y={node.y + 2} textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" fontWeight="700">{node.count}</text>
                </g>)}
            </Box>
            <Box component="figcaption" sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: .65, mt: .5 }}>
                {nodes.map((node) => <Stack key={node.area} direction="row" alignItems="center" gap={.7} sx={{ minWidth: 0 }}>
                    <Box aria-hidden="true" sx={{ flexShrink: 0, width: 7, height: 7, borderRadius: "50%", bgcolor: node.color }} />
                    <Typography noWrap sx={{ minWidth: 0, color: "text.secondary", fontSize: ".65rem" }}>{t(`certifications.areas.${node.area}`, { defaultValue: node.area })}</Typography>
                    <Box component="span" aria-label={t("certifications.credentialsCount", { count: node.count })} sx={{ ml: "auto", flexShrink: 0, width: 19, height: 19, display: "grid", placeItems: "center", borderRadius: "50%", bgcolor: node.color, color: "common.white", fontFamily: "monospace", fontSize: ".58rem", fontWeight: 800, lineHeight: 1 }}>{node.count}</Box>
                </Stack>)}
            </Box>
        </Box>
    );
}

function CertificationCard({ cert, t }) {
    const iconDefinitions = getCertificationIconDefinitions(cert);
    const visibleIconDefinitions = iconDefinitions.slice(0, MAX_VISIBLE_CERT_ICONS);
    const hiddenIconsCount = Math.max(iconDefinitions.length - MAX_VISIBLE_CERT_ICONS, 0);
    const accent = CERTIFICATION_ACCENTS[cert.areaKey] || "space.blue";
    const credentialNumber = String(FEATURED_CERTIFICATIONS.indexOf(cert) + 14).padStart(3, "0");
    const metadata = [
        { label: t("certifications.track"), value: t(`certifications.areas.${cert.areaKey}`, { defaultValue: cert.area }) },
        { label: t("certifications.platform"), value: cert.platform },
        { label: t("certifications.issuedAt"), value: formatIssuedAt(cert.issuedAt) },
        { label: t("certifications.statusLabel"), value: t(`certifications.status.${cert.status}`, { defaultValue: cert.status }) },
    ];

    return (
        <Paper component="article" variant="outlined" sx={{ position: "relative", display: "flex", height: "100%", minHeight: { xs: 390, md: 430 }, p: { xs: 2, md: 2.3 }, borderRadius: .5, overflow: "hidden", backgroundColor: "rgba(255,255,255,.18)", transition: "transform 260ms cubic-bezier(.2,.8,.2,1), box-shadow 260ms ease, border-color 260ms ease", "&::before": { content: '""', position: "absolute", right: -28, top: -28, width: 122, height: 122, border: "1px solid", borderColor: "rgba(52,124,178,.2)", borderRadius: "50%" }, "&::after": { content: '""', position: "absolute", right: 10, top: 22, width: 52, height: 52, border: "1px dashed", borderColor: "rgba(52,124,178,.22)", borderRadius: "50%" }, "&:hover": { transform: "translateY(-5px)", boxShadow: "0 18px 42px rgba(18,32,45,.08)", borderColor: accent } }}>
            <Stack spacing={1.35} sx={{ flex: 1, position: "relative", zIndex: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1}>
                    <Typography sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: ".58rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase" }}>{`credential / c-${credentialNumber}`}</Typography>
                    <Typography sx={{ display: "flex", alignItems: "center", gap: .7, color: "space.green", fontFamily: "monospace", fontSize: ".58rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}><Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "currentColor", boxShadow: "0 0 12px currentColor" }} />{t("certifications.verified")}</Typography>
                </Stack>
                <Typography variant="h6" sx={{ maxWidth: "86%", minHeight: { xs: "4.62rem", md: "5.1rem" }, fontWeight: 800, fontSize: { xs: "1.28rem", md: "1.42rem" }, lineHeight: 1.2, letterSpacing: "-0.028em" }}>{cert.title}</Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: .8 }}>{metadata.map((item) => <Box key={item.label} sx={{ minHeight: 58, p: 1, border: "1px solid", borderColor: "divider", borderRadius: .5, backgroundColor: "rgba(255,255,255,.12)" }}><Typography sx={{ mb: .55, color: "text.secondary", fontFamily: "monospace", fontSize: ".54rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" }}>{item.label}</Typography><Typography sx={{ fontSize: ".82rem", fontWeight: 700, lineHeight: 1.25 }}>{item.value}</Typography></Box>)}</Box>
                <Stack direction="row" gap={.7} flexWrap="wrap" sx={{ minHeight: 56 }}>
                    {visibleIconDefinitions.map((iconDefinition, index) => <Chip key={`${cert.id}-${iconDefinition.id}-${index}`} label={iconDefinition.title || iconDefinition.id} size="small" variant="outlined" sx={{ borderRadius: 1.1, "& .MuiChip-label": { color: iconDefinition.color } }} />)}
                    {hiddenIconsCount > 0 ? <Tooltip arrow placement="top" slotProps={CERT_TECH_TOOLTIP_SLOT_PROPS} title={<Stack spacing={.6} sx={{ py: .25 }}>{iconDefinitions.map((iconDefinition, index) => { const TopicIcon = iconDefinition.component; return <Stack key={`${cert.id}-tooltip-${iconDefinition.id}-${index}`} direction="row" spacing={.7} alignItems="center"><TopicIcon size={14} color={iconDefinition.color} /><Typography variant="caption">{iconDefinition.title || iconDefinition.id}</Typography></Stack>; })}</Stack>}><ButtonBase aria-label={t("certifications.moreTechAria", { count: hiddenIconsCount, title: cert.title })} sx={{ minWidth: 42, height: 24, minHeight: 24, px: .8, display: "inline-flex", alignItems: "center", lineHeight: 1, border: "1px solid", borderColor: "divider", borderRadius: 1.1, fontFamily: "monospace", fontSize: ".65rem", fontWeight: 800, color: "text.secondary" }}>{`+${hiddenIconsCount}`}</ButtonBase></Tooltip> : null}
                </Stack>
                <Stack direction="row" gap={1} alignItems="center" sx={{ mt: "auto" }}>
                    <SpaceButton component="a" href={cert.url} target="_blank" rel="noreferrer" variant="outlined" barColor="space.blue" sx={{ ...outlinedActionButtonSx, flex: 1, minWidth: 0, height: 46, borderRadius: .5, fontFamily: "monospace", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>{t("certifications.openCredential")}</SpaceButton>
                    <Box aria-hidden="true" sx={{ width: 46, height: 46, display: "grid", placeItems: "center", border: "1px solid", borderColor: "divider", borderRadius: "50%", fontSize: "1.15rem", transition: "transform 220ms ease", "&:hover": { transform: "rotate(-30deg)" } }}>↗</Box>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default function HomeCertificationBadges() {
    const { t } = useTranslation("pages", { keyPrefix: "home" });
    const latestCertification = CERTIFICATIONS[0];
    const statusAccents = ["space.red", "space.orange", "space.yellow", "space.blue"];
    const statusItems = [
        { label: t("certifications.archiveStatus"), value: `${t("certifications.online")} / ${t("certifications.verified")}` },
        { label: t("certifications.credentials"), value: `${CERTIFICATIONS.length} ${t("certifications.activeEntries")}` },
        { label: t("certifications.latestIssue"), value: latestCertification?.issuedAt?.replace("-", " / ") },
        { label: t("certifications.specialization"), value: t("certifications.areas.fullstack") },
    ];

    return (
        <Paper component="section" aria-labelledby="home-certifications-title" sx={{ width: "100%", p: { xs: 1.5, md: 2.5 }, borderRadius: .5, background: "linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.02))" }}>
            <Stack spacing={{ xs: 2, md: 2.4 }}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.65fr) minmax(300px, .95fr)" }, gap: 1.8 }}>
                    <Box sx={{ position: "relative", p: { xs: 2, md: 3 }, minHeight: 230, display: "flex", flexDirection: "column", border: "1px solid", borderColor: "divider", borderRadius: .5, overflow: "hidden", background: "radial-gradient(circle at 87% 18%, rgba(120,130,140,.1), transparent 22%), rgba(255,255,255,.12)" }}>
                        <Typography sx={{ mb: 1.5, color: "text.secondary", fontFamily: "monospace", fontSize: ".6rem", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" }}>{t("certifications.eyebrow")}</Typography>
                        <Typography id="home-certifications-title" variant="h3" sx={{ maxWidth: 780, fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)", lineHeight: 1.03 }}>{t("certifications.title")}</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mt: 1.5 }}>{t("certifications.subtitle")}</Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(4, minmax(0, 1fr))" }, gap: .7, mt: "auto", pt: 2 }}>{statusItems.map((item, index) => <Box key={item.label} sx={{ position: "relative", minWidth: 0, px: 1, py: .75, border: "1px solid", borderColor: "divider", borderRadius: .5, overflow: "hidden", backgroundColor: "rgba(255,255,255,.12)", "&::after": { content: '""', position: "absolute", inset: "0 auto auto 0", width: "100%", height: 2, bgcolor: statusAccents[index], opacity: .9 } }}><Typography noWrap sx={{ mb: .3, color: "text.secondary", fontFamily: "monospace", fontSize: ".53rem", fontWeight: 800, letterSpacing: ".09em", textTransform: "uppercase" }}>{item.label}</Typography><Typography noWrap sx={{ fontSize: { xs: ".75rem", md: ".84rem" }, fontWeight: 750 }}>{item.value}</Typography></Box>)}</Box>
                    </Box>
                    <ArchiveMap t={t} />
                </Box>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={1.5}><Typography variant="h5" sx={{ fontSize: "1.25rem", fontWeight: 800 }}>{t("certifications.primaryNodes")}</Typography><Stack direction="row" gap={.8} flexWrap="wrap"><Chip label={t("certifications.featuredView")} size="small" variant="outlined" sx={{ borderRadius: 99 }} /><Chip label={t("certifications.latestSort")} size="small" variant="outlined" sx={{ borderRadius: 99 }} /></Stack></Stack>
                <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" } }}>{FEATURED_CERTIFICATIONS.map((cert) => <CertificationCard key={cert.id} cert={cert} t={t} />)}</Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, p: { xs: 1.8, md: 2.2 }, border: "1px solid", borderColor: "divider", borderRadius: .5, backgroundColor: "rgba(255,255,255,.12)" }}><Box><Typography sx={{ mb: .6, fontSize: "1.05rem", fontWeight: 800 }}>{t("certifications.archiveTitle")}</Typography><Typography variant="body2" color="text.secondary">{t("certifications.archiveDescription")}</Typography></Box><SpaceButton component={RouterLink} to="/about#certifications" variant="outlined" barColor="space.blue" sx={{ ...outlinedActionButtonSx, flexShrink: 0, minHeight: 46, borderRadius: .5, fontFamily: "monospace", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>{t("certifications.viewAllCta")}</SpaceButton></Box>
            </Stack>
        </Paper>
    );
}
