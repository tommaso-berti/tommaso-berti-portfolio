import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import SectionHeader from "../../features/mission-ui/SectionHeader.jsx";
import CapabilityCard from "../../features/mission-ui/CapabilityCard.jsx";
import SpaceButton from "../../features/mission-ui/SpaceButton.jsx";

export default function Services() {
    const { t } = useTranslation("pages", { keyPrefix: "services" });
    const items = t("items", { returnObjects: true });
    const [activeId, setActiveId] = useState(null);
    const displayCodes = ["A1", "D2", "I3", "F4"];

    return <Stack component="article" spacing={3}><SectionHeader eyebrow={t("eyebrow")} title={t("title")} note={t("note")} systemId="CAPABILITY NODE / SRV-04" /><Box data-scroll-section data-scroll-label={t("title")} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 1.25 }}>{items.map((item, index) => { const code = `0${index + 1}`; return <CapabilityCard key={item.title} code={code} displayCode={displayCodes[index]} variant={index} active={activeId === code} onActivate={setActiveId} onDeactivate={(id) => setActiveId((current) => current === id ? null : current)} activeLabel={t("activeLabel")} {...item} />; })}</Box><Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1.5} sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1.5, color: "text.secondary", fontFamily: "monospace", fontSize: ".58rem", letterSpacing: ".1em", textTransform: "uppercase" }}><Box component="span">{t("interactionHint")}</Box><Box component="span" sx={{ textAlign: { sm: "right" } }}>{t("revision")}</Box></Stack><SpaceButton component={RouterLink} to="/contact" variant="contained" sx={{ alignSelf: "flex-start", mt: 1 }}>{t("cta")} →</SpaceButton></Stack>;
}
