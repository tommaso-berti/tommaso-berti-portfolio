import { useEffect, useRef, useState } from "react";

/**
 * Observes when an element enters the viewport (with optional root margin).
 */
export function useInViewport(options = {}) {
    const { rootMargin = "120px", threshold = 0.01, enabled = true } = options;
    const ref = useRef(null);
    const [isInViewport, setIsInViewport] = useState(false);

    useEffect(() => {
        if (!enabled || isInViewport) return undefined;

        const element = ref.current;
        if (!element || typeof IntersectionObserver === "undefined") {
            setIsInViewport(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setIsInViewport(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [enabled, isInViewport, rootMargin, threshold]);

    return { ref, isInViewport };
}
