/**
 * @template T
 * @param {Array<T & { areaKey?: string }>} certifications
 * @returns {Array<[string, Array<T & { areaKey?: string }>]>}
 */
export function groupCertificationsByArea(certifications) {
    /** @type {Record<string, Array<T & { areaKey?: string }>>} */
    const grouped = {};

    for (const cert of certifications) {
        const key = cert.areaKey || "other";
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(cert);
    }

    return Object.entries(grouped);
}

/**
 * @param {string} value
 * @returns {string}
 */
export function formatIssuedAt(value) {
    if (!value) return "";
    const [year = "", month = ""] = `${value}`.split("-");
    return month ? `${month}/${year}` : `${value}`;
}

