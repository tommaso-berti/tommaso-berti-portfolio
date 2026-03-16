import { useCallback, useEffect, useRef, useState } from "react";

const EXERCISES_DATA_URL = "/data/exercises.json";
const PER_PAGE = 12;

export function useExercisesData(isActive) {
    const [allItems, setAllItems] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [hasInitialized, setHasInitialized] = useState(false);
    const abortRef = useRef(null);

    const fetchAllItems = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const response = await fetch(EXERCISES_DATA_URL, { signal: controller.signal });
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const payload = await response.json();
            const repositories = Array.isArray(payload?.items) ? payload.items : [];
            setAllItems(repositories);
            setItems(repositories.slice(0, PER_PAGE));
            setHasMore(repositories.length > PER_PAGE);
        } catch (fetchError) {
            if (fetchError?.name === "AbortError") return;
            setError(fetchError);
            setAllItems([]);
            setItems([]);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isActive || hasInitialized) return;
        setHasInitialized(true);
        void fetchAllItems();
    }, [fetchAllItems, hasInitialized, isActive]);

    useEffect(
        () => () => {
            if (abortRef.current) abortRef.current.abort();
        },
        []
    );

    const onLoadMore = () => {
        if (isLoading || !hasMore) return;
        const nextLength = items.length + PER_PAGE;
        setItems(allItems.slice(0, nextLength));
        setHasMore(nextLength < allItems.length);
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
