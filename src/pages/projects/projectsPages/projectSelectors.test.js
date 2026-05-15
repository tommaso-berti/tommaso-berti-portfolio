import { describe, expect, it } from "vitest";

import {
    buildProjectPreviewModel,
    getProjectById,
    getProjectsByCategory,
} from "./projectSelectors.js";

describe("projectSelectors", () => {
    it("filters projects by category", () => {
        const mainProjects = getProjectsByCategory("main");
        expect(mainProjects.length).toBeGreaterThan(0);
        expect(mainProjects.every((project) => project.category === "main")).toBe(true);
    });

    it("returns all projects for the all tab", () => {
        expect(getProjectsByCategory("all").length).toBeGreaterThan(0);
    });

    it("resolves a project by id", () => {
        expect(getProjectById("logra")?.id).toBe("logra");
        expect(getProjectById("missing-id")).toBeUndefined();
    });

    it("builds a preview model from translation keys", () => {
        const project = getProjectById("logra");
        const tProjects = (key) => `translated:${key}`;

        const model = buildProjectPreviewModel(project, tProjects);

        expect(model.id).toBe("logra");
        expect(model.title).toBe("translated:logra.title");
        expect(model.primaryAction.label).toBe("translated:primaryAction");
    });
});
