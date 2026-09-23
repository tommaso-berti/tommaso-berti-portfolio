import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useLatestReleaseNotes } from "../../hooks/useLatestReleaseNotes.js";
import { APP_VERSION } from "../../lib/version.js";

export default function Footer({ onOpenReleaseNotes }) {
    const { t } = useTranslation("common");
    const { data } = useLatestReleaseNotes();
    const version = data?.version || APP_VERSION;
    return (
        <Container
            component="footer"
            maxWidth="xl"
            sx={{
                position: "sticky",
                bottom: 0,
                zIndex: 10,
                borderTop: "1px solid",
                borderColor: "divider",
                py: 1.6,
                bgcolor: "background.paper",
            }}
        >
            <Stack
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                    gap: 0.5,
                    "& > :nth-of-type(1)": { textAlign: { xs: "center", md: "left" } },
                    "& > :nth-of-type(2)": { textAlign: "center" },
                    "& > :nth-of-type(3)": { textAlign: { xs: "center", md: "right" } },
                }}
            >
                <Typography variant="overline" color="text.secondary">
                    TB // SOFTWARE DEVELOPER //{" "}
                    <Typography
                        component="button"
                        variant="overline"
                        onClick={onOpenReleaseNotes}
                        aria-label={t("a11y.openReleaseNotes")}
                        color="space.orange"
                        sx={{
                            display: "inline",
                            p: 0,
                            border: 0,
                            background: "none",
                            fontFamily: "inherit",
                            fontSize: "inherit",
                            fontWeight: "inherit",
                            lineHeight: "inherit",
                            letterSpacing: "inherit",
                            textTransform: "inherit",
                            cursor: "pointer",
                            verticalAlign: "baseline",
                            "&:hover": { color: "text.primary" },
                            "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
                        }}
                    >
                        {`v${version}`}
                    </Typography>
                </Typography>
                <Typography variant="overline" color="text.secondary">
                    BUILD // EXPLORE // IMPROVE
                </Typography>
                <Typography variant="overline" color="text.secondary">
                    BASED ON EARTH // AVAILABLE REMOTELY
                </Typography>
            </Stack>
        </Container>
    );
}
