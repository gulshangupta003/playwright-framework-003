import test, { expect } from "@playwright/test";

test.describe('Login Page', () => {
    test('Should login with valid credentials', async ({ page }) => {
        await page.goto('/');

        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill("secret_sauce");
        await page.locator("#login-button").click();

        await expect(page).toHaveURL("/inventory.html");
    });
});