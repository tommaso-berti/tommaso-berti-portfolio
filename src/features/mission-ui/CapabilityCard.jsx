import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const markerPositions = ["18%", "42%", "66%", "84%"];

function Schematic({ variant }) {
    if (variant === 1) {
        return <svg viewBox="0 0 92 58" fill="none" aria-hidden="true"><rect x="8.5" y="9.5" width="68" height="39" rx="2" stroke="currentColor" /><path d="M15 39V29M24 39V22M33 39V33M42 39V18" stroke="currentColor" /><path d="M53 20h15M53 27h10M53 34h13" stroke="currentColor" strokeDasharray="3 3" /><circle cx="83" cy="16" r="3.5" stroke="currentColor" /><path d="M83 20v22" stroke="currentColor" /></svg>;
    }

    if (variant === 2) {
        return <svg viewBox="0 0 92 58" fill="none" aria-hidden="true"><circle cx="18" cy="29" r="7" stroke="currentColor" /><circle cx="46" cy="15" r="7" stroke="currentColor" /><circle cx="71" cy="36" r="7" stroke="currentColor" /><path d="M24 26l15-8M51 20l14 11M25 32l39 3" stroke="currentColor" strokeDasharray="4 3" /><path d="M8 10h12M8 48h19M65 11h18" stroke="currentColor" /></svg>;
    }

    if (variant === 3) {
        return <svg viewBox="0 0 92 58" fill="none" aria-hidden="true"><path d="M18 32a15 15 0 1 1 26 10M44 42l-1-9 9 2" stroke="currentColor" /><rect x="58.5" y="13.5" width="20" height="20" rx="2" stroke="currentColor" /><path d="M63 19h11M63 24h7M63 29h9M14 47h25" stroke="currentColor" strokeDasharray="3 3" /></svg>;
    }

    return <svg viewBox="0 0 92 58" fill="none" aria-hidden="true"><rect x="7.5" y="8.5" width="66" height="40" rx="2" stroke="currentColor" /><path d="M8 17H73M16 13h2M21 13h2M26 13h2" stroke="currentColor" /><path d="M18 27h25M18 34h39M18 41h30" stroke="currentColor" strokeDasharray="3 3" /><path d="M79 18v28M75 22l4-4 4 4M75 42l4 4 4-4" stroke="currentColor" /></svg>;
}

export default function CapabilityCard({ code, displayCode = code, title, description, kicker, tags = [], signalStart, signalEnd, active, activeLabel, variant = 0, onActivate, onDeactivate }) {
    const detailsId = `service-details-${code}`;
    const markerPosition = markerPositions[variant] ?? markerPositions[0];

    return <Card component="article" variant="outlined" sx={{ position: "relative", overflow: "hidden", bgcolor: active ? "background.paper" : "space.panel", borderColor: active ? "text.primary" : "divider", transform: active ? "translateY(-2px)" : "none", transition: "transform 260ms cubic-bezier(.2,.8,.2,1), border-color 260ms ease, background-color 260ms ease", "&:hover": { transform: "translateY(-4px)", borderColor: "text.secondary" } }}>
        <CardActionArea component="button" disableRipple onMouseEnter={() => onActivate(code)} onMouseLeave={() => onDeactivate(code)} onFocus={() => onActivate(code)} onBlur={() => onDeactivate(code)} aria-expanded={active} aria-controls={detailsId} sx={{ height: "100%", display: "block", color: "inherit", textAlign: "left", "&:focus-visible": { outline: "1px solid", outlineColor: "text.secondary", outlineOffset: -2 } }}>
            <CardContent sx={{ position: "relative", zIndex: 1, minHeight: { xs: 235, sm: 250 }, p: { xs: 2, sm: 2.5 }, display: "flex", flexDirection: "column" }}>
                <Box sx={{ position: "absolute", top: { xs: ".85rem", sm: "1rem" }, right: { xs: ".85rem", sm: "1rem" }, width: 92, height: 58, color: "text.secondary", opacity: active ? .9 : .58, transition: "opacity 260ms ease, transform 260ms ease", transform: active ? "translateY(-1px)" : "none", "& svg": { width: "100%", height: "100%" } }}><Schematic variant={variant} /></Box>
                <Box sx={{ maxWidth: { xs: "100%", sm: "82%" } }}>
                    <Typography variant="overline" sx={{ display: "flex", alignItems: "center", gap: .8, color: "text.secondary", fontSize: ".58rem" }}><Box component="span" sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "space.blue", flexShrink: 0 }} />{kicker}</Typography>
                    <Typography component="h2" variant="h5" sx={{ mt: .65, mb: .7, fontSize: { xs: "1.55rem", sm: "1.75rem" }, letterSpacing: "-.028em", lineHeight: 1.08 }}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>{description}</Typography>
                    <Box id={detailsId} sx={{ display: "grid", gridTemplateRows: active ? "1fr" : "0fr", transition: "grid-template-rows 340ms cubic-bezier(.2,.8,.2,1)" }}>
                        <Box sx={{ overflow: "hidden" }}><Box sx={{ display: "flex", flexWrap: "wrap", gap: .8, pt: active ? 1.7 : 0 }}>{tags.map((tag, tagIndex) => <Box key={tag} component="span" sx={{ border: "1px solid", borderColor: "divider", borderTop: "2px solid", borderTopColor: tagIndex % 3 === 0 ? "space.blue" : tagIndex % 3 === 1 ? "space.yellow" : "space.orange", borderRadius: 0, px: 1, py: .7, bgcolor: "background.paper", color: "text.primary", fontFamily: "monospace", fontSize: ".66rem", fontWeight: 800, letterSpacing: ".1em", lineHeight: 1.1, textTransform: "uppercase" }}>{tag}</Box>)}</Box></Box>
                    </Box>
                </Box>
                <Box sx={{ mt: "auto", pt: 2.2 }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", height: 4, position: "relative", overflow: "visible", "& > span:nth-of-type(1)": { bgcolor: "space.blue" }, "& > span:nth-of-type(2)": { bgcolor: "space.yellow" }, "& > span:nth-of-type(3)": { bgcolor: "space.orange" } }}><Box component="span" /><Box component="span" /><Box component="span" /><Box component="i" sx={{ position: "absolute", top: -4, left: markerPosition, width: 2, height: 12, bgcolor: "text.primary", opacity: active ? 1 : 0, transform: "translateX(-50%)", transition: "left 380ms cubic-bezier(.2,.8,.2,1), opacity 220ms ease" }} /></Box>
                    <Stack direction="row" justifyContent="space-between" gap={1} sx={{ mt: .8, color: "text.secondary", fontFamily: "monospace", fontSize: ".52rem", letterSpacing: ".1em", textTransform: "uppercase" }}><Box component="span">{signalStart}</Box><Box component="span" sx={{ color: "text.primary", fontWeight: 800, opacity: active ? 1 : 0, transition: "opacity 220ms ease" }}>{activeLabel}</Box><Box component="span">{signalEnd}</Box></Stack>
                </Box>
                <Box aria-hidden="true" sx={{ position: "absolute", right: "1.25rem", bottom: "3.1rem", color: "text.primary", opacity: active ? .11 : .07, fontFamily: "monospace", fontSize: "4rem", fontWeight: 900, letterSpacing: "-.08em", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{displayCode}</Box>
            </CardContent>
        </CardActionArea>
    </Card>;
}
