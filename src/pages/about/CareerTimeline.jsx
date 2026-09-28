import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function TimelineEntry({ item, index, isLast, isOpen, onToggle, t }) {
    const detailsId = `experience-details-${index}`;
    const isCurrent = item.current === true;
    const accent = item.type === "study" ? "space.blue" : "space.orange";

    return <Box component="article" data-type={item.type} role="listitem" sx={{ display: "grid", gridTemplateColumns: { xs: "20px minmax(0, 1fr)", sm: "118px 30px minmax(0, 1fr)" }, position: "relative", mb: { xs: 1.75, sm: 1.5 } }}>
        <Typography variant="caption" sx={{ gridColumn: { xs: 2, sm: 1 }, gridRow: 1, textAlign: { xs: "left", sm: "right" }, alignSelf: "start", pt: { xs: 0, sm: 2 }, pr: { xs: 0, sm: 1.75 }, color: "text.secondary", fontFamily: (theme) => theme.fonts.mono, fontWeight: 700, whiteSpace: "nowrap" }}>{item.year}</Typography>
        <Box aria-hidden="true" sx={{ gridColumn: { xs: 1, sm: 2 }, gridRow: { xs: "1 / span 2", sm: 1 }, position: "relative", display: "flex", justifyContent: "center", "&::before": { content: '""', position: "absolute", top: { xs: 31, sm: 28 }, bottom: isLast ? "50%" : { xs: -28, sm: -20 }, width: "1px", bgcolor: "divider" } }}><Box sx={{ position: "relative", zIndex: 1, mt: { xs: 3.25, sm: 2.9 }, width: 9, height: 9, flex: "0 0 auto", borderRadius: "50%", bgcolor: isCurrent ? "space.green" : accent, border: "1px solid", borderColor: isCurrent ? "space.green" : accent, boxShadow: "0 0 0 5px", color: "background.paper" }} /></Box>
        <Paper variant="outlined" sx={{ position: "relative", gridColumn: { xs: 2, sm: 3 }, gridRow: { xs: 2, sm: 1 }, overflow: "hidden", backgroundColor: "rgba(251,248,241,.72)", transition: "border-color 200ms ease, background-color 200ms ease, transform 200ms ease", "&:hover": { backgroundColor: "background.paper", borderColor: "text.secondary" }, ...(isOpen && { backgroundColor: "background.paper", borderColor: "divider" }), "&::before": { content: '""', position: "absolute", inset: "0 auto 0 0", width: 2, bgcolor: isOpen ? accent : "transparent", transition: "background-color 200ms ease" } }}>
            <Box component="button" type="button" aria-expanded={isOpen} aria-controls={detailsId} onClick={onToggle} sx={{ width: "100%", display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 2, alignItems: "start", p: { xs: 1.5, sm: 2 }, border: 0, bgcolor: "transparent", color: "inherit", textAlign: "left", cursor: "pointer", font: "inherit", "&:focus-visible": { outline: "2px solid", outlineColor: "space.blue", outlineOffset: -2 } }}>
                <Box>
                    <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 0.7, color: "text.secondary", fontFamily: (theme) => theme.fonts.mono, fontSize: ".57rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}><span>{item.code}</span><span>• {item.kind}</span>{isCurrent ? <Chip label={t("current")} size="small" color="success" sx={{ height: 22, borderRadius: 0.5, fontFamily: (theme) => theme.fonts.mono, fontSize: ".55rem", fontWeight: 800, letterSpacing: ".07em", textTransform: "uppercase" }} /> : null}</Stack>
                    <Typography component="h3" sx={{ fontSize: { xs: "1rem", sm: "1.05rem" }, fontWeight: 750, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{item.title}</Typography>
                </Box>
                <Box aria-hidden="true" sx={{ width: 28, height: 28, display: "grid", placeItems: "center", border: "1px solid", borderColor: "divider", borderRadius: 0.5, color: isOpen ? "text.primary" : "text.secondary", fontFamily: (theme) => theme.fonts.mono, fontSize: "1.05rem", lineHeight: 1, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 250ms ease, color 200ms ease" }}>+</Box>
            </Box>
            <Box id={detailsId} sx={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 280ms cubic-bezier(.2,.8,.2,1)" }}><Box sx={{ minHeight: 0, overflow: "hidden" }}><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" }, gap: 2.5, p: { xs: "0 1.5rem 1.5rem", sm: "0 1rem 1.1rem 1rem" }, pt: isOpen ? 1.2 : 0, borderTop: isOpen ? "1px solid" : 0, borderColor: "divider", opacity: isOpen ? 1 : 0, transform: isOpen ? "none" : "translateY(-5px)", transition: "opacity 200ms ease, transform 280ms ease" }}><Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>{item.description}</Typography><Stack sx={{ alignSelf: "end", textAlign: { xs: "left", sm: "right" }, color: "text.secondary", fontFamily: (theme) => theme.fonts.mono, fontSize: ".55rem", letterSpacing: ".08em" }}>{item.coords?.map((coordinate) => <span key={coordinate}>{coordinate}</span>)}</Stack></Box></Box></Box>
        </Paper>
    </Box>;
}

export default function CareerTimeline({ filter = "all", t }) {
    const [openEntries, setOpenEntries] = useState(() => new Set(["EXP-01"]));
    const experiences = t("experiences", { returnObjects: true }) || [];
    const orderedExperiences = [...experiences].reverse().filter((item) => filter === "all" || item.type === filter);

    const toggleEntry = (code) => setOpenEntries((current) => {
        const next = new Set(current);
        if (next.has(code)) next.delete(code);
        else next.add(code);
        return next;
    });

    return <Stack component="div" role="list" spacing={0}>{orderedExperiences.map((item, index) => <TimelineEntry key={item.code} item={item} index={index} isLast={index === orderedExperiences.length - 1} isOpen={openEntries.has(item.code)} onToggle={() => toggleEntry(item.code)} t={t} />)}<Stack direction="row" alignItems="center" gap={1.5} sx={{ mt: 1, color: "text.secondary", fontFamily: (theme) => theme.fonts.mono, fontSize: ".55rem", letterSpacing: ".08em", textTransform: "uppercase" }}><Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} /><span>{t("archiveCount", { count: experiences.length })}</span><Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} /></Stack></Stack>;
}
