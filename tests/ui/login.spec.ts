import { test, expect } from "../../fixtures/test-fixtures";

test.describe('Login Page', () => {

    test("Should login with valid credentials", async ({ page, loginPage }) => {
        const username: string = "standard_user";
        const password: string = "secret_sauce";

        await loginPage.login(username, password);

        await expect(page).toHaveURL("/inventory.html");
    });

    test("Should show error for invalid credentials", async ({ loginPage }) => {
        const username: string = "wrong_user";
        const password: string = "wrong_pass";

        await loginPage.login(username, password);

        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(loginPage.getErrorMessage()).toContainText("Username and password do not match");
    });

    test("Should show error for locked out user", async ({ loginPage }) => {
        const username = "locked_out_user";
        const password = "secret_sauce";

        await loginPage.login(username, password);

        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(loginPage.getErrorMessage()).toContainText("Sorry, this user has been locked out.");
    });

});