import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { describe, expect, it } from "vitest";
import makeTheme from "../../styles/theme.js";
import MethodModule from "./MethodModule.jsx";

const schematicLabels = { title: "Schematic", code: "DIAG / 01", input: "INPUT", core: "CORE", output: "OUTPUT", objective: "OBJECTIVE", context: "CONTEXT", constraints: "CONSTRAINTS", real: "REAL", scope: "SCOPE", path: "PATH", synth: "synth", define: "define", paths: "PATHS", matrix: "MATRIX", delivery: "DELIVERY", optionA: "OPTION A", optionB: "OPTION B", optionC: "OPTION C", time: "TIME", cost: "COST", maintenance: "MAINT", low: "LOW", mid: "MID", high: "HIGH", select: "select", useful: "USEFUL", progress: "PROGRESS", loop: "LOOP", check: "CHECK", ship: "SHIP", observe: "OBSERVE", refine: "REFINE", learn: "LEARN", collect: "collect", audit: "audit", planAction: "plan", feedback: "FEEDBACK", friction: "FRICTION", plan: "PLAN", footer: "FOOTER" };
const principles = [
    { code: "01 // CLARITY", title: "Start from the real problem", body: "Clarify first.", panelCode: "PHASE 01", state: "Active analysis", detail: "First detail.", focus: ["Context"], telemetry: { left: "Context", right: "Constraints" }, schematicLabels },
    { code: "02 // PRAGMATISM", title: "Prefer useful progress", body: "Progress usefully.", panelCode: "PHASE 02", state: "Pragmatic execution", detail: "Second detail.", focus: ["Value"], telemetry: { left: "Trade-off", right: "Delivery" }, schematicLabels },
    { code: "03 // ITERATION", title: "Improve deliberately", body: "Iterate deliberately.", panelCode: "PHASE 03", state: "Continuous improvement", detail: "Third detail.", focus: ["Feedback"], telemetry: { left: "Feedback", right: "Refine" }, schematicLabels },
];

function t(key, options) {
    if (key === "personnel.principles" && options?.returnObjects) return principles;
    return { "personnel.methodUi.processLabel": "Working phase selection", "personnel.methodUi.focusLabel": "Focus", "personnel.methodUi.selectionLabel": "Process selection" }[key] || key;
}

describe("MethodModule", () => {
    it("renders and switches between the three working phases", () => {
        render(<ThemeProvider theme={makeTheme("light")}><MethodModule t={t} /></ThemeProvider>);
        const phases = screen.getAllByRole("button");

        expect(phases).toHaveLength(3);
        expect(phases[0]).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("First detail.")).toBeVisible();

        fireEvent.click(phases[1]);
        expect(phases[0]).toHaveAttribute("aria-pressed", "false");
        expect(phases[1]).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("Second detail.")).toBeVisible();
    });
});
