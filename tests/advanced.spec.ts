import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe("Dialogs", () => {

    // Handle dialog (alert, confirm, prompt)

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

    // Handle new tabs

    test("Handle new tab", async ({ page, context }) => {
        await page.goto("https://the-internet.herokuapp.com/windows");

        const [newPage] = await Promise.all([
            context.waitForEvent("page"),
            page.getByRole("link", { name: "Click Here" }).click()
        ]);

        await newPage.waitForLoadState();

        await expect(newPage).toHaveURL(/new/);
        await expect(newPage.getByText("New Window")).toBeVisible();

        await expect(page.getByText("Opening a new window")).toBeVisible();

        await newPage.close();
    });

    // Handle frames

    test("Interact with iframe content", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/iframe");

        const frame = page.frameLocator("#mce_0_ifr");
        await frame.locator("#tinymce").clear();
        await frame.locator("#tinymce").fill("Hello from Playwright!");

        await expect(frame.locator("#tinymce")).toHaveText("Hello from Playwright!");

        await expect(page.getByRole("heading", { level: 3 })).toBeVisible();
    });

    test("Nested iframes", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/nested_frames");

        const topFrame = page.frameLocator("[name='frame-top']");
        const leftFrame = topFrame.frameLocator("[name='frame-left']");

        await expect(leftFrame.getByText("LEFT")).toBeVisible();
    });

});