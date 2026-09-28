import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Link,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import CallSplitRoundedIcon from "@mui/icons-material/CallSplitRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { useTranslation } from "react-i18next";
import { getLanguageColor, getStaticExerciseDescription } from "./exercises.utils.js";
import { useExercisesData } from "./useExercisesData.js";

const CARD_ACCENTS = ["space.yellow", "space.blue", "space.green", "space.orange", "space.red"];

export default function ExercisesSection({ isActive }) {
    const { t, i18n } = useTranslation("pages", { keyPrefix: "projects" });
    const language = i18n.language?.toLowerCase().startsWith("it") ? "it" : "en";
    const { items, isLoading, hasMore, error, hasInitialized, onLoadMore } =
        useExercisesData(isActive);

    const showInitialLoading = isActive && isLoading && items.length === 0;
    const showLoadMoreLoading = isActive && isLoading && items.length > 0;
    const canShowLoadMore = hasInitialized && !showInitialLoading && hasMore;
    const actionButtonSx = {
        borderColor: "divider",
        color: "text.primary",
        transition: "transform 160ms ease, background-color 260ms ease, border-color 260ms ease",
        whiteSpace: "nowrap",
        "&:hover": {
            transform: "translateY(-2px)",
            bgcolor: "text.primary",
            color: "background.paper",
            borderColor: "text.primary",
        },
    };

    const formatUpdatedDate = (date) => {
        if (!date) return "-";
        return new Intl.DateTimeFormat(language === "it" ? "it-IT" : "en-GB").format(new Date(date));
    };

    return (
        <Box component="section" aria-live="polite" sx={{ display: isActive ? "block" : "none", py: 2 }}>
            <Stack spacing={2.5}>
                {error ? <Alert severity="error">{t("exercises.error")}</Alert> : null}

                {showInitialLoading ? (
                    <Stack spacing={2}>
                        {[0, 1, 2].map((index) => (
                            <Card key={index} component="article" variant="outlined" sx={{ p: 2.5 }}>
                                <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                                    <Stack spacing={1.25}>
                                        <Skeleton variant="text" width="45%" height={34} />
                                        <Skeleton variant="text" width="100%" />
                                        <Skeleton variant="text" width="85%" />
                                        <Skeleton variant="rounded" width={120} height={24} />
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                ) : null}

                {items.length === 0 && !isLoading && !error && hasInitialized ? (
                    <Typography variant="body1" color="text.secondary">
                        {t("exercises.empty")}
                    </Typography>
                ) : null}

                <Stack spacing={2}>
                    {items.map((repository, index) => {
                        const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
                        return (
                        <Card
                            key={repository.id}
                            component="article"
                            variant="outlined"
                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                bgcolor: "background.paper",
                                transition: "transform 160ms ease, box-shadow 160ms ease",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 4,
                                    bgcolor: accent,
                                },
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 14px 36px rgba(22,33,45,.08)",
                                },
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2, sm: 2.75 }, pl: { xs: 2.5, sm: 3.25 }, "&:last-child": { pb: { xs: 2, sm: 2.75 } } }}>
                                <Stack spacing={1.75}>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="flex-start"
                                        justifyContent="space-between"
                                        useFlexGap
                                        flexDirection={{ xs: "column", md: "row" }}
                                    >
                                        <Box sx={{ minWidth: 0, flex: 1 }}>
                                            <Stack
                                                direction="row"
                                                spacing={1.25}
                                                alignItems="center"
                                                useFlexGap
                                                flexWrap="wrap"
                                                sx={{
                                                    mb: 1.25,
                                                    color: "text.secondary",
                                                    fontFamily: (theme) => theme.fonts.mono,
                                                    fontSize: ".62rem",
                                                    fontWeight: 800,
                                                    letterSpacing: ".1em",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: accent }} />
                                                <Box component="span">{t("exercises.repoMeta", { index: String(index + 1).padStart(2, "0") })}</Box>
                                                <Box component="span" sx={{ width: 22, height: 1, bgcolor: "divider" }} />
                                                <Box component="span">{repository.topicLabels?.[0] || t("exercises.practiceMeta")}</Box>
                                            </Stack>
                                            <Typography
                                                variant="h5"
                                                component="h3"
                                                sx={{ letterSpacing: "-.055em", lineHeight: .95, mb: .8, overflowWrap: "anywhere" }}
                                            >
                                                {repository.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55, maxWidth: "none" }}>
                                                {getStaticExerciseDescription(repository.name, language) ||
                                                    repository.description ||
                                                    t("exercises.fallbackDescription")}
                                            </Typography>
                                        </Box>

                                        <Button
                                            variant="outlined"
                                            component={Link}
                                            href={repository.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            size="small"
                                            startIcon={<GitHubIcon fontSize="small" />}
                                            endIcon={
                                                <OpenInNewRoundedIcon
                                                    sx={{ fontSize: 14, transform: "translateY(-2px)" }}
                                                />
                                            }
                                            sx={actionButtonSx}
                                        >
                                            {t("exercises.openOnGithub")}
                                        </Button>
                                    </Stack>

                                    {Array.isArray(repository.topicLabels) &&
                                    repository.topicLabels.length > 0 ? (
                                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                            {repository.topicLabels.slice(0, 8).map((topic) => (
                                                <Chip
                                                    key={`${repository.id}-topic-${topic}`}
                                                    label={topic}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: "action.selected",
                                                        color: "primary.main",
                                                        borderRadius: 1,
                                                        fontSize: ".66rem",
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    ) : null}

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{ color: "text.secondary" }}
                                        useFlexGap
                                        flexWrap="wrap"
                                    >
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <StarBorderRoundedIcon sx={{ fontSize: 18 }} />
                                            <Typography variant="caption">
                                                {repository.stargazers_count ?? 0}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <CallSplitRoundedIcon sx={{ fontSize: 17 }} />
                                            <Typography variant="caption">
                                                {repository.forks_count ?? 0}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="caption">
                                            {t("exercises.updated", { date: formatUpdatedDate(repository.updated_at) })}
                                        </Typography>
                                    </Stack>

                                    {Array.isArray(repository.languageBreakdown) &&
                                    repository.languageBreakdown.length > 0 ? (
                                        <Stack spacing={0.75}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    width: "min(760px, 100%)",
                                                    height: 10,
                                                    borderRadius: 999,
                                                    overflow: "hidden",
                                                    bgcolor: "action.hover",
                                                    border: "1px solid",
                                                    borderColor: "rgba(23,32,42,.06)",
                                                }}
                                            >
                                                {repository.languageBreakdown.map((item, index) => (
                                                    <Box
                                                        key={`${repository.id}-bar-${item.language}`}
                                                        sx={{
                                                            width: `${Math.max(item.percentage, 2)}%`,
                                                            bgcolor: getLanguageColor(
                                                                item.language,
                                                                index
                                                            ),
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                            <Stack
                                                direction="row"
                                                spacing={1.5}
                                                useFlexGap
                                                flexWrap="wrap"
                                                alignItems="center"
                                            >
                                                {repository.languageBreakdown.map((item, index) => (
                                                    <Stack
                                                        key={`${repository.id}-legend-${item.language}`}
                                                        direction="row"
                                                        spacing={0.5}
                                                        alignItems="center"
                                                    >
                                                        <FiberManualRecordRoundedIcon
                                                            sx={{
                                                                fontSize: 10,
                                                                color: getLanguageColor(
                                                                    item.language,
                                                                    index
                                                                ),
                                                            }}
                                                        />
                                                        <Typography variant="caption">
                                                            {item.language} {item.percentage.toFixed(1)}%
                                                        </Typography>
                                                    </Stack>
                                                ))}
                                            </Stack>
                                        </Stack>
                                    ) : null}
                                </Stack>
                            </CardContent>
                        </Card>
                        );
                    })}
                </Stack>

                {showLoadMoreLoading ? (
                    <Stack spacing={2}>
                        {[0, 1].map((index) => (
                            <Card key={`loading-${index}`} component="article" variant="outlined" sx={{ p: 2.5 }}>
                                <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                                    <Stack spacing={1.25}>
                                        <Skeleton variant="text" width="40%" height={30} />
                                        <Skeleton variant="text" width="100%" />
                                        <Skeleton variant="rounded" width={110} height={22} />
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                ) : null}

                {!showInitialLoading && items.length > 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mt: .5,
                            color: "text.secondary",
                            fontFamily: (theme) => theme.fonts.mono,
                            fontSize: ".58rem",
                            fontWeight: 800,
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            "&::before": { content: '""', height: 1, flex: 1, bgcolor: "divider" },
                            "&::after": { content: '""', height: 1, flex: 1, bgcolor: "divider" },
                        }}
                    >
                        <Box component="span">{t("exercises.footerLabel")}</Box>
                    </Box>
                ) : null}

                {canShowLoadMore ? (
                    <Stack direction="row" justifyContent="center" sx={{ pt: 1 }}>
                        <Button
                            variant="contained"
                            onClick={onLoadMore}
                            disabled={isLoading || !hasInitialized}
                            sx={actionButtonSx}
                        >
                            {isLoading && items.length > 0
                                ? t("exercises.loading")
                                : error
                                    ? t("exercises.retry")
                                    : t("exercises.loadMore")}
                        </Button>
                    </Stack>
                ) : null}
            </Stack>
        </Box>
    );
}
