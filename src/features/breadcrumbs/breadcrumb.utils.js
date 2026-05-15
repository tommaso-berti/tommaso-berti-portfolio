export const MISSING = "__missing__";

export function normalizeToken(value) {
    return `${value ?? ""}`.trim().toLowerCase();
}

export function normalizeSegment(value) {
    return decodeURIComponent(`${value ?? ""}`).replace(/^\/+|\/+$/g, "");
}

export function prettifyId(value) {
    return normalizeSegment(value).replace(/[-_]+/g, " ");
}

export function getTranslatedLabel(id, t) {
    const normalizedId = normalizeSegment(id);
    if (!normalizedId) return "";

    const navLabel = t(`common:nav.${normalizedId}`, { defaultValue: MISSING });
    if (navLabel !== MISSING) return navLabel.toLowerCase();

    const projectLabel = t(`pages:projects.${normalizedId}.title`, { defaultValue: MISSING });
    if (projectLabel !== MISSING) return projectLabel.toLowerCase();

    return prettifyId(normalizedId).toLowerCase();
}
