import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe("Dialogs", () => {

    test("Handle javascript alert", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

        page.on("dialog", async (dialog) => {
            console.log("Dialog message ", dialog.message);
            await dialog.accept();
        });

        await page.getByRole("button", { name: "Click for JS Alert" }).click();
        await expect(page.locator("#result")).toHaveText("You successfully clicked an alert");
    });

    test("Handle confirm dialog - dismiss laert", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

        page.on("dialog", async (dialog) => {
            console.log("Dismiss the alert");
            await dialog.dismiss();
        });

        await page.getByRole("button", { name: "Click for JS Confirm" }).click();
        await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
    });

    test("Handle prompt dialog - enter text", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

        page.on("dialog", async (dialog) => {
            console.log("Type text in prompt and then accept alert");
            await dialog.accept("Hello Playwright!");
        });

        await page.getByRole("button", { name: "Click for JS Prompt" }).click();
        await expect(page.locator("#result")).toHaveText("You entered: Hello Playwright!");
    });

});