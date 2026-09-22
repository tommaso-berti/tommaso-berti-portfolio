import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { Link as RouterLink } from "react-router-dom";
import { CERTIFICATIONS, FEATURED_CERTIFICATIONS } from "@/features/certifications/certifications.data.js";
import { formatIssuedAt } from "@/features/certifications/certifications.utils.js";
import { getCertificationIconDefinitions } from "@/features/certifications/certificationIcons.js";
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

function ArchiveMap({ t }) {
    const points = [{ left: "31%", top: "31%" }, { left: "75%", top: "43%" }, { left: "45%", top: "73%" }];
    return (
        <Box aria-hidden="true" sx={{ position: "relative", minHeight: { xs: 190, md: 230 }, border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden", backgroundColor: "rgba(255,255,255,.16)", backgroundImage: "radial-gradient(circle at center, rgba(120,130,140,.1), transparent 55%)" }}>
            <Typography sx={{ position: "absolute", top: 14, left: 14, fontFamily: "monospace", fontSize: ".57rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", color: "text.secondary" }}>{t("certifications.archiveMap")}</Typography>
            <Typography sx={{ position: "absolute", top: 14, right: 14, fontFamily: "monospace", fontSize: ".57rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", color: "text.secondary" }}>{t("certifications.verifiedNodes")}</Typography>
            {[72, 128, 184].map((size, index) => <Box key={size} sx={{ position: "absolute", width: size, height: size, left: "50%", top: "50%", transform: "translate(-50%, -50%)", border: "1px solid", borderColor: "rgba(120,130,140,.28)", borderStyle: index === 2 ? "dashed" : "solid", borderRadius: "50%" }} />)}
            <Box sx={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(120,130,140,.35), transparent)" }} />
            <Box sx={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "1px", background: "linear-gradient(180deg, transparent, rgba(120,130,140,.35), transparent)" }} />
            {points.map((point, index) => <Box key={index} sx={{ position: "absolute", left: point.left, top: point.top, width: 10, height: 10, borderRadius: "50%", bgcolor: "text.secondary", boxShadow: "0 0 0 5px rgba(120,130,140,.1), 0 0 18px rgba(120,130,140,.28)" }} />)}
            <Box sx={{ position: "absolute", left: "50%", top: "50%", width: 18, height: 18, transform: "translate(-50%, -50%)", borderRadius: "50%", bgcolor: "text.secondary", boxShadow: "0 0 0 8px rgba(120,130,140,.1), 0 0 28px rgba(120,130,140,.3)" }} />
            <Typography sx={{ position: "absolute", bottom: 14, left: 14, fontFamily: "monospace", fontSize: ".57rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", color: "text.secondary" }}>{t("certifications.stackSectors")}</Typography>
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
        <Paper component="article" variant="outlined" sx={{ position: "relative", display: "flex", height: "100%", minHeight: { xs: 390, md: 430 }, p: { xs: 2, md: 2.3 }, borderRadius: 2.5, overflow: "hidden", backgroundColor: "rgba(255,255,255,.18)", transition: "transform 260ms cubic-bezier(.2,.8,.2,1), box-shadow 260ms ease, border-color 260ms ease", "&::before": { content: '""', position: "absolute", right: -28, top: -28, width: 122, height: 122, border: "1px solid", borderColor: "rgba(52,124,178,.2)", borderRadius: "50%" }, "&::after": { content: '""', position: "absolute", right: 10, top: 22, width: 52, height: 52, border: "1px dashed", borderColor: "rgba(52,124,178,.22)", borderRadius: "50%" }, "&:hover": { transform: "translateY(-5px)", boxShadow: "0 18px 42px rgba(18,32,45,.08)", borderColor: accent } }}>
            <Stack spacing={1.35} sx={{ flex: 1, position: "relative", zIndex: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1}>
                    <Typography sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: ".58rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase" }}>{`credential / c-${credentialNumber}`}</Typography>
                    <Typography sx={{ display: "flex", alignItems: "center", gap: .7, color: "space.green", fontFamily: "monospace", fontSize: ".58rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}><Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "currentColor", boxShadow: "0 0 12px currentColor" }} />{t("certifications.verified")}</Typography>
                </Stack>
                <Typography variant="h6" sx={{ maxWidth: "86%", minHeight: { xs: "4.62rem", md: "5.1rem" }, fontWeight: 800, fontSize: { xs: "1.28rem", md: "1.42rem" }, lineHeight: 1.2, letterSpacing: "-0.028em" }}>{cert.title}</Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: .8 }}>{metadata.map((item) => <Box key={item.label} sx={{ minHeight: 58, p: 1, border: "1px solid", borderColor: "divider", borderRadius: 1.5, backgroundColor: "rgba(255,255,255,.12)" }}><Typography sx={{ mb: .55, color: "text.secondary", fontFamily: "monospace", fontSize: ".54rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" }}>{item.label}</Typography><Typography sx={{ fontSize: ".82rem", fontWeight: 700, lineHeight: 1.25 }}>{item.value}</Typography></Box>)}</Box>
                <Stack direction="row" gap={.7} flexWrap="wrap" sx={{ minHeight: 56 }}>
                    {visibleIconDefinitions.map((iconDefinition, index) => <Chip key={`${cert.id}-${iconDefinition.id}-${index}`} label={iconDefinition.title || iconDefinition.id} size="small" variant="outlined" sx={{ borderRadius: 1.1, "& .MuiChip-label": { color: iconDefinition.color } }} />)}
                    {hiddenIconsCount > 0 ? <Tooltip arrow placement="top" slotProps={CERT_TECH_TOOLTIP_SLOT_PROPS} title={<Stack spacing={.6} sx={{ py: .25 }}>{iconDefinitions.map((iconDefinition, index) => { const TopicIcon = iconDefinition.component; return <Stack key={`${cert.id}-tooltip-${iconDefinition.id}-${index}`} direction="row" spacing={.7} alignItems="center"><TopicIcon size={14} color={iconDefinition.color} /><Typography variant="caption">{iconDefinition.title || iconDefinition.id}</Typography></Stack>; })}</Stack>}><ButtonBase aria-label={t("certifications.moreTechAria", { count: hiddenIconsCount, title: cert.title })} sx={{ minWidth: 42, height: 24, minHeight: 24, px: .8, display: "inline-flex", alignItems: "center", lineHeight: 1, border: "1px solid", borderColor: "divider", borderRadius: 1.1, fontFamily: "monospace", fontSize: ".65rem", fontWeight: 800, color: "text.secondary" }}>{`+${hiddenIconsCount}`}</ButtonBase></Tooltip> : null}
                </Stack>
                <Stack direction="row" gap={1} alignItems="center" sx={{ mt: "auto" }}>
                    <Button component="a" href={cert.url} target="_blank" rel="noreferrer" variant="outlined" sx={{ ...outlinedActionButtonSx, flex: 1, minWidth: 0, height: 46, borderRadius: 1.5, fontFamily: "monospace", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>{t("certifications.openCredential")}</Button>
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
        <Paper component="section" aria-labelledby="home-certifications-title" sx={{ width: "100%", p: { xs: 1.5, md: 2.5 }, borderRadius: 3.5, background: "linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.02))" }}>
            <Stack spacing={{ xs: 2, md: 2.4 }}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.65fr) minmax(300px, .95fr)" }, gap: 1.8 }}>
                    <Box sx={{ position: "relative", p: { xs: 2, md: 3 }, minHeight: 230, border: "1px solid", borderColor: "divider", borderRadius: 2.5, overflow: "hidden", background: "radial-gradient(circle at 87% 18%, rgba(120,130,140,.1), transparent 22%), rgba(255,255,255,.12)" }}>
                        <Typography sx={{ mb: 1.5, color: "text.secondary", fontFamily: "monospace", fontSize: ".6rem", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" }}>{t("certifications.eyebrow")}</Typography>
                        <Typography id="home-certifications-title" variant="h3" sx={{ maxWidth: 780, fontSize: "clamp(2.15rem, 4.5vw, 4rem)", lineHeight: 1.03 }}>{t("certifications.title")}</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mt: 1.5 }}>{t("certifications.subtitle")}</Typography>
                    </Box>
                    <Box sx={{ p: 1.8, border: "1px solid", borderColor: "divider", borderRadius: 2.5, backgroundColor: "rgba(255,255,255,.12)" }}><ArchiveMap t={t} /></Box>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }, gap: 1.2 }}>{statusItems.map((item, index) => <Box key={item.label} sx={{ position: "relative", p: 1.7, border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden", "&::after": { content: '""', position: "absolute", inset: "0 auto auto 0", width: "100%", height: 3, bgcolor: statusAccents[index], opacity: .9 } }}><Typography sx={{ mb: .8, color: "text.secondary", fontFamily: "monospace", fontSize: ".57rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" }}>{item.label}</Typography><Typography sx={{ fontSize: { xs: ".82rem", md: "1rem" }, fontWeight: 750 }}>{item.value}</Typography></Box>)}</Box>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={1.5}><Typography variant="h5" sx={{ fontSize: "1.25rem", fontWeight: 800 }}>{t("certifications.primaryNodes")}</Typography><Stack direction="row" gap={.8} flexWrap="wrap"><Chip label={t("certifications.featuredView")} size="small" variant="outlined" sx={{ borderRadius: 99 }} /><Chip label={t("certifications.latestSort")} size="small" variant="outlined" sx={{ borderRadius: 99 }} /></Stack></Stack>
                <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" } }}>{FEATURED_CERTIFICATIONS.map((cert) => <CertificationCard key={cert.id} cert={cert} t={t} />)}</Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, p: { xs: 1.8, md: 2.2 }, border: "1px solid", borderColor: "divider", borderRadius: 2.5, backgroundColor: "rgba(255,255,255,.12)" }}><Box><Typography sx={{ mb: .6, fontSize: "1.05rem", fontWeight: 800 }}>{t("certifications.archiveTitle")}</Typography><Typography variant="body2" color="text.secondary">{t("certifications.archiveDescription")}</Typography></Box><Button component={RouterLink} to="/about#certifications" variant="outlined" sx={{ ...outlinedActionButtonSx, flexShrink: 0, minHeight: 46, borderRadius: 1.5, fontFamily: "monospace", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>{t("certifications.viewAllCta")}</Button></Box>
            </Stack>
        </Paper>
    );
}
