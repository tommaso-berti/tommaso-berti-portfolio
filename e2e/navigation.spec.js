import { test, expect } from "@playwright/test";

test.describe("Portfolio navigation", () => {
    test("home loads with hero content", async ({ page }) => {
        await page.goto("/");
        await expect(
            page.getByRole("heading", {
                level: 1,
                name: /BUILD.*EXPLORE.*IMPROVE|COSTRUISCI.*ESPLORA.*MIGLIORA/i,
            })
        ).toBeVisible();
    });

    test("navigates to projects from header chips", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: /02\s+Projects|02\s+Progetti/i }).click();
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

    test("style reference is directly reachable, unlisted, and noindex", async ({ page }) => {
        await page.goto("/style");
        await expect(page.getByRole("heading", { name: /style reference|guida di stile/i, level: 1 })).toBeVisible();
        await expect(page.locator('nav a[href="/style"]')).toHaveCount(0);
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
        await expect(page.getByRole("heading", { name: /color system|sistema cromatico/i })).toBeVisible();
    });

    test("About technical module exposes blueprint systems", async ({ page }) => {
        await page.goto("/about#tech-skills");
        await expect(
            page.getByRole("heading", { name: /Tech Skills|Competenze Tecniche/i, level: 2 })
        ).toBeVisible();
        await page.getByRole("button", { name: /02\s*Runtime/i }).click();
        await expect(page.getByRole("button", { name: /Node\.js/i }).first()).toBeVisible();
    });
});
