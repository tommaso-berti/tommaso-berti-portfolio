import fs from "fs";
import path from "path";

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    args[key.slice(2)] = argv[i + 1];
    i += 1;
  }
  return args;
}

function categorizeCommits(commits) {
  const categories = {
    features: [],
    fixes: [],
    refactor: [],
    breaking: [],
    misc: [],
  };

  for (const commit of commits) {
    const subject = `${commit.subject || ""}`.trim();
    const body = `${commit.body || ""}`;
    const lower = subject.toLowerCase();
    const hasBreaking = /breaking change|!:/.test(`${subject}\n${body}`.toLowerCase());

    if (hasBreaking) {
      categories.breaking.push(commit);
      continue;
    }
    if (lower.startsWith("feat")) {
      categories.features.push(commit);
      continue;
    }
    if (lower.startsWith("fix")) {
      categories.fixes.push(commit);
      continue;
    }
    if (lower.startsWith("refactor") || lower.startsWith("perf") || lower.startsWith("chore")) {
      categories.refactor.push(commit);
      continue;
    }
    categories.misc.push(commit);
  }

  return categories;
}

function formatCommitLine(commit) {
  const subject = commit.subject || "(no subject)";
  return `- ${subject} (${commit.shortSha})`;
}

function sectionFromCommits(commits, emptyLine) {
  if (!commits.length) return [emptyLine];
  return commits.map(formatCommitLine);
}

function buildFallbackMarkdown(payload, version) {
  const c = categorizeCommits(payload.commits || []);
  const changedFilesPreview = (payload.changedFiles || []).slice(0, 20).map((f) => `- ${f}`);

  const it = [
    `# Release Notes ${version}`,
    "",
    "## Italiano",
    "### Overview",
    `- Rilascio generato da commit nel range \`${payload.range}\`.`,
    `- Commit inclusi: ${(payload.commits || []).length}. File modificati: ${(payload.changedFiles || []).length}.`,
    "",
    "### Nuove funzionalita",
    ...sectionFromCommits(c.features, "- Nessuna nuova funzionalita rilevata."),
    "",
    "### Bug Fixes",
    ...sectionFromCommits(c.fixes, "- Nessun bug fix rilevato."),
    "",
    "### Refactor & Engineering",
    ...sectionFromCommits([...c.refactor, ...c.misc], "- Nessuna attivita di refactor/engineering rilevata."),
    "",
    "### Breaking Changes",
    ...sectionFromCommits(c.breaking, "- Nessuna breaking change rilevata."),
    "",
    "### Migration Notes",
    "- Nessuna migrazione richiesta in base ai commit disponibili.",
    "",
    "### Known Limitations",
    "- Generazione in fallback senza sintesi AI: contenuto derivato direttamente dai commit.",
    "",
    "### Diff & Commit Range",
    `- Range: \`${payload.range}\``,
    `- Compare URL: ${payload.compareUrl || "N/A"}`,
    ...((changedFilesPreview.length > 0) ? ["- File principali:", ...changedFilesPreview] : ["- Nessun file cambiato rilevato."]),
    "",
    "## English",
    "### Overview",
    `- Release generated from commits in range \`${payload.range}\`.`,
    `- Included commits: ${(payload.commits || []).length}. Changed files: ${(payload.changedFiles || []).length}.`,
    "",
    "### New Features",
    ...sectionFromCommits(c.features, "- No new features detected."),
    "",
    "### Bug Fixes",
    ...sectionFromCommits(c.fixes, "- No bug fixes detected."),
    "",
    "### Refactor & Engineering",
    ...sectionFromCommits([...c.refactor, ...c.misc], "- No refactor/engineering activity detected."),
    "",
    "### Breaking Changes",
    ...sectionFromCommits(c.breaking, "- No breaking changes detected."),
    "",
    "### Migration Notes",
    "- No migration steps required based on available commits.",
    "",
    "### Known Limitations",
    "- Fallback mode without AI synthesis: content is directly derived from commits.",
    "",
    "### Diff & Commit Range",
    `- Range: \`${payload.range}\``,
    `- Compare URL: ${payload.compareUrl || "N/A"}`,
  ];

  return `${it.join("\n")}\n`;
}

function extractResponseText(json) {
  if (typeof json?.output_text === "string" && json.output_text.trim()) return json.output_text;
  if (!Array.isArray(json?.output)) return "";

  const parts = [];
  for (const item of json.output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const c of content) {
      if (c?.type === "output_text" && typeof c?.text === "string") parts.push(c.text);
    }
  }
  return parts.join("\n").trim();
}

function hasMinimumSections(text) {
  const required = [
    "## Italiano",
    "### Overview",
    "### Nuove funzionalita",
    "### Bug Fixes",
    "### Refactor & Engineering",
    "### Breaking Changes",
    "### Migration Notes",
    "### Known Limitations",
    "### Diff & Commit Range",
    "## English",
    "### New Features",
  ];
  return required.every((marker) => text.includes(marker));
}

async function generateWithOpenAI({ model, apiKey, prompt }) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  return extractResponseText(data);
}

async function main() {
  const args = parseArgs(process.argv);

  const payloadPath = args.payload;
  const outPath = args.out;
  const templatePath = args.template;
  const version = args.version || "v0.0.0";

  if (!payloadPath || !outPath || !templatePath) {
    throw new Error("Missing required args: --payload --out --template");
  }

  const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
  const template = fs.readFileSync(templatePath, "utf8");

  const prompt = template
    .replace("{{VERSION}}", version)
    .replace("{{PAYLOAD_JSON}}", JSON.stringify(payload, null, 2));

  let markdown = "";
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.RELEASE_NOTES_MODEL || "gpt-5-mini";

  if (apiKey) {
    try {
      markdown = await generateWithOpenAI({ model, apiKey, prompt });
      if (!hasMinimumSections(markdown)) {
        throw new Error("Generated output does not include required sections.");
      }
    } catch (error) {
      console.error(`[release-notes] AI generation failed: ${error.message}`);
      markdown = buildFallbackMarkdown(payload, version);
    }
  } else {
    console.warn("[release-notes] OPENAI_API_KEY not found. Using fallback generator.");
    markdown = buildFallbackMarkdown(payload, version);
  }

  const outDir = path.dirname(outPath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, `${markdown.trim()}\n`, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
