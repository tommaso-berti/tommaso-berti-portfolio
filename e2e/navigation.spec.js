import { test, expect } from "@playwright/test";

test.describe("Portfolio navigation", () => {
    test("home loads with hero content", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("heading", { name: "Tommaso Berti", level: 1 })).toBeVisible();
    });

    test("navigates to projects from header chips", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: /^projects$|^progetti$/i }).click();
        await expect(page).toHaveURL(/\/projects$/);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("shows dedicated 404 page for unknown routes", async ({ page }) => {
        await page.goto("/this-route-does-not-exist");
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(
            page.getByRole("link", { name: /back to home|torna alla home/i })
        ).toBeVisible();
    });

    test("blog link is hidden from primary navigation", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("link", { name: /^blog$/i })).toHaveCount(0);
    });
});
