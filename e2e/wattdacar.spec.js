import { test, expect } from "@playwright/test";

test.describe("WattDaCar project dossier", () => {
    test("shows the restricted preview and clearly labeled external links", async ({ page }) => {
        await page.addInitScript(() => window.localStorage.setItem("app-language", "it"));
        await page.goto("/projects/wattdacar");

        await expect(page.getByRole("heading", { level: 1, name: "WattDaCar" })).toBeVisible();
        await expect(page.getByText("BETA · NON PUBBLICATO").first()).toBeVisible();
        await expect(page.getByText("BETA PRIVATA · NON PUBBLICATO").first()).toBeVisible();
        await expect(page.locator("iframe")).toHaveCount(0);

        const liveLink = page.getByRole("link", { name: /apri wattdacar.*beta privata/i }).first();
        await expect(liveLink).toHaveAttribute("href", "https://wattdacar.tommasoberti.com");
        await expect(liveLink).toHaveAttribute("target", "_blank");

        const repositoryLink = page.getByRole("link", { name: "Repository privato" });
        await expect(repositoryLink).toHaveAttribute("href", "https://github.com/tommaso-berti/wattdacar");
        await expect(repositoryLink).toHaveAttribute("target", "_blank");
        await expect(page.getByRole("link", { name: "Vai al login" })).toHaveAttribute(
            "href",
            "https://wattdacar.tommasoberti.com"
        );
    });

    test("keeps the restricted preview usable on a narrow viewport", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.addInitScript(() => window.localStorage.setItem("app-language", "it"));
        await page.goto("/projects/wattdacar");

        await expect(page.getByRole("heading", { level: 1, name: "WattDaCar" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Vai al login" })).toBeVisible();
        const noHorizontalOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
        );
        expect(noHorizontalOverflow).toBe(true);
    });

    test("keeps project bullet lists close to their headings", async ({ page }) => {
        await page.addInitScript(() => window.localStorage.setItem("app-language", "it"));
        await page.goto("/projects/wattdacar");

        const expectCompactGap = async (sectionSelector, headingText) => {
            const section = page.locator(sectionSelector);
            await expect(section.locator("h4")).toHaveText(headingText);
            const gap = await section.evaluate((element) => {
                const headingElement = element.querySelector("h4");
                const itemElement = element.querySelector("li");
                return itemElement.getBoundingClientRect().top - headingElement.getBoundingClientRect().bottom;
            });
            expect(gap).toBeLessThan(40);
        };

        await expectCompactGap("#difficulties-faced", "Sfide affrontate");
        await page.getByRole("button", { name: /INTERFACCIA/i }).click();
        await expectCompactGap("#search-mechanics", "Come si consultano i dati");
        await page.getByRole("button", { name: /LOG DI SVILUPPO/i }).click();
        await expectCompactGap("#lessons-learned", "Cosa ho imparato");
    });
});
