import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { describe, expect, it, vi } from "vitest";
import makeTheme from "../../styles/theme.js";
import Hobbies from "./Hobbies.jsx";

const items = [
    { id: "volleyball", code: "A-01", kicker: "Team systems", title: "Volleyball", description: "Teamwork.", tags: ["Teamwork"] },
    { id: "gaming", code: "B-02", kicker: "Digital worlds", title: "Gaming & technology", description: "Explore systems.", tags: ["Tech"] },
    { id: "travel", code: "C-03", kicker: "Field notes", title: "Travel", description: "New perspectives.", tags: ["Travel"] },
];

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const values = { title: "Hobbies", sectionLabel: "PERSONAL LOG", lead: "Outside code.", footer: { route: "Code / Off-duty systems / Experience", legend: ["Team", "Explore", "Travel"] }, items };
            if (key === "footer.route") return values.footer.route;
            if (key === "footer.legend") return values.footer.legend;
            return values[key];
        },
    }),
}));

describe("Hobbies", () => {
    it("renders the three non-interactive hobby cards without telemetry", () => {
        render(<ThemeProvider theme={makeTheme("light")}><Hobbies embedded /></ThemeProvider>);

        expect(screen.getAllByRole("article")).toHaveLength(3);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(screen.queryByText("Personal telemetry")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Volleyball" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Travel" })).toBeInTheDocument();
    });
});
