import { describe, expect, it } from "vitest";

import { resolvePageDefinition } from "./appDefinitions.js";

describe("resolvePageDefinition", () => {
    it("resolves the home page", () => {
        expect(resolvePageDefinition("/")?.id).toBe("home");
    });

    it("resolves projects listing and detail routes", () => {
        expect(resolvePageDefinition("/projects")?.id).toBe("projects");
        expect(resolvePageDefinition("/projects/logra")?.id).toBe("project-details");
    });

    it("resolves static pages", () => {
        expect(resolvePageDefinition("/about")?.id).toBe("about");
        expect(resolvePageDefinition("/contact")?.id).toBe("contact");
        expect(resolvePageDefinition("/cv")?.id).toBe("cv");
    });

    it("resolves unknown paths to the not-found page", () => {
        expect(resolvePageDefinition("/does-not-exist")?.id).toBe("not-found");
    });
});
