import { test, expect } from "@playwright/test";

async function switchLanguageViaHeader(page) {
    const languageTrigger = page.getByRole("button", {
        name: /Lang \/ EN|Lang \/ IT|Lingua \/ EN|Lingua \/ IT/i,
    });
    await languageTrigger.click();
    const triggerLabel = (await languageTrigger.getAttribute("aria-label")) ?? "";
    const targetLanguage = /\/ EN$/i.test(triggerLabel) ? /Italiano/i : /English/i;
    await page.getByRole("button", { name: targetLanguage }).click();
}

test.describe("Language toggle", () => {
    test("switches interface language", async ({ page }) => {
        await page.goto("/contact");
        const heading = page.getByRole("heading", { level: 1 });
        const titleBefore = await heading.textContent();

        await switchLanguageViaHeader(page);

        await expect(heading).not.toHaveText(titleBefore ?? "");
        await expect(heading).toHaveText(/contact me|contattami/i);
    });
});
