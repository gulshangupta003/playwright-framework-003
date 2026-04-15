import test, { expect } from "@playwright/test";

test.describe('Login Page', () => {

    test("Should login with valid credentials", async ({ page }) => {
        await page.goto('/');

        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();

        await expect(page).toHaveURL("/inventory.html");
        await expect(page.getByText("Products")).toBeVisible();
    });

    test("Should show error for invalid credentials", async ({ page }) => {
        await page.goto("/");

        await page.getByPlaceholder("Username").fill("wrong_user");
        await page.getByPlaceholder("Password").fill("wrong_pass");
        await page.getByRole("button", { name: "Login" }).click();

        const errMsg = page.locator("[data-test='error']");
        await expect(errMsg).toBeVisible();
        await expect(errMsg).toContainText("Username and password do not match");
    });

});