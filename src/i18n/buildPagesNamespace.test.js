import { describe, expect, it } from "vitest";

import { buildPagesNamespace } from "./buildPagesNamespace.js";

describe("buildPagesNamespace", () => {
    it("assembles page sections under stable keys", () => {
        const namespace = buildPagesNamespace({
            home: { title: "Home" },
            contact: { title: "Contact" },
            services: { title: "Services" },
            systems: { title: "Systems" },
            about: { title: "About" },
            projects: { title: "Projects" },
            blog: { title: "Blog" },
            cv: { title: "CV" },
            style: { title: "Style" },
        });

        expect(namespace.home.title).toBe("Home");
        expect(namespace.projects.title).toBe("Projects");
        expect(namespace.services.title).toBe("Services");
        expect(namespace.systems.title).toBe("Systems");
        expect(namespace.cv.title).toBe("CV");
        expect(namespace.style.title).toBe("Style");
    });
});
