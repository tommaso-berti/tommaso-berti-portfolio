import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash(offsetRem = 0, deps = []) {
    const { hash } = useLocation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const rootFontSize =
                parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
            const offsetPx = offsetRem * rootFontSize;

            if (hash) {
                const id = decodeURIComponent(hash.slice(1));
                const element = document.getElementById(id);

                if (element) {
                    const top = element.getBoundingClientRect().top + window.scrollY - offsetPx;

                    window.scrollTo({
                        top,
                        behavior: "smooth",
                    });

                    element.focus?.();
                }
                return;
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [hash, offsetRem, ...deps]);
}
