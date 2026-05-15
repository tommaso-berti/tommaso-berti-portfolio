const PROJECT_IDS = ["codexpane", "ecommerce-rest-api", "artap", "portfolio", "logra"];

/**
 * Merges shared projects copy with per-project locale fragments.
 */
export function buildProjectsNamespace(shared, projectFragments = {}) {
    const projects = { ...shared };
    for (const id of PROJECT_IDS) {
        if (projectFragments[id]) {
            projects[id] = projectFragments[id];
        }
    }
    return projects;
}

export { PROJECT_IDS };
