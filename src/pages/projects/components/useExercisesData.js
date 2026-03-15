import { useCallback, useEffect, useRef, useState } from "react";
import {
    fetchRepositoryMetadata,
    GITHUB_HEADERS,
    GITHUB_STARRED_ENDPOINT,
    isExerciseRepository,
    PER_PAGE,
} from "./exercises.utils.js";

export function useExercisesData(isActive) {
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

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            let currentPage = nextPage;
            let reachedEnd = false;
            const nextExerciseRepositories = [];

            // Build visible chunks as "12 exercise repos", scanning starred pages as needed.
            while (nextExerciseRepositories.length < PER_PAGE && !reachedEnd) {
                const response = await fetch(
                    `${GITHUB_STARRED_ENDPOINT}?per_page=${PER_PAGE}&page=${currentPage}`,
                    { headers: GITHUB_HEADERS, signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                const repositories = Array.isArray(data) ? data : [];
                const exerciseRepositories = repositories.filter(isExerciseRepository);

                nextExerciseRepositories.push(...exerciseRepositories);
                reachedEnd = repositories.length < PER_PAGE;
                if (!reachedEnd) currentPage += 1;
            }

            const repositoriesWithMetadata = await Promise.all(
                nextExerciseRepositories.map(async (repository) => {
                    const metadata = await fetchRepositoryMetadata(
                        repository,
                        controller.signal
                    );
                    return {
                        ...repository,
                        technologies: metadata.technologies,
                        languageBreakdown: metadata.languageBreakdown,
                        topicLabels: metadata.topicLabels,
                    };
                })
            );

            setItems((prevItems) => [...prevItems, ...repositoriesWithMetadata]);
            setPage(currentPage);
            setHasMore(!reachedEnd);
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

    useEffect(
        () => () => {
            if (abortRef.current) abortRef.current.abort();
        },
        []
    );

    const onLoadMore = () => {
        if (isLoading || !hasMore) return;
        void fetchPage(page + 1);
    };

    return {
        items,
        isLoading,
        hasMore,
        error,
        hasInitialized,
        onLoadMore,
    };
}
