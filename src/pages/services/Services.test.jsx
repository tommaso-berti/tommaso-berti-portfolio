import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import CapabilityCard from "../../features/mission-ui/CapabilityCard.jsx";
import Services from "./Services.jsx";
import makeTheme from "../../styles/theme.js";

const services = [
    { kicker: "PRODUCT SYSTEM / WEB", title: "Web applications", description: "Responsive product interfaces.", tags: ["React", "TypeScript", "PWA", "Design system"], signalStart: "UI", signalEnd: "DEPLOY" },
    { kicker: "DATA SYSTEM / CONTROL", title: "Dashboards", description: "Readable product data.", tags: ["Realtime"], signalStart: "DATA", signalEnd: "CONTROL" },
    { kicker: "SERVICE LAYER / CONNECT", title: "APIs & integrations", description: "Connected systems.", tags: ["REST"], signalStart: "INPUT", signalEnd: "OUTPUT" },
    { kicker: "FLOW SYSTEM / AUTOMATE", title: "Automation tools", description: "Reduced manual work.", tags: ["Jobs"], signalStart: "TRIGGER", signalEnd: "ACTION" },
];

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options) => {
            if (key === "items" && options?.returnObjects) return services;
            if (key === "matrix.rows" && options?.returnObjects) return [{ label: "Responsive UI", values: ["core", "core", "none", "none"] }];
            if (key === "matrix.columns" && options?.returnObjects) return ["WEB", "DASHBOARD", "API", "AUTOMATION"];
            if (key === "scope.newProject.chips" && options?.returnObjects) return ["MVP", "Prototype"];
            if (key === "scope.existing.rows" && options?.returnObjects) return [{ key: "REFINE", description: "Improve workflows." }];
            if (key === "delivery.items" && options?.returnObjects) return [{ label: "code", title: "Maintainable structure", description: "Readable components.", foot: "structure" }];
            return {
                eyebrow: "04 // CAPABILITIES", title: "What I can build", note: "SELECTED SERVICES", activeLabel: "SELECTED MODULE", interactionHint: "Hover for details", revision: "REV.04", cta: "Start a project",
                "sectionLabels.capabilities": "CAPABILITIES", "sectionLabels.matrix": "SERVICE MATRIX", "sectionLabels.scope": "COLLABORATION SCOPE", "sectionLabels.delivery": "DELIVERY", "sectionLabels.method": "WORKING METHOD", "sectionLabels.contact": "CONTACT",
                "matrix.label": "capability matrix", "matrix.title": "What each module can include", "matrix.note": "Legend", "matrix.legend": "Core, optional, not primary", "matrix.ariaLabel": "Capability matrix", "matrix.capability": "Capability", "matrix.values.core": "Included", "matrix.values.optional": "Optional", "matrix.values.none": "Not primary",
                "scope.label": "collaboration scope", "scope.title": "Where I can contribute", "scope.note": "flexible", "scope.newProject.label": "new project", "scope.newProject.title": "A first version", "scope.newProject.description": "From an idea.", "scope.existing.label": "existing system",
                "delivery.label": "delivery", "delivery.title": "Ready to use", "delivery.note": "standard", "method.label": "working method", "method.title": "How I work", "method.description": "See my method.", "method.cta": "Open method", "finalCta.label": "contact", "finalCta.title": "Have something to build?", "finalCta.description": "Tell me about it.", "finalCta.cta": "Contact", footer: "public interface"
            }[key] ?? key;
        },
    }),
}));

const item = {
    code: "01",
    title: "Web applications",
    description: "Responsive product interfaces.",
    kicker: "PRODUCT SYSTEM / WEB",
    tags: ["React", "TypeScript"],
    signalStart: "UI",
    signalEnd: "DEPLOY",
    activeLabel: "SELECTED MODULE",
};

function renderCard(props) {
    return render(<ThemeProvider theme={makeTheme("light")}><CapabilityCard {...props} /></ThemeProvider>);
}

describe("CapabilityCard", () => {
    it("renders collapsed details and expands them on hover and focus", () => {
        const onActivate = vi.fn();
        const onDeactivate = vi.fn();
        const { rerender } = renderCard({ ...item, active: false, onActivate, onDeactivate });
        const control = screen.getByRole("button", { name: /web applications/i });

        expect(control).toHaveAttribute("aria-expanded", "false");
        expect(screen.queryByText("React")).toBeInTheDocument();
        fireEvent.mouseEnter(control);
        expect(onActivate).toHaveBeenCalledWith("01");
        fireEvent.focus(control);
        expect(onActivate).toHaveBeenCalledWith("01");

        rerender(<ThemeProvider theme={makeTheme("light")}><CapabilityCard {...item} active onActivate={onActivate} onDeactivate={onDeactivate} /></ThemeProvider>);
        expect(control).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByText("SELECTED MODULE")).toBeVisible();
        fireEvent.mouseLeave(control);
        expect(onDeactivate).toHaveBeenCalledWith("01");
    });
});

describe("Services", () => {
    it("exposes six numbered service sections as scroll targets", () => {
        const { container } = render(<ThemeProvider theme={makeTheme("light")}><MemoryRouter><Services /></MemoryRouter></ThemeProvider>);

        expect(container.querySelectorAll("[data-scroll-section]")).toHaveLength(7);
        const headings = [
            ["SRV-01", "CAPABILITIES"],
            ["SRV-02", "SERVICE MATRIX"],
            ["SRV-03", "COLLABORATION SCOPE"],
            ["SRV-04", "DELIVERY"],
            ["SRV-05", "WORKING METHOD"],
            ["SRV-06", "CONTACT"],
        ];
        for (const [code, label] of headings) {
            expect(screen.getByText(`${code} // ${label}`)).toBeInTheDocument();
        }
    });

    it("links the selected service to the matrix and keeps the click selection", () => {
        render(<ThemeProvider theme={makeTheme("light")}><MemoryRouter><Services /></MemoryRouter></ThemeProvider>);
        const cards = screen.getAllByRole("button").filter((button) => button.hasAttribute("aria-expanded"));

        expect(cards).toHaveLength(4);
        expect(screen.getAllByText("A1")).toHaveLength(1);
        expect(screen.getAllByText("D2")).toHaveLength(1);
        expect(screen.getAllByText("I3")).toHaveLength(1);
        expect(screen.getAllByText("F4")).toHaveLength(1);
        expect(cards[0]).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("Design system")).toBeVisible();
        expect(screen.getByRole("columnheader", { name: "WEB" })).toHaveClass("active");
        expect(screen.queryByText(/05 \/\/ capability matrix/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/hover for details/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/capability system \/\/ rev\.05/i)).not.toBeInTheDocument();
        fireEvent.mouseEnter(cards[2]);
        expect(screen.getByRole("columnheader", { name: "API" })).toHaveClass("active");
        fireEvent.mouseLeave(cards[2], { relatedTarget: screen.getByRole("table") });
        expect(screen.getByRole("columnheader", { name: "API" })).toHaveClass("active");
        fireEvent.mouseLeave(screen.getByTestId("service-selection-area"));
        expect(screen.getByRole("columnheader", { name: "WEB" })).toHaveClass("active");
        fireEvent.mouseEnter(cards[1]);
        expect(screen.getByRole("columnheader", { name: "DASHBOARD" })).toHaveClass("active");
        expect(cards[1]).toHaveAttribute("aria-expanded", "true");
        fireEvent.click(cards[1]);
        fireEvent.mouseLeave(cards[1]);
        expect(cards[1]).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("columnheader", { name: "DASHBOARD" })).toHaveClass("active");
        expect(screen.getByRole("link", { name: /open method/i })).toHaveAttribute("href", "/about#method");
        expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
    });
});
