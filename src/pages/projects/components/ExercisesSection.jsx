import { useCallback, useEffect, useRef, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    CircularProgress,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import { useTranslation } from "../../../hooks/useTranslation.js";

const GITHUB_STARRED_ENDPOINT = "https://api.github.com/users/tommaso-berti/starred";
const PER_PAGE = 12;
const EXERCISE_TOPICS = new Set([
    "exercise",
    "exercises",
    "kata",
    "challenge",
    "challenges",
    "practice",
    "learning",
    "study",
]);

export default function ExercisesSection({ isActive }) {
    const { t } = useTranslation("pages.projects");
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [hasInitialized, setHasInitialized] = useState(false);
    const abortRef = useRef(null);

    const fetchPage = useCallback(async (nextPage) => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        setError(null);

        if (abortRef.current) {
            abortRef.current.abort();
        }
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const response = await fetch(
                `${GITHUB_STARRED_ENDPOINT}?per_page=${PER_PAGE}&page=${nextPage}`,
                { signal: controller.signal }
            );

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const repositories = Array.isArray(data) ? data : [];
            // Some starred responses may omit topics for specific repos; without topics we exclude the repo.
            const exerciseRepositories = repositories.filter((repo) => {
                if (!repo || repo.fork) return false;

                const topics = Array.isArray(repo.topics) ? repo.topics : [];
                if (topics.length === 0) return false;

                return topics
                    .map((topic) => `${topic}`.toLowerCase())
                    .some((topic) => EXERCISE_TOPICS.has(topic));
            });

            setItems((prevItems) => [...prevItems, ...exerciseRepositories]);
            setPage(nextPage);

            const reachedRawEnd = repositories.length < PER_PAGE;
            if (reachedRawEnd) {
                setHasMore(false);
            }
        } catch (fetchError) {
            if (fetchError?.name === "AbortError") return;
            setError(fetchError);
        } finally {
            setIsLoading(false);
        }
    }, [hasMore, isLoading]);

    useEffect(() => {
        if (!isActive || hasInitialized) return;
        setHasInitialized(true);
        void fetchPage(1);
    }, [fetchPage, hasInitialized, isActive]);

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    const onLoadMore = () => {
        if (isLoading || !hasMore) return;
        void fetchPage(page + 1);
    };

    const showInitialLoading = isActive && isLoading && items.length === 0;

    return (
        <Box
            component="section"
            aria-live="polite"
            sx={{ display: isActive ? "block" : "none", py: 4 }}
        >
            <Stack spacing={2}>
                <Typography variant="h4" component="h2">
                    {t("exercises.title")}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    {t("exercises.subtitle")}
                </Typography>

                {error && (
                    <Alert severity="error">
                        {t("exercises.error")}
                    </Alert>
                )}

                {showInitialLoading ? (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <CircularProgress size={20} />
                        <Typography variant="body2">{t("exercises.loading")}</Typography>
                    </Stack>
                ) : null}

                {items.length === 0 && !isLoading && !error && hasInitialized ? (
                    <Typography variant="body1" color="text.secondary">
                        {t("exercises.empty")}
                    </Typography>
                ) : null}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, minmax(0, 1fr))",
                        },
                        gap: 2,
                    }}
                >
                    {items.map((repository) => (
                        <Card key={repository.id} variant="outlined" sx={{ height: "100%" }}>
                            <CardContent>
                                <Stack spacing={1.25}>
                                    <Typography variant="h6" component="h3">
                                        {repository.name}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {repository.description || t("exercises.fallbackDescription")}
                                    </Typography>

                                    <Chip
                                        label={repository.language || t("exercises.fallbackLanguage")}
                                        size="small"
                                        sx={{ width: "fit-content" }}
                                    />
                                </Stack>
                            </CardContent>

                            <CardActions>
                                <Button
                                    component={Link}
                                    href={repository.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="small"
                                >
                                    {t("exercises.openOnGithub")}
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>

                {hasMore ? (
                    <Stack direction="row" justifyContent="center" sx={{ pt: 1 }}>
                        <Button
                            variant="contained"
                            onClick={onLoadMore}
                            disabled={isLoading || !hasInitialized}
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
