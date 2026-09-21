import { describe, expect, it } from "vitest";
import { buildContactMailto } from "./contact.utils.js";

describe("buildContactMailto", () => {
    it("encodes contact fields into the existing email channel", () => {
        const mailto = buildContactMailto({ name: "Ada", email: "ada@example.com", message: "Hello & welcome" });
        expect(mailto).toContain("tommaso.berti.15@gmail.com");
        expect(mailto).toContain("Hello%20%26%20welcome");
    });
});
