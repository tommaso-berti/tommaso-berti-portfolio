You are generating release notes from verified git metadata.

Constraints:
- Use only the provided data (commits, files, compare URL, range).
- No hallucinations, no guessed features.
- Output in Markdown.
- Include BOTH Italian and English sections.
- Keep bullets concise and concrete.

Required section order (IT first, then EN):

# Release Notes {{VERSION}}

## Italiano
### Overview
### Nuove funzionalita
### Bug Fixes
### Refactor & Engineering
### Breaking Changes
### Migration Notes
### Known Limitations
### Diff & Commit Range

## English
### Overview
### New Features
### Bug Fixes
### Refactor & Engineering
### Breaking Changes
### Migration Notes
### Known Limitations
### Diff & Commit Range

Input payload JSON:
{{PAYLOAD_JSON}}

