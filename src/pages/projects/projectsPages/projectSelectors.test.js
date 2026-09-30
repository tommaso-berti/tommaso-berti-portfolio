import { describe, expect, it } from "vitest";

import {
    buildProjectPreviewModel,
    buildMissionModel,
    buildCelestialMapItems,
    buildProjectDetailsModel,
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

    it("builds a mission model from real project configuration", () => {
        const model = buildMissionModel(getProjectById("logra"), (key) => key, 0);
        expect(model.overline).toContain("01");
        expect(model.technologies.length).toBeGreaterThan(0);
    });

    it("builds WattDaCar links and explicit roadmap states", () => {
        const project = getProjectById("wattdacar");
        const t = (key, options) => options?.returnObjects ? [] : `translated:${key}`;
        const preview = buildProjectPreviewModel(project, t);
        const details = buildProjectDetailsModel(project, t, t);

        expect(project.category).toBe("main");
        expect(getProjectsByCategory("main").slice(0, 2).map(({ id }) => id)).toEqual([
            "logra",
            "wattdacar",
        ]);
        expect(project.statusKey).toBe("wattdacar.betaStatus");
        expect(preview.statusLabel).toBe("translated:wattdacar.betaStatus");
        expect(preview.secondaryAction).toEqual({
            label: "translated:wattdacar.openRestricted",
            href: "https://wattdacar.tommasoberti.com",
        });
        expect(preview.githubAction.label).toBe("translated:wattdacar.privateRepository");
        expect(details.searchMechanicsTitle).toBe("translated:search_mechanics_title");
        expect(details.roadmap.map(({ status }) => status)).toEqual([
            "done",
            "done",
            "done",
            "planned",
        ]);
    });

    it("builds map items from the complete project catalog", () => {
        const items = buildCelestialMapItems((key) => key);
        expect(items).toHaveLength(getProjectsByCategory("all").length);
        expect(items[0]).toMatchObject({ id: "logra", detailPath: "/projects/logra" });
    });
});
