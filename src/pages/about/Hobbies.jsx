import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ACCENTS = ["space.blue", "space.yellow", "space.orange"];

function HobbyOrbit({ accent }) {
    return <Box aria-hidden="true" sx={{ width: 46, height: 46, color: accent, display: "grid", placeItems: "center", position: "relative" }}>
        <Box sx={{ position: "absolute", inset: 3, border: "1px solid", borderColor: "text.secondary", borderRadius: "50%", opacity: .72 }} />
        <Box sx={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", bgcolor: "text.secondary", opacity: .45 }} />
        <Box sx={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", bgcolor: "text.secondary", opacity: .45 }} />
        <Box sx={{ width: 13, height: 13, borderRadius: "50%", bgcolor: accent, boxShadow: (theme) => `0 0 0 4px ${theme.palette.background.paper}`, zIndex: 1 }} />
    </Box>;
}

function HobbyCard({ item, index }) {
    const accent = ACCENTS[index] || ACCENTS[0];

    return <Card component="article" variant="outlined" sx={{ minHeight: { xs: 0, md: 270 }, overflow: "hidden", bgcolor: "space.panel", borderColor: "divider" }}>
            <Stack sx={{ minHeight: { xs: 0, md: 270 }, p: { xs: 2, sm: 2.5 }, position: "relative" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ fontSize: ".58rem", letterSpacing: ".14em" }}>{item.code}{" // "}{item.kicker}</Typography>
                    <HobbyOrbit accent={accent} />
                </Box>
                <Typography component="h3" variant="h5" sx={{ mt: 1.7, mb: .75, letterSpacing: "-.025em" }}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>{item.description}</Typography>
                <Stack direction="row" flexWrap="wrap" gap={.7} sx={{ mt: "auto", pt: 1.8 }}>
                    {item.tags.map((tag) => <Box key={tag} component="span" sx={{ border: "1px solid", borderColor: "divider", px: .85, py: .55, bgcolor: "background.paper", color: "text.secondary", fontFamily: (theme) => theme.typography.overline.fontFamily, fontSize: ".57rem", fontWeight: 800, letterSpacing: ".09em", lineHeight: 1.1, textTransform: "uppercase" }}>{tag}</Box>)}
                </Stack>
            </Stack>
    </Card>;
}

export default function Hobbies({ embedded = false }) {
    const { t } = useTranslation("pages", { keyPrefix: "about.hobbies" });
    const items = t("items", { returnObjects: true });

    return <Stack id="hobbies" spacing={3} component="section" sx={{ marginTop: embedded ? 0 : "3rem", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}>
        {!embedded ? <><Typography variant="overline" color="text.secondary">{t("sectionLabel")}</Typography><Typography component="h2" variant="h3">{t("title")}</Typography></> : null}
        <Typography color="text.secondary" sx={{ maxWidth: 760 }}>{t("lead")}</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 1.5, md: 2.5 }, alignItems: "stretch" }}>
            {items.map((item, index) => <HobbyCard key={item.id} item={item} index={index} />)}
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1.5} sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1.5, color: "text.secondary", fontFamily: (theme) => theme.typography.overline.fontFamily, fontSize: ".58rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>
            <Box component="span">{t("footer.route")}</Box>
            <Stack direction="row" flexWrap="wrap" gap={1.5}>{t("footer.legend", { returnObjects: true }).map((entry, index) => <Box key={entry} component="span" sx={{ display: "flex", alignItems: "center", gap: .65 }}><Box component="i" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: ACCENTS[index] || ACCENTS[0] }} />{entry}</Box>)}</Stack>
        </Stack>
    </Stack>;
}
