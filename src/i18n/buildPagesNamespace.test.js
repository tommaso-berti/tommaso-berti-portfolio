import { describe, expect, it } from "vitest";

import { buildPagesNamespace } from "./buildPagesNamespace.js";

describe("buildPagesNamespace", () => {
    it("assembles page sections under stable keys", () => {
        const namespace = buildPagesNamespace({
            home: { title: "Home" },
            contact: { title: "Contact" },
            about: { title: "About" },
            projects: { title: "Projects" },
            blog: { title: "Blog" },
            cv: { title: "CV" },
        });

        expect(namespace.home.title).toBe("Home");
        expect(namespace.projects.title).toBe("Projects");
        expect(namespace.cv.title).toBe("CV");
    });
});
