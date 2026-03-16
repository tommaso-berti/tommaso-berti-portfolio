import fs from "fs/promises";
import path from "path";

const GITHUB_OWNER = "tommaso-berti";
const GITHUB_REPO = "tommaso-berti-portfolio";
const GITHUB_API = "https://api.github.com";
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
const SEMVER_TAG_REGEX = /^v(\d+)\.(\d+)\.(\d+)$/;
const MAX_RELEASE_HISTORY = 11;
const MAX_RELEASE_ENTRIES = 10;

function parseSemverTag(tagName) {
    const match = `${tagName ?? ""}`.trim().match(SEMVER_TAG_REGEX);
    if (!match) return null;

    return {
        tag: match[0],
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
    };
}

function compareSemverDesc(a, b) {
    if (a.major !== b.major) return b.major - a.major;
    if (a.minor !== b.minor) return b.minor - a.minor;
    return b.patch - a.patch;
}

function resolveReleaseType(currentTag, previousTag) {
    const current = parseSemverTag(currentTag);
    const previous = parseSemverTag(previousTag);

    if (!current || !previous) return "patch";
    if (current.major !== previous.major) return "major";
    if (current.minor !== previous.minor) return "minor";
    return "patch";
}

function normalizeCommitSubject(message) {
    return `${message ?? ""}`
        .split("\n")[0]
        .replace(/\s+/g, " ")
        .trim();
}

function shouldKeepSubject(subject) {
    if (!subject) return false;
    const lower = subject.toLowerCase();
    if (lower.startsWith("merge ")) return false;
    if (lower.includes("create and push release tag")) return false;
    if (/^(#|\[)(major|minor|patch)\]?$/i.test(subject)) return false;
    return true;
}

function mapAndFilterCommits(commits) {
    const seen = new Set();
    return (Array.isArray(commits) ? commits : [])
        .map((commit) => {
            const subject = normalizeCommitSubject(commit?.commit?.message);
            const author = commit?.commit?.author?.name || "unknown";
            const date = commit?.commit?.author?.date || "";

            return {
                sha: commit?.sha || "",
                subject,
                url: commit?.html_url || "",
                author,
                date,
            };
        })
        .filter((entry) => {
            if (!shouldKeepSubject(entry.subject)) return false;
            const key = entry.subject.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        })
        .slice(0, MAX_RELEASE_ENTRIES);
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

function createHeaders(token) {
    const headers = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };

    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
}

async function fetchJson(url, token) {
    const response = await fetch(url, {
        headers: createHeaders(token),
    });

    if (!response.ok) {
        throw new Error(`GitHub API ${response.status} on ${url}`);
    }

    return response.json();
}

function isExerciseRepository(repo) {
    if (!repo || repo.fork) return false;
    const topics = Array.isArray(repo.topics) ? repo.topics : [];
    if (topics.length === 0) return false;

    return topics
        .map((topic) => `${topic}`.toLowerCase())
        .some((topic) => EXERCISE_TOPICS.has(topic));
}

async function fetchLanguageBreakdown(languagesUrl, token) {
    if (!languagesUrl) return [];
    const languagesData = await fetchJson(languagesUrl, token);
    const languageEntries = Object.entries(languagesData ?? {})
        .filter(([language]) => Boolean(language))
        .map(([language, bytes]) => ({
            language,
            bytes: Number(bytes) || 0,
        }))
        .sort((a, b) => b.bytes - a.bytes);

    const totalBytes = languageEntries.reduce((sum, item) => sum + item.bytes, 0);
    return languageEntries.map((item) => ({
        language: item.language,
        bytes: item.bytes,
        percentage: totalBytes > 0 ? (item.bytes / totalBytes) * 100 : 0,
    }));
}

async function buildExercisesJson(token) {
    const allStarred = [];
    const perPage = 50;

    for (let page = 1; page <= 10; page += 1) {
        const data = await fetchJson(
            `${GITHUB_API}/users/${GITHUB_OWNER}/starred?per_page=${perPage}&page=${page}`,
            token
        );
        const repos = Array.isArray(data) ? data : [];
        if (repos.length === 0) break;
        allStarred.push(...repos);
        if (repos.length < perPage) break;
    }

    const exerciseRepos = allStarred.filter(isExerciseRepository);

    const items = await Promise.all(
        exerciseRepos.map(async (repo) => {
            const topics = Array.isArray(repo.topics) ? repo.topics : [];
            const topicLabels = topics
                .map((topic) => `${topic}`.toLowerCase())
                .filter((topic) => !EXERCISE_TOPICS.has(topic))
                .filter((topic) => !LOW_SIGNAL_TOPICS.has(topic))
                .map(toDisplayTopic);

            const languageBreakdown = await fetchLanguageBreakdown(repo.languages_url, token);

            return {
                id: repo.id,
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description || "",
                topics,
                topicLabels,
                stargazers_count: repo.stargazers_count ?? 0,
                forks_count: repo.forks_count ?? 0,
                updated_at: repo.updated_at || "",
                languageBreakdown,
            };
        })
    );

    return {
        generatedAt: new Date().toISOString(),
        items,
    };
}

async function buildReleaseNotesJson(token) {
    const tags = await fetchJson(
        `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/tags?per_page=100`,
        token
    );
    const semverTags = (Array.isArray(tags) ? tags : [])
        .map((tag) => parseSemverTag(tag?.name))
        .filter(Boolean)
        .sort(compareSemverDesc)
        .slice(0, MAX_RELEASE_HISTORY);

    const history = [];

    for (let index = 0; index < semverTags.length; index += 1) {
        const current = semverTags[index];
        const previous = semverTags[index + 1] ?? null;

        if (previous) {
            const compareData = await fetchJson(
                `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/compare/${previous.tag}...${current.tag}`,
                token
            );

            history.push({
                tag: current.tag,
                version: current.tag.replace(/^v/, ""),
                previousTag: previous.tag,
                releaseType: resolveReleaseType(current.tag, previous.tag),
                entries: mapAndFilterCommits(compareData?.commits),
                source: "compare",
            });
            continue;
        }

        const commits = await fetchJson(
            `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?sha=${current.tag}&per_page=20`,
            token
        );

        history.push({
            tag: current.tag,
            version: current.tag.replace(/^v/, ""),
            previousTag: null,
            releaseType: "patch",
            entries: mapAndFilterCommits(commits),
            source: "commits",
        });
    }

    const latest = history[0] ?? null;
    return {
        generatedAt: new Date().toISOString(),
        latestTag: latest?.tag ?? "",
        latestVersion: latest?.version ?? "",
        previousTag: latest?.previousTag ?? null,
        releaseType: latest?.releaseType ?? "patch",
        entries: latest?.entries ?? [],
        history,
    };
}

async function writeJsonFile(outputPath, payload) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

async function main() {
    const repoRoot = process.cwd();
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

    const exercises = await buildExercisesJson(token);
    const releaseNotes = await buildReleaseNotesJson(token);

    await writeJsonFile(path.join(repoRoot, "public/data/exercises.json"), exercises);
    await writeJsonFile(path.join(repoRoot, "public/data/release-notes.json"), releaseNotes);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

