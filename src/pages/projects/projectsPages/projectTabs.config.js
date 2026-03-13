/**
 * @typedef {Object} ProjectTabDefinition
 * @property {"all" | "main" | "side" | "practice"} id
 * @property {string} labelKey
 */

/** @type {ProjectTabDefinition[]} */
export const PROJECT_TABS = [
    { id: "all", labelKey: "all_overline" },
    { id: "main", labelKey: "main_overline" },
    { id: "side", labelKey: "side_overline" },
    { id: "practice", labelKey: "practice_overline" },
];
