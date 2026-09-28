import { describe, expect, it } from "vitest";
import { getMethodProcessId, METHOD_PROCESS_IDS, METHOD_PROCESS_META } from "./methodProcess.config.js";

describe("method process configuration", () => {
    it("keeps the three working phases in demo order", () => {
        expect(METHOD_PROCESS_IDS).toEqual(["clarity", "pragmatism", "iteration"]);
        expect(METHOD_PROCESS_IDS.map((id) => METHOD_PROCESS_META[id].schematic)).toEqual(["framing", "tradeoff", "iteration"]);
    });

    it("falls back to the first phase for unknown indexes", () => {
        expect(getMethodProcessId(0)).toBe("clarity");
        expect(getMethodProcessId(9)).toBe("clarity");
    });
});
