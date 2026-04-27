import { expect, test } from "../../fixtures/test-fixtures";
import validUsers from "./../../test-data/valid-users.json";

const invalidCredentials = [
    {
        description: "wrong username",
        username: "invalid_user",
        password: "secret_sauce",
        expectedError: "Username and password do not match"
    },
    {
        description: "wrong password",
        username: 'standard_user',
        password: 'wrong_pass',
        expectedError: 'Username and password do not match'
    },
    {
        description: 'locked out user',
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedError: 'Sorry, this user has been locked out'
    },
    {
        description: 'empty username',
        username: '',
        password: 'secret_sauce',
        expectedError: 'Username is required'
    },
    {
        description: 'empty password',
        username: 'standard_user',
        password: '',
        expectedError: 'Password is required'
    },
]

test.describe("Login - Data Driven Tests", () => {

    // Array loop
    for (const data of invalidCredentials) {
        test(`Should show error for ${data.description}`, async ({ loginPage }) => {
            await loginPage.login(data.username, data.password);

            await expect(loginPage.getErrorMessage()).toBeVisible();
            await expect(loginPage.getErrorMessage()).toContainText(data.expectedError);
        });
    }

    // External JSON file
    for (const data of validUsers) {
        test(`Should login successfully as ${data.username}`, async ({ page, loginPage }) => {
            await loginPage.login(data.username, data.password);

            await expect(page).toHaveURL("/inventory.html");
        });
    }

});