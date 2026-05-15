import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

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

function loadLocaleTree(localeDir) {
    const files = readdirSync(localeDir).filter((entry) => entry.endsWith(".json"));
    return Object.fromEntries(
        files.map((fileName) => {
            const namespace = fileName.replace(/\.json$/u, "");
            const parsed = JSON.parse(readFileSync(join(localeDir, fileName), "utf8"));
            return [namespace, parsed];
        })
    );
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
    console.error("\nKeys present only in it.json:");
    for (const path of onlyInIt) {
        console.error(`- ${path}`);
    }
}

if (onlyInEn.length) {
    console.error("\nKeys present only in en.json:");
    for (const path of onlyInEn) {
        console.error(`- ${path}`);
    }
}

process.exit(1);
