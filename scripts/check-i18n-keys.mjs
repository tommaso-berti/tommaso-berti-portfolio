import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PAGES_SECTIONS = ["home", "contact", "about", "projects", "blog", "cv"];

function collectLeafPaths(node, basePath = "", output = []) {
    if (node && typeof node === "object" && !Array.isArray(node)) {
        for (const key of Object.keys(node)) {
            const nextPath = basePath ? `${basePath}.${key}` : key;
            collectLeafPaths(node[key], nextPath, output);
        }
        return output;
    }

    output.push(basePath);
    return output;
}

function readJson(filePath) {
    return JSON.parse(readFileSync(filePath, "utf8"));
}

function loadPagesNamespace(localeDir) {
    const pagesDir = join(localeDir, "pages");
    if (!existsSync(pagesDir)) {
        return readJson(join(localeDir, "pages.json"));
    }

    return Object.fromEntries(
        PAGES_SECTIONS.map((section) => [section, readJson(join(pagesDir, `${section}.json`))])
    );
}

function loadLocaleTree(localeDir) {
    const files = readdirSync(localeDir).filter((entry) => entry.endsWith(".json"));
    const tree = Object.fromEntries(
        files.map((fileName) => {
            const namespace = fileName.replace(/\.json$/u, "");
            return [namespace, readJson(join(localeDir, fileName))];
        })
    );

    if (existsSync(join(localeDir, "pages"))) {
        tree.pages = loadPagesNamespace(localeDir);
    }

    return tree;
}

const it = loadLocaleTree(join(process.cwd(), "src/i18n/locales/it"));
const en = loadLocaleTree(join(process.cwd(), "src/i18n/locales/en"));

const itPaths = collectLeafPaths(it);
const enPaths = collectLeafPaths(en);

const itSet = new Set(itPaths);
const enSet = new Set(enPaths);

const onlyInIt = itPaths.filter((path) => !enSet.has(path));
const onlyInEn = enPaths.filter((path) => !itSet.has(path));

if (!onlyInIt.length && !onlyInEn.length) {
    console.log("i18n keys check: OK (it/en are aligned)");
    process.exit(0);
}

console.error("i18n keys check: FAILED");

if (onlyInIt.length) {
    console.error("\nKeys present only in it:");
    for (const path of onlyInIt) {
        console.error(`- ${path}`);
    }
}

if (onlyInEn.length) {
    console.error("\nKeys present only in en:");
    for (const path of onlyInEn) {
        console.error(`- ${path}`);
    }
}

process.exit(1);
