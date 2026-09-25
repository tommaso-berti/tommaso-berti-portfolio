import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProfileImage from "../../features/ProfileImage.jsx";
import signatureLight from "../../assets/images/personnel-signature-artwork.png";
import signatureDark from "../../assets/images/personnel-signature-artwork-dark.png";
import ColorRail from "../../features/mission-ui/ColorRail.jsx";
import TechnicalLabel from "../../features/mission-ui/TechnicalLabel.jsx";

function CredentialField({ label, value, wide = false, children }) {
    return (
        <Box sx={{ gridColumn: wide ? { xs: "auto", sm: "span 2" } : "auto", p: 1.3, borderBottom: "1px solid", borderColor: "divider" }}>
            <TechnicalLabel sx={{ fontSize: ".54rem" }}>{label}</TechnicalLabel>
            {children || <Typography sx={{ mt: .55, fontSize: ".78rem", fontWeight: 800, lineHeight: 1.35 }}>{value}</Typography>}
        </Box>
    );
}

export default function PersonnelCredential({ profile, stack, systems = [], telemetry = [], bioDescription, t }) {
    const theme = useTheme();
    const base = telemetry[0]?.value || profile.location;
    const personality = telemetry[2]?.value || "";

    return (
        <Card component="article" variant="outlined" sx={{ position: "relative", overflow: "hidden", bgcolor: "background.paper" }}>
            <ColorRail />
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={2} sx={{ pb: 1.7, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Box>
                        <TechnicalLabel color="space.blue">{t("credential.kicker")}</TechnicalLabel>
                        <Typography component="h3" variant="h4" sx={{ mt: 1.1 }}>{t("credential.title")}</Typography>
                    </Box>
                    <Box aria-label={t("credential.sealLabel")} sx={{ width: 82, height: 82, flexShrink: 0, borderRadius: "50%", display: "grid", placeItems: "center", position: "relative", "&::before": { content: '""', position: "absolute", inset: 8, border: "1px dashed", borderColor: "divider", borderRadius: "50%" }, "&::after": { content: '""', position: "absolute", bottom: 11, left: "50%", width: 6, height: 6, borderRadius: "50%", bgcolor: "space.orange", transform: "translateX(-50%)" } }}>
                        <Box component="img" src="/tb-logo-1024.png" alt="" aria-hidden="true" sx={{ width: 58, height: 58, objectFit: "contain", borderRadius: "50%" }} />
                    </Box>
                </Stack>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "150px minmax(0, 1fr)" }, mt: 1.7, border: "1px solid", borderColor: "divider" }}>
                    <Stack sx={{ p: 1.5, borderBottom: { xs: "1px solid", sm: 0 }, borderColor: "divider" }} spacing={1.1}>
                        <Box sx={{ display: "grid", placeItems: "center", minHeight: 150, p: 1, border: "1px solid", borderColor: "divider", bgcolor: "space.secondaryPaper" }}>
                            <ProfileImage alt={t("profileAlt")} width={118} height={118} rounded={false} transparent sx={{ width: "100%" }} />
                        </Box>
                        <TechnicalLabel sx={{ fontSize: ".52rem" }}>{t("credential.portraitMeta")}</TechnicalLabel>
                    </Stack>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" } }}>
                        <CredentialField label={t("credential.fields.holder")} value={profile.name} wide />
                        <CredentialField label={t("credential.fields.role")} value={profile.role} />
                        <CredentialField label={t("credential.fields.base")} value={base} />
                        <CredentialField label={t("credential.fields.stack")} value={stack.join(" · ")} wide />
                        <CredentialField label={t("credential.fields.systems")} wide>
                            <Stack spacing={.8} sx={{ mt: .7, p: 1, border: "1px solid", borderColor: "divider" }}>
                                {systems.map((system) => (
                                    <Stack key={system.label} direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={.6}>
                                        <TechnicalLabel sx={{ fontSize: ".62rem" }}>{system.label}</TechnicalLabel>
                                        <Typography sx={{ fontFamily: (theme) => theme.fonts.mono, fontSize: ".72rem", fontWeight: 800, textAlign: { sm: "right" }, overflowWrap: "anywhere" }}>{system.value}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </CredentialField>
                        <CredentialField label={t("credential.fields.personality")} value={personality} wide />
                        <CredentialField label={t("credential.fields.bio")} value={bioDescription} wide />
                    </Box>
                </Box>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1.5} sx={{ pt: 1.5 }}>
                    <Box>
                        <TechnicalLabel sx={{ fontSize: ".52rem" }}>{t("credential.signatureLabel")}</TechnicalLabel>
                        <Box component="img" src={theme.palette.mode === "dark" ? signatureDark : signatureLight} alt={t("credential.signatureAlt")} sx={{ display: "block", width: 260, maxWidth: "100%", height: 72, objectFit: "contain", objectPosition: "left center", mt: .2 }} />
                    </Box>
                    <Box sx={{ minWidth: { sm: 150 } }}>
                        <TechnicalLabel sx={{ fontSize: ".52rem" }}>{t("credential.statusLabel")}</TechnicalLabel>
                        <Typography sx={{ mt: .35, color: "success.main", fontFamily: (theme) => theme.fonts.mono, fontSize: ".65rem", fontWeight: 900, letterSpacing: ".1em" }}>{t("credential.status")}</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
