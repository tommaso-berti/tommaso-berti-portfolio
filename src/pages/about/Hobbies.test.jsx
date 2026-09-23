import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { describe, expect, it, vi } from "vitest";
import makeTheme from "../../styles/theme.js";
import Hobbies from "./Hobbies.jsx";

const items = [
    { id: "volleyball", code: "A-01", kicker: "Team systems", title: "Volleyball", description: "Teamwork.", telemetry: "Read the game.", trait: "Quick decisions", mode: "Pressure / teamwork", tags: ["Teamwork"] },
    { id: "gaming", code: "B-02", kicker: "Digital worlds", title: "Gaming & technology", description: "Explore systems.", telemetry: "Creative worlds.", trait: "Exploration", mode: "Creativity / systems", tags: ["Tech"] },
    { id: "travel", code: "C-03", kicker: "Field notes", title: "Travel", description: "New perspectives.", telemetry: "Leave the familiar.", trait: "New perspectives", mode: "People / places", tags: ["Travel"] },
];

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const values = { title: "Hobbies", sectionLabel: "PERSONAL LOG", lead: "Outside code.", telemetry: { title: "Personal telemetry", live: "Live", trait: "Primary trait", mode: "Operating mode" }, footer: { route: "Code / Off-duty systems / Experience", legend: ["Team", "Explore", "Travel"] }, items };
            if (key === "footer.route") return values.footer.route;
            if (key === "footer.legend") return values.footer.legend;
            return values[key];
        },
    }),
}));

describe("Hobbies", () => {
    it("renders the three selectable hobby cards and updates telemetry", () => {
        render(<ThemeProvider theme={makeTheme("light")}><Hobbies embedded /></ThemeProvider>);

        const volleyball = screen.getByRole("button", { name: /volleyball/i });
        const travel = screen.getByRole("button", { name: /travel/i });
        expect(volleyball).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("Quick decisions")).toBeInTheDocument();

        fireEvent.click(travel);

        expect(volleyball).toHaveAttribute("aria-pressed", "false");
        expect(travel).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("New perspectives")).toBeInTheDocument();
        expect(screen.getByText("Leave the familiar.")).toBeInTheDocument();
    });
});
