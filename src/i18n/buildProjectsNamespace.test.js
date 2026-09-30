import { describe, expect, it } from "vitest";

import { buildProjectsNamespace, PROJECT_IDS } from "./buildProjectsNamespace.js";

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

    it("includes WattDaCar in the lazy project locale bundle", () => {
        const namespace = buildProjectsNamespace(
            {},
            { wattdacar: { title: "WattDaCar" } }
        );

        expect(PROJECT_IDS).toContain("wattdacar");
        expect(namespace.wattdacar.title).toBe("WattDaCar");
    });
});
