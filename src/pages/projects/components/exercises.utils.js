import { EXERCISE_DESCRIPTIONS } from "./exercises.descriptions.js";

const EXERCISE_TOPICS = new Set([
    "exercise",
    "exercises",
    "kata",
    "challenge",
    "challenges",
    "practice",
    "learning",
    "study",
]);

const LOW_SIGNAL_TOPICS = new Set([
    "codecademy",
    "portfolio",
    "project",
    "projects",
    "learning",
    "study",
    "exercise",
    "exercises",
]);

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

export const GITHUB_STARRED_ENDPOINT = "https://api.github.com/users/tommaso-berti/starred";
export const PER_PAGE = 12;
export const GITHUB_HEADERS = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
};

function normalizeRepositoryKey(name) {
    return `${name ?? ""}`.toLowerCase().trim();
}

function toDisplayTopic(topic) {
    if (!topic) return "";

    const tokens = `${topic}`.split(/[-_]/g).filter(Boolean);
    return tokens
        .map((token) => {
            if (token.toLowerCase() === "api") return "API";
            if (token.toLowerCase() === "oauth") return "OAuth";
            if (token.toLowerCase() === "pkce") return "PKCE";
            if (token.toLowerCase() === "mvc") return "MVC";
            return token.charAt(0).toUpperCase() + token.slice(1);
        })
        .join(" ");
}

export function isExerciseRepository(repo) {
    if (!repo || repo.fork) return false;

    const topics = Array.isArray(repo.topics) ? repo.topics : [];
    if (topics.length === 0) return false;

    return topics
        .map((topic) => `${topic}`.toLowerCase())
        .some((topic) => EXERCISE_TOPICS.has(topic));
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

export async function fetchRepositoryMetadata(repository, signal) {
    const technologies = new Set();
    let languageBreakdown = [];

    const topicLabels = (Array.isArray(repository?.topics) ? repository.topics : [])
        .map((topic) => `${topic}`.toLowerCase())
        .filter((topic) => !EXERCISE_TOPICS.has(topic))
        .filter((topic) => !LOW_SIGNAL_TOPICS.has(topic))
        .map(toDisplayTopic);
    topicLabels.forEach((technology) => technologies.add(technology));

    try {
        if (repository?.languages_url) {
            const languagesResponse = await fetch(repository.languages_url, {
                headers: GITHUB_HEADERS,
                signal,
            });

            if (languagesResponse.ok) {
                const languagesData = await languagesResponse.json();
                const languageEntries = Object.entries(languagesData ?? {})
                    .filter(([language]) => Boolean(language))
                    .map(([language, bytes]) => ({
                        language,
                        bytes: Number(bytes) || 0,
                    }))
                    .sort((a, b) => b.bytes - a.bytes);

                const totalBytes = languageEntries.reduce((sum, item) => sum + item.bytes, 0);
                languageBreakdown = languageEntries.map((item) => ({
                    ...item,
                    percentage: totalBytes > 0 ? (item.bytes / totalBytes) * 100 : 0,
                }));

                languageBreakdown.forEach((item) => technologies.add(item.language));
            }
        }
    } catch {
        // Keep rendering other repo data when language API fails.
    }

    if (repository?.language) technologies.add(repository.language);

    return {
        technologies: Array.from(technologies).filter(Boolean),
        languageBreakdown,
        topicLabels,
    };
}

export function getLanguageColor(language, index = 0) {
    if (LANGUAGE_COLORS[language]) return LANGUAGE_COLORS[language];
    const fallback = ["#6e7781", "#1f6feb", "#8957e5", "#2da44e", "#bf8700"];
    return fallback[index % fallback.length];
}
