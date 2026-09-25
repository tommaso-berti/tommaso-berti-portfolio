export function getDocumentScrollSections(root, maxScroll, fallbackLabels, offset = 112) {
    const nodes = Array.from(root.querySelectorAll("[data-scroll-section]")).filter(
        (node) => !node.parentElement?.closest("[data-scroll-section]")
    );
    const targetItems = nodes.map((node, index) => ({
        label: node.dataset.scrollLabel || node.querySelector("h1, h2, h3")?.textContent?.trim() || fallbackLabels[index % fallbackLabels.length],
        scrollTop: index === 0 ? 0 : Math.min(maxScroll, Math.max(0, node.getBoundingClientRect().top + window.scrollY - offset)),
    }));
    const scrollable = maxScroll > 8;
    const items = scrollable && targetItems.length >= 2
        ? targetItems
        : [
            { label: fallbackLabels[0], scrollTop: 0 },
            { label: fallbackLabels[fallbackLabels.length - 1], scrollTop: maxScroll },
        ];

    return { items, maxScroll, scrollable };
}

export function getActiveScrollSection(items, scrollTop) {
    return items.reduce((active, item, index) => item.scrollTop <= scrollTop ? index : active, 0);
}

export function getScrollRailProgress(items, scrollTop) {
    if (items.length < 2 || scrollTop <= items[0].scrollTop) return 0;
    if (scrollTop >= items[items.length - 1].scrollTop) return 1;

    const sectionIndex = items.findIndex((item, index) => index < items.length - 1 && scrollTop < items[index + 1].scrollTop);
    if (sectionIndex < 0) return 1;

    const start = items[sectionIndex].scrollTop;
    const end = items[sectionIndex + 1].scrollTop;
    const sectionProgress = (scrollTop - start) / (end - start);
    return (sectionIndex + sectionProgress) / (items.length - 1);
}
