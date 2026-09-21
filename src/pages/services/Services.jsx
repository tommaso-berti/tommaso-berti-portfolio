import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import SectionHeader from "../../features/mission-ui/SectionHeader.jsx";
import CapabilityCard from "../../features/mission-ui/CapabilityCard.jsx";
import SpaceButton from "../../features/mission-ui/SpaceButton.jsx";

export default function Services() {
    const { t } = useTranslation("pages", { keyPrefix: "services" });
    const items = t("items", { returnObjects: true });
    return <Stack component="article" spacing={3}><SectionHeader eyebrow={t("eyebrow")} title={t("title")} note={t("note")} /><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 1.25 }}>{items.map((item, index) => <CapabilityCard key={item.title} code={`0${index + 1}`} {...item} />)}</Box><SpaceButton component={RouterLink} to="/contact" variant="contained" sx={{ alignSelf: "flex-start", mt: 1 }}>{t("cta")} →</SpaceButton></Stack>;
}
