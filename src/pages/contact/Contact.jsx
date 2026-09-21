import { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../features/mission-ui/SectionHeader.jsx";
import MotionPanel from "../../features/mission-ui/MotionPanel.jsx";
import SpaceButton from "../../features/mission-ui/SpaceButton.jsx";
import StatusIndicator from "../../features/mission-ui/StatusIndicator.jsx";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";
import { getStaticCvPdfPath } from "../cv/cvPdf.utils.js";
import { buildContactMailto } from "./contact.utils.js";

const channels = [
    ["EMAIL", "mailto:tommaso.berti.15@gmail.com?subject=Contatto%20portfolio"],
    ["LINKEDIN", "https://www.linkedin.com/in/tommasoberti/"],
    ["GITHUB", "https://github.com/tommaso-berti"],
];

export default function Contact() {
    const { t, i18n } = useTranslation("pages", { keyPrefix: "contact" });
    const [values, setValues] = useState({ name: "", email: "", message: "" });
    const language = i18n.language?.startsWith("it") ? "it" : "en";
    const onSubmit = (event) => { event.preventDefault(); window.location.href = buildContactMailto(values, language); };
    return <Stack component="article" spacing={3}><SectionHeader eyebrow={t("missionEyebrow")} title={t("title")} note={t("missionNote")} /><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: ".9fr 1.1fr" }, gap: 1.25 }}>
        <MotionPanel component="section" sx={{ p: { xs: 2, md: 2.5 } }}><Stack spacing={1.6}><StatusIndicator>{t("missionNote")}</StatusIndicator><Typography component="h2" variant="h4">{t("formTitle")}</Typography><Typography color="text.secondary">{t("subtitle")}</Typography><Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>{channels.map(([label, href]) => <Stack key={label} component={Link} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.25, borderBottom: "1px solid", borderColor: "divider", textDecoration: "none", color: "text.primary" }}><TechnicalLabel>{label}</TechnicalLabel><Typography variant="caption" color="text.secondary">OPEN →</Typography></Stack>)}</Box><SpaceButton component="a" href={getStaticCvPdfPath(language)} target="_blank" variant="outlined" sx={{ alignSelf: "flex-start" }}>{t("resumeCta")} →</SpaceButton></Stack></MotionPanel>
        <MotionPanel component="form" onSubmit={onSubmit} sx={{ p: { xs: 2, md: 2.5 } }}><Stack spacing={1.45}><TextField label={t("name")} required value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} inputProps={{ "aria-label": t("name") }} /><TextField label={t("email")} type="email" required value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} inputProps={{ "aria-label": t("email") }} /><TextField label={t("message")} multiline minRows={6} required value={values.message} onChange={(event) => setValues({ ...values, message: event.target.value })} inputProps={{ "aria-label": t("message") }} /><SpaceButton type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>{t("send")} →</SpaceButton><Typography variant="caption" color="text.secondary">{t("formHint")}</Typography></Stack></MotionPanel>
    </Box></Stack>;
}
