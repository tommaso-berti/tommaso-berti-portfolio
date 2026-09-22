import { describe, expect, it } from "vitest";
import { getBrandIconDefinition } from "../../config/brandIcons.js";
import { getTechnicalBlueprint, TECH_BLUEPRINTS } from "./technicalBlueprints.config.js";
import { buildConnectorPaths } from "./technicalBlueprints.utils.js";

describe("technical blueprint configuration", () => {
    it("contains the five original blueprint assets", () => {
        expect(TECH_BLUEPRINTS).toHaveLength(5);
        expect(TECH_BLUEPRINTS.map((item) => item.asset)).toEqual([
            "/assets/blueprints/iss.png",
            "/assets/blueprints/artemis.png",
            "/assets/blueprints/lso.png",
            "/assets/blueprints/saturn-V.png",
            "/assets/blueprints/dyson-sphere.png",
        ]);
    });

    it("keeps node ids unique and coordinates bounded", () => {
        TECH_BLUEPRINTS.forEach((blueprint) => {
            const ids = blueprint.nodes.map((node) => node.id);
            expect(new Set(ids).size).toBe(ids.length);
            blueprint.nodes.forEach((node) => {
                expect(node.dotX).toBeGreaterThanOrEqual(0);
                expect(node.dotX).toBeLessThanOrEqual(100);
                expect(node.dotY).toBeGreaterThanOrEqual(0);
                expect(node.dotY).toBeLessThanOrEqual(100);
                expect(getBrandIconDefinition(node.iconId).component).toBeDefined();
            });
        });
    });

    it("falls back to the first blueprint for an unknown system", () => {
        expect(getTechnicalBlueprint("missing")?.id).toBe("frontend");
    });

    it("builds a connector for every card/dot pair", () => {
        const rect = (left, top, width, height) => ({ left, top, width, height, right: left + width, bottom: top + height });
        const blueprint = getTechnicalBlueprint("frontend");
        const diagram = { getBoundingClientRect: () => rect(10, 20, 900, 600) };
        const cards = new Map(blueprint.nodes.map((node, index) => [node.id, { getBoundingClientRect: () => rect(node.side === "left" ? 20 : 850, 30 + index * 20, 40, 24) }]));
        const dots = new Map(blueprint.nodes.map((node, index) => [node.id, { getBoundingClientRect: () => rect(300 + index * 30, 180 + index * 25, 10, 10) }]));

        expect(buildConnectorPaths(diagram, cards, dots, blueprint)).toHaveLength(blueprint.nodes.length);
    });
});
