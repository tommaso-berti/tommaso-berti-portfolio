import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import CapabilityCard from "../../features/mission-ui/CapabilityCard.jsx";
import Services from "./Services.jsx";
import makeTheme from "../../styles/theme.js";

const services = [
    { kicker: "PRODUCT SYSTEM / WEB", title: "Web applications", description: "Responsive product interfaces.", tags: ["React"], signalStart: "UI", signalEnd: "DEPLOY" },
    { kicker: "DATA SYSTEM / CONTROL", title: "Dashboards", description: "Readable product data.", tags: ["Realtime"], signalStart: "DATA", signalEnd: "CONTROL" },
    { kicker: "SERVICE LAYER / CONNECT", title: "APIs & integrations", description: "Connected systems.", tags: ["REST"], signalStart: "INPUT", signalEnd: "OUTPUT" },
    { kicker: "FLOW SYSTEM / AUTOMATE", title: "Automation tools", description: "Reduced manual work.", tags: ["Jobs"], signalStart: "TRIGGER", signalEnd: "ACTION" },
];

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options) => {
            if (key === "items" && options?.returnObjects) return services;
            return { eyebrow: "04 // CAPABILITIES", title: "What I can build", note: "SELECTED SERVICES", activeLabel: "SELECTED MODULE", interactionHint: "Hover for details", revision: "REV.04", cta: "Start a project" }[key] ?? key;
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
    it("activates only the hovered card and clears it on leave", () => {
        render(<ThemeProvider theme={makeTheme("light")}><MemoryRouter><Services /></MemoryRouter></ThemeProvider>);
        const cards = screen.getAllByRole("button").filter((button) => button.hasAttribute("aria-expanded"));

        expect(cards).toHaveLength(4);
        expect(screen.getAllByText("A1")).toHaveLength(1);
        expect(screen.getAllByText("D2")).toHaveLength(1);
        expect(screen.getAllByText("I3")).toHaveLength(1);
        expect(screen.getAllByText("F4")).toHaveLength(1);
        expect(cards.filter((card) => card.getAttribute("aria-expanded") === "true")).toHaveLength(0);
        fireEvent.mouseEnter(cards[1]);
        expect(cards[0]).toHaveAttribute("aria-expanded", "false");
        expect(cards[1]).toHaveAttribute("aria-expanded", "true");
        fireEvent.mouseLeave(cards[1]);
        expect(cards.some((card) => card.getAttribute("aria-expanded") === "true")).toBe(false);
    });
});
