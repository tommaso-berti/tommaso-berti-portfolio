import { useLanguage } from "../contexts/LanguageContext.jsx";
import { translations } from "../i18n";

const PATH_SEGMENTS_CACHE = new Map();
const FALLBACK_LANGUAGE = "en";

function getPathSegments(path) {
    if (!PATH_SEGMENTS_CACHE.has(path)) {
        PATH_SEGMENTS_CACHE.set(path, path.split("."));
    }
    return PATH_SEGMENTS_CACHE.get(path);
}

function resolvePathValue(tree, path) {
    if (!tree) return undefined;

    const segments = getPathSegments(path);
    let current = tree;

    for (const segment of segments) {
        if (current == null || typeof current !== "object" || !(segment in current)) {
            return undefined;
        }
        current = current[segment];
    }

    return current;
}

function resolveWithLanguageFallback(path, language) {
    const primary = resolvePathValue(translations[language], path);
    if (primary !== undefined) return primary;

    if (language !== FALLBACK_LANGUAGE) {
        return resolvePathValue(translations[FALLBACK_LANGUAGE], path);
    }

    return undefined;
}

function interpolateText(text, values) {
    if (typeof text !== "string" || !values || typeof values !== "object") {
        return text;
    }

    return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key) => {
        const value = values[key];
        return value === undefined || value === null ? match : String(value);
    });
}

export function useTranslation(baseKey) {
    const { language } = useLanguage();

    const t = (key, optionsOrFallback = {}) => {
        const options =
            typeof optionsOrFallback === "object" &&
            optionsOrFallback !== null &&
            !Array.isArray(optionsOrFallback)
                ? optionsOrFallback
                : {};
        const fallbackValue =
            typeof optionsOrFallback === "string" || typeof optionsOrFallback === "number"
                ? optionsOrFallback
                : options.defaultValue;
        const fullKey = baseKey ? `${baseKey}.${key}` : key;
        const hasCount = typeof options.count === "number";
        const pluralKey = hasCount
            ? `${fullKey}_${options.count === 1 ? "one" : "other"}`
            : null;

        let value;
        if (pluralKey) {
            value = resolveWithLanguageFallback(pluralKey, language);
        }
        if (value === undefined) {
            value = resolveWithLanguageFallback(fullKey, language);
        }

        if (options.returnObjects) {
            if (value !== undefined) return value;
            if (fallbackValue !== undefined) return fallbackValue;
            return fullKey;
        }

        if (typeof value === "string") {
            return interpolateText(value, {
                ...(typeof options.values === "object" && options.values !== null ? options.values : {}),
                ...(hasCount ? { count: options.count } : {}),
            });
        }

        if (typeof value === "number") {
            return value;
        }

        if (fallbackValue !== undefined) {
            return fallbackValue;
        }

        return fullKey;
    };

    return { t };
}
