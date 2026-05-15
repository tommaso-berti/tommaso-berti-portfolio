import { describe, expect, it } from "vitest";

import { buildProjectsNamespace } from "./buildProjectsNamespace.js";

describe("buildProjectsNamespace", () => {
    it("merges shared copy with per-project fragments", () => {
        const namespace = buildProjectsNamespace(
            { title: "Projects", no_projects: "Empty" },
            {
                logra: { title: "Logra", description: "Gaming library" },
            }
        );

        expect(namespace.title).toBe("Projects");
        expect(namespace.logra.title).toBe("Logra");
        expect(namespace.logra.description).toBe("Gaming library");
    });
});
