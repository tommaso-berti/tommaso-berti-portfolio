import { useEffect, useState } from "react";

const GITHUB_OWNER = "tommaso-berti";
const GITHUB_REPO = "tommaso-berti-portfolio";
const GITHUB_API = "https://api.github.com";
const SEMVER_TAG_REGEX = /^v(\d+)\.(\d+)\.(\d+)$/;
const MAX_ENTRIES = 10;

/**
 * @typedef {Object} ReleaseNotesEntry
 * @property {string} sha
 * @property {string} subject
 * @property {string} url
 * @property {string} author
 * @property {string} date
 */

/**
 * @typedef {Object} LatestReleaseNotes
 * @property {string} tag
 * @property {string} version
 * @property {string | null} previousTag
 * @property {"major" | "minor" | "patch"} releaseType
 * @property {ReleaseNotesEntry[]} entries
 * @property {"compare" | "commits" | "none"} source
 * @property {string | null} error
 */

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
        .slice(0, MAX_ENTRIES);
}

async function fetchJson(url, signal) {
    const response = await fetch(url, {
        signal,
        headers: {
            Accept: "application/vnd.github+json",
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

async function fetchLatestReleaseNotes(signal) {
    const tagsUrl = `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/tags?per_page=10`;
    const tags = await fetchJson(tagsUrl, signal);

    const semverTags = tags
        .map((tag) => parseSemverTag(tag?.name))
        .filter(Boolean)
        .sort(compareSemverDesc);

    const latest = semverTags[0];
    const previous = semverTags[1] ?? null;

    if (!latest) {
        return {
            tag: "",
            version: "",
            previousTag: null,
            releaseType: "patch",
            entries: [],
            source: "none",
            error: "NO_TAGS",
        };
    }

    if (previous) {
        const compareUrl = `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/compare/${previous.tag}...${latest.tag}`;
        const compareData = await fetchJson(compareUrl, signal);

        return {
            tag: latest.tag,
            version: latest.tag.replace(/^v/, ""),
            previousTag: previous.tag,
            releaseType: resolveReleaseType(latest.tag, previous.tag),
            entries: mapAndFilterCommits(compareData?.commits),
            source: "compare",
            error: null,
        };
    }

    const commitsUrl = `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?sha=${latest.tag}&per_page=20`;
    const commits = await fetchJson(commitsUrl, signal);

    return {
        tag: latest.tag,
        version: latest.tag.replace(/^v/, ""),
        previousTag: null,
        releaseType: "patch",
        entries: mapAndFilterCommits(commits),
        source: "commits",
        error: null,
    };
}

export function useLatestReleaseNotes(enabled = true) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (!enabled) return;

        const controller = new AbortController();
        let active = true;

        setIsLoading(true);
        setError(null);

        fetchLatestReleaseNotes(controller.signal)
            .then((payload) => {
                if (!active) return;
                setData(payload);
                setIsLoading(false);
            })
            .catch((err) => {
                if (!active || err?.name === "AbortError") return;
                setError(err);
                setIsLoading(false);
            });

        return () => {
            active = false;
            controller.abort();
        };
    }, [enabled, refreshKey]);

    const refetch = () => setRefreshKey((value) => value + 1);

    return { data, isLoading, error, refetch };
}
