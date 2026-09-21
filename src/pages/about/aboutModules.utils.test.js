import { describe, expect, it } from "vitest";
import { getAboutModuleFromHash } from "./aboutModules.utils.js";

describe("getAboutModuleFromHash", () => {
    it("keeps existing About anchors in their personnel modules", () => {
        expect(getAboutModuleFromHash("#tech-skills")).toBe("identity");
        expect(getAboutModuleFromHash("#study-and-experience")).toBe("development");
        expect(getAboutModuleFromHash("#hobbies")).toBe("beyond");
    });
});
