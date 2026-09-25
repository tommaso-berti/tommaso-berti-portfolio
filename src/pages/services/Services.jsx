import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import SectionHeader from "../../features/mission-ui/SectionHeader.jsx";
import CapabilityCard from "../../features/mission-ui/CapabilityCard.jsx";
import SpaceButton from "../../features/mission-ui/SpaceButton.jsx";

const displayCodes = ["A1", "D2", "I3", "F4"];
const serviceIds = ["web", "dash", "api", "auto"];

function SectionTitle({ code, label, title, note }) {
    return <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} gap={1.25} sx={{ mb: 1.5 }}>
        <Box>
            <Typography variant="overline" sx={{ color: "space.orange", fontFamily: "monospace" }}>{code}{" // "}{label}</Typography>
            <Typography component="h2" variant="h4" sx={{ fontSize: { xs: "1.55rem", sm: "1.8rem" }, letterSpacing: "-.035em" }}>{title}</Typography>
        </Box>
        {note ? <Typography variant="overline" sx={{ color: "text.secondary", fontFamily: "monospace", textAlign: { sm: "right" } }}>{note}</Typography> : null}
    </Stack>;
}

function CapabilityMatrix({ t, selectedId, previewId }) {
    const rows = t("matrix.rows", { returnObjects: true });
    const columns = t("matrix.columns", { returnObjects: true });
    const activeId = previewId ?? selectedId;

    return <Box sx={{ overflowX: "auto", border: "1px solid", borderColor: "divider", bgcolor: "space.panel" }}>
        <Box component="table" aria-label={t("matrix.ariaLabel")} sx={{ width: "100%", minWidth: 660, borderCollapse: "collapse", "& th, & td": { px: 1.5, py: .75, borderBottom: "1px solid", borderColor: "divider", textAlign: "center", fontSize: ".72rem" }, "& th": { color: "text.secondary", fontFamily: "monospace", fontSize: ".62rem", letterSpacing: ".08em" }, "& th:first-of-type, & td:first-of-type": { textAlign: "left", position: "sticky", left: 0, bgcolor: "background.default", zIndex: 1, minWidth: 180 }, "& [data-col].active": { bgcolor: "action.hover" }, "& tbody tr:last-child td": { borderBottom: 0 } }}>
            <thead><tr><th>{t("matrix.capability")}</th>{columns.map((column, index) => <th key={serviceIds[index]} scope="col" data-col={serviceIds[index]} className={activeId === serviceIds[index] ? "active" : undefined}>{column}</th>)}</tr></thead>
            <tbody>{rows.map((row) => <tr key={row.label}><td>{row.label}</td>{row.values.map((value, index) => <td key={serviceIds[index]} data-col={serviceIds[index]} className={activeId === serviceIds[index] ? "active" : undefined} aria-label={t(`matrix.values.${value}`)}>{value === "core" ? <Box component="span" aria-hidden="true" sx={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", bgcolor: "text.primary" }} /> : value === "optional" ? <Box component="span" aria-hidden="true" sx={{ display: "inline-block", width: 8, height: 8, border: "1px solid", borderColor: "text.primary", borderRadius: "50%" }} /> : <Box component="span" aria-hidden="true" sx={{ opacity: .35 }}>—</Box>}</td>)}</tr>)}</tbody>
        </Box>
        <Stack direction="row" gap={2} flexWrap="wrap" sx={{ px: 1.5, py: 1, borderTop: "1px solid", borderColor: "divider", color: "text.secondary", fontSize: ".65rem" }}><span>● {t("matrix.values.core")}</span><span>○ {t("matrix.values.optional")}</span><span>— {t("matrix.values.none")}</span></Stack>
    </Box>;
}

export default function Services() {
    const { t } = useTranslation("pages", { keyPrefix: "services" });
    const theme = useTheme();
    const subtleDivider = alpha(theme.palette.text.primary, 0.16);
    const items = t("items", { returnObjects: true });
    const [selectedId, setSelectedId] = useState("01");
    const [previewId, setPreviewId] = useState(null);

    return <Stack component="article" spacing={3}>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} note={t("note")} systemId="CAPABILITY NODE / SRV-04" />
        <Box data-testid="service-selection-area" onMouseLeave={() => setPreviewId(null)}>
            <Box component="section" data-scroll-section data-scroll-label={`SRV-01 // ${t("sectionLabels.capabilities")}`}>
                <SectionTitle code="SRV-01" label={t("sectionLabels.capabilities")} title={t("sections.capabilities")} note={t("sections.capabilitiesNote")} />
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 1.25 }}>
                    {items.map((item, index) => { const code = `0${index + 1}`; return <CapabilityCard key={item.title} code={code} displayCode={displayCodes[index]} variant={index} active={previewId === code || (!previewId && selectedId === code)} selected={selectedId === code} onSelect={setSelectedId} onActivate={setPreviewId} onDeactivate={() => setPreviewId(null)} deactivateOnMouseLeave={false} activeLabel={t("activeLabel")} {...item} />; })}
                </Box>
            </Box>
            <Box component="section" data-scroll-section data-scroll-label={`SRV-02 // ${t("sectionLabels.matrix")}`} sx={{ pt: 3 }}><SectionTitle code="SRV-02" label={t("sectionLabels.matrix")} title={t("sections.matrix")} note={t("matrix.legend")}/><CapabilityMatrix t={t} selectedId={serviceIds[Number(selectedId) - 1]} previewId={previewId ? serviceIds[Number(previewId) - 1] : null} /></Box>
        </Box>

        <Box component="section" data-scroll-section data-scroll-label={`SRV-03 // ${t("sectionLabels.scope")}`} sx={{ pt: 1 }}><SectionTitle code="SRV-03" label={t("sectionLabels.scope")} title={t("scope.title")} note={t("scope.note")}/><Box sx={{ display: "grid", position: "relative", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, border: "1px solid", borderColor: "divider", bgcolor: "space.panel", "&::after": { content: '""', display: { xs: "none", md: "block" }, position: "absolute", top: 0, bottom: 0, left: "50%", width: "1px", bgcolor: subtleDivider, pointerEvents: "none" } }}>
            <Box sx={{ p: { xs: 2, sm: 2.75 } }}><Typography variant="overline" sx={{ fontFamily: "monospace", color: "text.secondary" }}>{t("scope.newProject.label")}</Typography><Typography component="h3" variant="h5" sx={{ mt: .75, mb: 1 }}>{t("scope.newProject.title")}</Typography><Typography color="text.secondary">{t("scope.newProject.description")}</Typography><Stack direction="row" flexWrap="wrap" gap={.75} sx={{ mt: 2 }}>{t("scope.newProject.chips", { returnObjects: true }).map((chip) => <Box key={chip} component="span" sx={{ border: "1px solid", borderColor: "divider", px: 1, py: .65, fontFamily: "monospace", fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase" }}>{chip}</Box>)}</Stack></Box>
            <Box sx={{ p: { xs: 2, sm: 2.75 }, borderTop: { xs: "1px solid", md: 0 }, borderColor: "divider", bgcolor: "background.default" }}><Typography variant="overline" sx={{ fontFamily: "monospace", color: "text.secondary" }}>{t("scope.existing.label")}</Typography>{t("scope.existing.rows", { returnObjects: true }).map((row) => <Stack key={row.key} direction={{ xs: "column", sm: "row" }} gap={1.5} sx={{ py: 1.25, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: 0 } }}><Typography variant="overline" sx={{ minWidth: 105, color: "text.secondary", fontFamily: "monospace" }}>{row.key}</Typography><Typography variant="body2">{row.description}</Typography></Stack>)}</Box>
        </Box></Box>

        <Box component="section" data-scroll-section data-scroll-label={`SRV-04 // ${t("sectionLabels.delivery")}`} sx={{ pt: 1 }}><SectionTitle code="SRV-04" label={t("sectionLabels.delivery")} title={t("delivery.title")} note={t("delivery.note")}/><Box sx={{ display: "grid", position: "relative", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, border: "1px solid", borderColor: "divider", bgcolor: "space.panel" }}>{t("delivery.items", { returnObjects: true }).map((item, index) => <Box component="article" key={item.title} sx={{ p: 2.5, minHeight: 190, display: "flex", flexDirection: "column", borderTop: { xs: index ? "1px solid" : 0, md: 0 }, borderColor: "divider", position: "relative", "&:nth-of-type(n+2)::before": { content: '""', display: { xs: "none", md: "block" }, position: "absolute", top: 0, bottom: 0, left: 0, width: "1px", bgcolor: subtleDivider } }}><Typography variant="overline" sx={{ fontFamily: "monospace", color: "space.orange" }}>{`0${index + 1}`} {" // "}{item.label}</Typography><Typography component="h3" variant="h6" sx={{ mt: 1.25, mb: .75 }}>{item.title}</Typography><Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>{item.description}</Typography><Typography variant="overline" sx={{ mt: 2, pt: 1, borderTop: "1px solid", borderColor: "divider", color: "text.secondary", fontFamily: "monospace" }}>{item.foot}</Typography></Box>)}</Box></Box>

        <Box component="section" data-scroll-section data-scroll-label={`SRV-05 // ${t("sectionLabels.method")}`} sx={{ pt: 1 }}><SectionTitle code="SRV-05" label={t("sectionLabels.method")} title={t("method.title")}/><Box sx={{ p: 2.5, border: "1px solid", borderColor: "divider", bgcolor: "space.panel", display: "grid", gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" }, gap: 2, alignItems: "center" }}><Box><Typography variant="body2" color="text.secondary">{t("method.description")}</Typography></Box><SpaceButton component={RouterLink} to="/about#method" variant="outlined" sx={{ minHeight: 44, whiteSpace: "nowrap" }}>{t("method.cta")} →</SpaceButton></Box></Box>

        <Box component="section" data-scroll-section data-scroll-label={`SRV-06 // ${t("sectionLabels.contact")}`} sx={{ mt: 1 }}><SectionTitle code="SRV-06" label={t("sectionLabels.contact")} title={t("finalCta.title")}/><Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={2} sx={{ py: 2.5, borderTop: "1px solid", borderBottom: "1px solid", borderColor: "divider" }}><Typography variant="body2" color="text.secondary">{t("finalCta.description")}</Typography><SpaceButton component={RouterLink} to="/contact" variant="contained" sx={{ minHeight: 44, whiteSpace: "nowrap" }}>{t("finalCta.cta")} →</SpaceButton></Stack></Box>
    </Stack>;
}
