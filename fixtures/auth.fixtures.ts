import { test as base } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { InventoryPage } from "../pages/inventory.page"
import { LoginPage } from "../pages/login.page";

type AuthFixtures = {
    authenticatedPage: InventoryPage;
    cartPage: CartPage;
}

export const test = base.extend<AuthFixtures>({

    authenticatedPage: async ({ page }, use) => {
        const loginPage: LoginPage = new LoginPage(page);
        await page.goto("/");
        await loginPage.login("standard_user", "secret_sauce");

        const inventoryPage: InventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage: CartPage = new CartPage(page);
        await use(cartPage);
    },

});

export { expect } from "@playwright/test";