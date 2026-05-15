import { Link, Stack, Typography } from "@mui/material";
import { formatIssuedAt } from "../../../features/certifications/certifications.utils.js";
import { cvActionLinkSx } from "../cv.styles.js";

/**
 * @param {{
 *   certifications: import("../../../features/certifications/certifications.data.js").Certification[],
 *   t: import("i18next").TFunction<"pages">,
 * }} props
 */
export default function CvCertificationsSection({ certifications, t }) {
    return (
        <Stack data-cv-section spacing={0.9}>
            <Typography variant="h5">{t("cv.certifications")}</Typography>
            <Stack spacing={0.75}>
                {certifications.map((certification) => (
                    <Stack
                        key={certification.id}
                        data-cv-cert-row
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        gap={1}
                    >
                        <Stack data-cv-cert-main spacing={0.15}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                {certification.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {`${certification.platform} · ${t(`about.certifications.status.${certification.status}`, { defaultValue: certification.status })}`}
                            </Typography>
                        </Stack>
                        <Stack data-cv-cert-meta direction="row" spacing={0.85} alignItems="center">
                            <Typography
                                data-cv-cert-date
                                variant="caption"
                                color="text.secondary"
                                sx={{ whiteSpace: "nowrap" }}
                            >
                                {formatIssuedAt(certification.issuedAt)}
                            </Typography>
                            <Link
                                data-cv-link
                                data-cv-action-link
                                href={certification.url}
                                target="_blank"
                                rel="noreferrer"
                                variant="body2"
                                sx={cvActionLinkSx}
                            >
                                {t("cv.verify")}
                            </Link>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}
