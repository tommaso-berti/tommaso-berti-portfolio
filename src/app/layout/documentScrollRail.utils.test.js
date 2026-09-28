import { beforeEach, describe, expect, it, vi } from "vitest";
import { getActiveScrollSection, getDocumentScrollSections, getScrollRailProgress } from "./documentScrollRail.utils.js";

describe("document scroll rail section model", () => {
    beforeEach(() => {
        window.scrollY = 0;
    });

    it("keeps one target per top-level section and offsets it below the fixed header", () => {
        const main = document.createElement("main");
        main.innerHTML = `
            <section data-scroll-section data-scroll-label="Opening">
                <h2>Opening</h2>
                <div data-scroll-section data-scroll-label="Nested heading">Nested</div>
            </section>
            <section data-scroll-section data-scroll-label="Second section">Second</section>
        `;
        const sections = main.querySelectorAll(":scope > [data-scroll-section]");
        vi.spyOn(sections[1], "getBoundingClientRect").mockReturnValue({ top: 760 });

        const model = getDocumentScrollSections(main, 1200, ["Start", "End"]);

        expect(model.items).toEqual([
            { label: "Opening", scrollTop: 0 },
            { label: "Second section", scrollTop: 648 },
        ]);
    });

    it("activates the latest section whose scroll anchor has been reached", () => {
        const items = [
            { label: "Opening", scrollTop: 0 },
            { label: "First section", scrollTop: 300 },
            { label: "Second section", scrollTop: 760 },
        ];

        expect(getActiveScrollSection(items, 299)).toBe(0);
        expect(getActiveScrollSection(items, 300)).toBe(1);
        expect(getActiveScrollSection(items, 761)).toBe(2);
    });

    it("fills the rail continuously between section anchors", () => {
        const items = [
            { label: "Opening", scrollTop: 0 },
            { label: "First section", scrollTop: 300 },
            { label: "Second section", scrollTop: 900 },
        ];

        expect(getScrollRailProgress(items, 150)).toBeCloseTo(0.25);
        expect(getScrollRailProgress(items, 600)).toBeCloseTo(0.75);
        expect(getScrollRailProgress(items, 900)).toBe(1);
    });
});
