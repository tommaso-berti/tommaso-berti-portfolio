import { test, expect } from "@playwright/test";

test.describe("Language toggle", () => {
    test("switches interface language", async ({ page }) => {
        await page.goto("/contact");
        const heading = page.getByRole("heading", { level: 1 });
        const titleBefore = await heading.textContent();

        await page
            .getByRole("button", {
                name: /switch language|passa alla lingua/i,
            })
            .click();

        await expect(heading).not.toHaveText(titleBefore ?? "");
        await expect(heading).toHaveText(/contact me|contattami/i);
    });
});
