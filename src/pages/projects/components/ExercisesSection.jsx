import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
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
import { useTranslation } from "../../../hooks/useTranslation.js";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { getLanguageColor, getStaticExerciseDescription } from "./exercises.utils.js";
import { useExercisesData } from "./useExercisesData.js";

export default function ExercisesSection({ isActive }) {
    const { t } = useTranslation("pages.projects");
    const { language } = useLanguage();
    const { items, isLoading, hasMore, error, hasInitialized, onLoadMore } =
        useExercisesData(isActive);

    const showInitialLoading = isActive && isLoading && items.length === 0;
    const showLoadMoreLoading = isActive && isLoading && items.length > 0;
    const canShowLoadMore = hasInitialized && !showInitialLoading && hasMore;
    const actionButtonSx = {
        transition: "0.25s",
        whiteSpace: "nowrap",
        "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
        },
    };

    return (
        <Box component="section" aria-live="polite" sx={{ display: isActive ? "block" : "none", py: 4 }}>
            <Stack spacing={2}>
                <Typography variant="h4" component="h2">
                    {t("exercises.title")}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    {t("exercises.subtitle")}
                </Typography>

                {error ? <Alert severity="error">{t("exercises.error")}</Alert> : null}

                {showInitialLoading ? (
                    <Stack spacing={2}>
                        {[0, 1, 2].map((index) => (
                            <Card key={index} variant="outlined">
                                <CardContent>
                                    <Stack spacing={1.25}>
                                        <Skeleton variant="text" width="45%" height={34} />
                                        <Skeleton variant="text" width="100%" />
                                        <Skeleton variant="text" width="85%" />
                                        <Skeleton variant="rounded" width={120} height={24} />
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Skeleton variant="rounded" width={120} height={32} />
                                </CardActions>
                            </Card>
                        ))}
                    </Stack>
                ) : null}

                {items.length === 0 && !isLoading && !error && hasInitialized ? (
                    <Typography variant="body1" color="text.secondary">
                        {t("exercises.empty")}
                    </Typography>
                ) : null}

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
                    {items.map((repository) => (
                        <Card
                            key={repository.id}
                            variant="outlined"
                            sx={{
                                height: "100%",
                                borderColor: "divider",
                                borderRadius: 1.5,
                                boxShadow: "none",
                            }}
                        >
                            <CardContent>
                                <Stack spacing={1.5}>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        justifyContent="space-between"
                                        useFlexGap
                                        flexWrap="wrap"
                                    >
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{ fontWeight: 600, color: "primary.main" }}
                                        >
                                            {repository.name}
                                        </Typography>

                                        <Button
                                            variant="text"
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
                                            GitHub
                                        </Button>
                                    </Stack>

                                    <Typography variant="body2" color="text.secondary">
                                        {getStaticExerciseDescription(repository.name, language) ||
                                            repository.description ||
                                            t("exercises.fallbackDescription")}
                                    </Typography>

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
                                                        borderRadius: 2,
                                                        fontSize: "0.72rem",
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
                                            Updated{" "}
                                            {repository.updated_at
                                                ? new Date(repository.updated_at).toLocaleDateString()
                                                : "-"}
                                        </Typography>
                                    </Stack>

                                    {Array.isArray(repository.languageBreakdown) &&
                                    repository.languageBreakdown.length > 0 ? (
                                        <Stack spacing={0.75}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    width: { xs: "100%", sm: "50%" },
                                                    height: 8,
                                                    borderRadius: 999,
                                                    overflow: "hidden",
                                                    bgcolor: "action.hover",
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
                    ))}
                </Box>

                {showLoadMoreLoading ? (
                    <Stack spacing={2}>
                        {[0, 1].map((index) => (
                            <Card key={`loading-${index}`} variant="outlined">
                                <CardContent>
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
