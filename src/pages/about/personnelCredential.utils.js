export const CREDENTIAL_FIELD_KEYS = Object.freeze([
    "holder",
    "role",
    "base",
    "stack",
    "systems",
    "personality",
    "bio",
]);

export function normalizeTelemetry(items = []) {
    return items
        .filter((item) => item && item.label && item.value)
        .map((item) => ({
            label: item.label,
            value: item.value,
            status: item.status === true,
        }));
}
