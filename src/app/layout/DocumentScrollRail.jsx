import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function getPageKey(pathname) {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/projects")) return "projects";
    const key = pathname.split("/").filter(Boolean)[0];
    return ["about", "services", "contact", "cv", "blog"].includes(key) ? key : "notFound";
}

export default function DocumentScrollRail() {
    const { pathname } = useLocation();
    const { t } = useTranslation("common");
    const { t: tAbout } = useTranslation("pages", { keyPrefix: "about" });
    const [progress, setProgress] = useState(0);
    const [sectionModel, setSectionModel] = useState({ items: [], maxScroll: 0, scrollable: false });
    const sectionModelRef = useRef(sectionModel);
    sectionModelRef.current = sectionModel;
    const pageKey = getPageKey(pathname);
    const pageLabel = pageKey === "notFound" ? t("notFound.title") : t(`nav.${pageKey}`);
    const railTitle = pageKey === "about" ? tAbout("personnel.archiveHeader") : t(`scrollRail.titles.${pageKey}`);
    const steps = t("scrollRail.steps", { returnObjects: true });
    const stepKey = Array.isArray(steps) ? steps.join("|") : String(steps);

    useEffect(() => {
        let frame = 0;
        const stepLabels = stepKey.split("|");
        const collectSections = () => {
            const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            const nodes = Array.from(document.querySelectorAll("[data-scroll-section]"));
            const scrollable = maxScroll > 8;
            const hasSectionTargets = scrollable && nodes.length >= 2;
            const targetItems = hasSectionTargets ? nodes.map((node, index) => ({
                    label: node.dataset.scrollLabel || node.querySelector("h1, h2, h3")?.textContent?.trim() || stepLabels[index % stepLabels.length],
                    scrollTop: index === 0 ? 0 : Math.min(maxScroll, Math.max(0, node.getBoundingClientRect().top + window.scrollY - 112)),
                })) : [];
            const distinctTargetItems = targetItems.filter((item, index) => index === 0 || item.scrollTop - targetItems[index - 1].scrollTop > 24);
            const targetsWithEndpoint = distinctTargetItems.length >= 2 && distinctTargetItems[distinctTargetItems.length - 1].scrollTop < maxScroll - 24
                ? [...distinctTargetItems, { label: stepLabels[stepLabels.length - 1], scrollTop: maxScroll }]
                : distinctTargetItems;
            const items = targetsWithEndpoint.length >= 2
                ? targetsWithEndpoint
                : [
                    { label: stepLabels[0], scrollTop: 0 },
                    { label: stepLabels[stepLabels.length - 1], scrollTop: maxScroll },
                ];
            setSectionModel({ items, maxScroll, scrollable });
            setProgress(scrollable ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 1);
        };
        const updateProgress = () => {
            frame = 0;
            const model = sectionModelRef.current;
            const maxScroll = model.maxScroll || Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            setProgress(model.scrollable ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : maxScroll > 8 ? 0 : 1);
        };
        const handleScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(updateProgress);
        };
        collectSections();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", collectSections);
        const observer = new MutationObserver(collectSections);
        observer.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", collectSections);
            observer.disconnect();
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [pathname, stepKey]);

    const items = sectionModel.items.length ? sectionModel.items : [{ label: steps[0], scrollTop: 0 }, { label: steps[steps.length - 1], scrollTop: 0 }];
    const activeStep = sectionModel.scrollable
        ? items.reduce((closest, item, index) => Math.abs(window.scrollY - item.scrollTop) < Math.abs(window.scrollY - items[closest].scrollTop) ? index : closest, 0)
        : progress >= 1 ? items.length - 1 : 0;
    const scrollToStep = (item) => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: item.scrollTop, behavior: reducedMotion ? "auto" : "smooth" });
    };

    return (
        <Box component="aside" aria-label={t("scrollRail.label", { page: railTitle })} sx={{ display: { xs: "none", xl: "flex" }, position: "fixed", top: "9rem", left: "calc(50% - 630px)", zIndex: 2, minHeight: "calc(100vh - 12rem)", justifyContent: "center", width: 32 }}>
            <Stack alignItems="center" spacing={2} sx={{ position: "relative", height: "min(620px, calc(100vh - 14rem))", py: 1 }}>
                <Typography sx={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "text.secondary", fontFamily: "monospace", fontSize: ".48rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {railTitle}
                </Typography>
                <Box sx={{ position: "relative", flex: 1, width: 16, minHeight: 240 }}>
                    <Box aria-hidden="true" sx={{ position: "absolute", top: 8, bottom: 8, left: "50%", width: 1, bgcolor: "divider", transform: "translateX(-50%)" }} />
                    <Box aria-hidden="true" sx={{ position: "absolute", top: 8, left: "50%", width: 1, height: "calc(100% - 16px)", bgcolor: "space.orange", transform: "translateX(-50%) scaleY(var(--scroll-progress))", transformOrigin: "top", "--scroll-progress": progress }} />
                    {items.map((item, index) => (
                        <ButtonBase
                            key={`${item.label}-${index}`}
                            component="button"
                            type="button"
                            aria-label={t("scrollRail.step", { page: pageLabel, step: item.label })}
                            aria-current={index === activeStep ? "step" : undefined}
                            onClick={() => scrollToStep(item)}
                            sx={{ position: "absolute", top: `${sectionModel.scrollable ? (item.scrollTop / Math.max(1, sectionModel.maxScroll)) * 100 : index === 0 ? 0 : 100}%`, left: "50%", width: 18, height: 18, borderRadius: "50%", transform: "translate(-50%, -50%)", "&:focus-visible": { outline: "2px solid", outlineColor: "space.blue", outlineOffset: 3 } }}
                        >
                            <Box aria-hidden="true" sx={{ width: index === activeStep ? 9 : 7, height: index === activeStep ? 9 : 7, border: "1px solid", borderColor: index === activeStep ? "space.orange" : "text.primary", borderRadius: "50%", bgcolor: index <= activeStep ? "space.orange" : "background.paper", transition: "background-color 180ms ease, border-color 180ms ease, width 180ms ease, height 180ms ease" }} />
                        </ButtonBase>
                    ))}
                </Box>
            </Stack>
        </Box>
    );
}
