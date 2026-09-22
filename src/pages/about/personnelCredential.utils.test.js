import { describe, expect, it } from "vitest";
import { CREDENTIAL_FIELD_KEYS, normalizeTelemetry } from "./personnelCredential.utils.js";

describe("personnel credential model", () => {
    it("normalizes telemetry for the compact four-cell footer", () => {
        expect(normalizeTelemetry([
            { label: "BASE", value: "ITALY" },
            { label: "PROFILE", value: "VERIFIED", status: true },
            { label: "EMPTY", value: "" },
        ])).toEqual([
            { label: "BASE", value: "ITALY", status: false },
            { label: "PROFILE", value: "VERIFIED", status: true },
        ]);
    });

    it("keeps base and operating profile out of credential fields", () => {
        expect(CREDENTIAL_FIELD_KEYS).toEqual(["holder", "role", "base", "stack", "systems", "personality", "bio"]);
        expect(CREDENTIAL_FIELD_KEYS).not.toContain("summary");
    });
});
