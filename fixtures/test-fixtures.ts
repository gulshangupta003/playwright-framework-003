import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";

type TestFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    authenticatedPage: InventoryPage;
};

export const test = base.extend<TestFixtures>({

    loginPage: async ({ page }, use) => {
        await page.goto("/");

        const loginPage: LoginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage: InventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage: CartPage = new CartPage(page);
        await use(cartPage);
    },

    authenticatedPage: async ({ page, loginPage }, use) => {
        await loginPage.login("standard_user", "secret_sauce");

        const inventoryPage: InventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

});

export { expect } from "@playwright/test";