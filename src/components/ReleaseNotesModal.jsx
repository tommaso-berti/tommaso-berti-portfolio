import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Link,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import { APP_VERSION } from "../lib/version.js";
import { useTranslation } from "../hooks/useTranslation.js";
import { useLatestReleaseNotes } from "../hooks/useLatestReleaseNotes.js";

function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString();
}

export default function ReleaseNotesModal({ open, onClose }) {
    const { t } = useTranslation("releaseNotes");
    const { data, isLoading, error, refetch } = useLatestReleaseNotes(open);

    const releaseType = data?.releaseType || "patch";
    const title = t(`title_${releaseType}`, t("title_patch"));
    const visibleVersion = data?.version || APP_VERSION;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent dividers>
                <Stack spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                        {t("version_label", { values: { version: visibleVersion } })}
                    </Typography>

                    {data?.previousTag && data?.tag && (
                        <Typography variant="caption" color="text.secondary">
                            {t("compare_label", {
                                values: { previous: data.previousTag, latest: data.tag },
                            })}
                        </Typography>
                    )}

                    {isLoading && (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <CircularProgress size={18} />
                            <Typography variant="body2">{t("loading")}</Typography>
                        </Stack>
                    )}

                    {!isLoading && error && (
                        <Alert
                            severity="warning"
                            action={
                                <Button color="inherit" size="small" onClick={refetch}>
                                    {t("retry")}
                                </Button>
                            }
                        >
                            {t("error")}
                        </Alert>
                    )}

                    {!isLoading && !error && (!data?.entries || data.entries.length === 0) && (
                        <Typography variant="body2" color="text.secondary">
                            {t("empty")}
                        </Typography>
                    )}

                    {!isLoading && !error && Array.isArray(data?.entries) && data.entries.length > 0 && (
                        <List sx={{ p: 0 }}>
                            {data.entries.map((entry) => (
                                <ListItem key={entry.sha} sx={{ px: 0, alignItems: "flex-start" }}>
                                    <ListItemText
                                        primary={
                                            entry.url ? (
                                                <Link
                                                    href={entry.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    underline="hover"
                                                    color="inherit"
                                                >
                                                    {entry.subject}
                                                </Link>
                                            ) : (
                                                entry.subject
                                            )
                                        }
                                        secondary={
                                            <Box component="span">
                                                {entry.author}
                                                {entry.date ? ` · ${formatDate(entry.date)}` : ""}
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>{t("close")}</Button>
            </DialogActions>
        </Dialog>
    );
}
