import Stack from "@mui/material/Stack";
import { useTranslation } from "../../hooks/useTranslation.js";
import Bio from './Bio.jsx';
import Hobbies from './Hobbies.jsx';
import Experience from './Experience.jsx';
import TechSkills from "./TechSkills.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function useScrollToHash(offsetRem = 0, deps = []) {
    const { hash } = useLocation();

    useEffect(() => {
        const t = setTimeout(() => {
            const rootFontSize = parseFloat(
                getComputedStyle(document.documentElement).fontSize
            ) || 16;
            const offsetPx = offsetRem * rootFontSize;

            if (hash) {
                const id = decodeURIComponent(hash.slice(1));
                const el = document.getElementById(id);

                if (el) {
                    const top =
                        el.getBoundingClientRect().top +
                        window.scrollY -
                        offsetPx;

                    window.scrollTo({
                        top,
                        behavior: "smooth",
                    });

                    el.focus?.();
                }
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        }, 0);

        return () => clearTimeout(t);
    }, [hash, offsetRem, ...deps]);
}

export default function About() {
    const { t } = useTranslation();

    useScrollToHash(6);

    return (
        <Stack id="about" component="article">
            <Bio />
            <Hobbies />
            <Experience />
            <TechSkills />
        </Stack>
    );
}
