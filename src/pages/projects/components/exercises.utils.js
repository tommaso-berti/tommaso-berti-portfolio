import { EXERCISE_DESCRIPTIONS } from "./exercises.descriptions.js";

const LANGUAGE_COLORS = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    "C++": "#f34b7d",
    C: "#555555",
    Java: "#b07219",
    Python: "#3572A5",
    Shell: "#89e051",
    "C#": "#178600",
    PHP: "#4F5D95",
    Go: "#00ADD8",
    Ruby: "#701516",
    Rust: "#dea584",
    Dart: "#00B4AB",
    Kotlin: "#A97BFF",
    Swift: "#ffac45",
};

function normalizeRepositoryKey(name) {
    return `${name ?? ""}`.toLowerCase().trim();
}

export function getStaticExerciseDescription(repositoryName, language) {
    const repoKey = normalizeRepositoryKey(repositoryName);
    if (!repoKey) return "";

    const selectedLanguage =
        typeof language === "string" && language.toLowerCase().startsWith("it") ? "it" : "en";

    return (
        EXERCISE_DESCRIPTIONS[selectedLanguage]?.[repoKey] ??
        EXERCISE_DESCRIPTIONS.en?.[repoKey] ??
        ""
    );
}

export function getLanguageColor(language, index = 0) {
    if (LANGUAGE_COLORS[language]) return LANGUAGE_COLORS[language];
    const fallback = ["#6e7781", "#1f6feb", "#8957e5", "#2da44e", "#bf8700"];
    return fallback[index % fallback.length];
}
