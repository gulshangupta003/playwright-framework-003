import { test as base } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { InventoryPage } from "../pages/inventory.page";
import { LoginPage } from "../pages/login.page";

type PageFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await page.goto("/");
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);

        await use(inventoryPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);

        await use(cartPage);
    },

});

export { expect } from "@playwright/test";