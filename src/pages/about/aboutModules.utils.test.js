import { describe, expect, it } from "vitest";
import { ABOUT_MODULES, getAboutModuleFromHash } from "./aboutModules.utils.js";

describe("About modules", () => {
    it("keeps the six modules in document order", () => {
        expect(ABOUT_MODULES).toEqual(["identity", "technical", "certifications", "development", "method", "beyond"]);
    });
});

describe("getAboutModuleFromHash", () => {
    it("keeps existing About anchors in their personnel modules", () => {
        expect(getAboutModuleFromHash("#bio")).toBe("identity");
        expect(getAboutModuleFromHash("#tech-skills")).toBe("technical");
        expect(getAboutModuleFromHash("#certifications")).toBe("certifications");
        expect(getAboutModuleFromHash("#study-and-experience")).toBe("development");
        expect(getAboutModuleFromHash("#hobbies")).toBe("beyond");
    });
});
