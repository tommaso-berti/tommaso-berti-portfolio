export function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString();
}

export function resolveReleaseDate(item) {
    const entryDate = item?.entries?.find((entry) => entry?.date)?.date;
    return entryDate || item?.publishedAt || "";
}

export function extractLanguageSection(markdown, language) {
    const source = `${markdown ?? ""}`.trim();
    if (!source) return "";

    const topHeadingMatch = source.match(/^#\s+[^\n]+/m);
    const topHeading = topHeadingMatch ? topHeadingMatch[0].trim() : "";
    const targetHeading = language === "it" ? "## Italiano" : "## English";
    const alternateHeading = language === "it" ? "## English" : "## Italiano";

    const targetIndex = source.indexOf(targetHeading);
    if (targetIndex === -1) return source;

    const fromTarget = source.slice(targetIndex + targetHeading.length).trimStart();
    const nextMajorHeadingIndex = fromTarget.search(/\n#\s+/);
    const alternateIndex = fromTarget.indexOf(alternateHeading);

    let endIndex = fromTarget.length;
    if (alternateIndex !== -1) endIndex = Math.min(endIndex, alternateIndex);
    if (nextMajorHeadingIndex !== -1) endIndex = Math.min(endIndex, nextMajorHeadingIndex);

    const section = fromTarget
        .slice(0, endIndex)
        .replace(/^#\s+[^\n]+\n?/gm, "")
        .trim();
    if (!section) return topHeading || source;

    return topHeading ? `${topHeading}\n\n${section}` : section;
}
