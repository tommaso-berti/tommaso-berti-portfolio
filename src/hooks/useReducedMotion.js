import { useMediaQuery } from "@mui/material";

export function useReducedMotion() {
    return useMediaQuery("(prefers-reduced-motion: reduce)", { noSsr: true });
}
