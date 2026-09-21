import { describe, expect, it } from "vitest";
import { createOrbitConfig } from "./celestialMap.utils.js";

describe("createOrbitConfig", () => {
    it("creates deterministic, varied orbital defaults", () => {
        const first = createOrbitConfig({ id: "one" }, 0);
        const second = createOrbitConfig({ id: "two" }, 1);
        expect(createOrbitConfig({ id: "one" }, 0)).toEqual(first);
        expect(second.phase).not.toBe(first.phase);
        expect(second.radius).toBeGreaterThan(first.radius);
    });

    it("keeps explicit orbit values and accent", () => {
        const orbit = createOrbitConfig({ accent: "#abcdef", orbit: { radius: 333, size: 20, speed: 1 } }, 2);
        expect(orbit).toMatchObject({ accent: "#abcdef", radius: 333, size: 20, speed: 1 });
    });
});
