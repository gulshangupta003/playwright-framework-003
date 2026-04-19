import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";

test.describe("Inventory Page", () => {

    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("standard_user", "secret_sauce");
        inventoryPage = new InventoryPage(page);
    });

    test("Should display total 6 inventory items", async () => {
        await expect(inventoryPage.getInventoryItems()).toHaveCount(6);
    });

    test("Should add item to cart", async () => {
        const productName: string = "Sauce Labs Backpack";
        await inventoryPage.addToCartByName(productName);

        await expect(inventoryPage.header.getCartBadge()).toHaveText("1");
    });

    test("Should add and remove product from cart", async () => {
        const productName: string = "Sauce Labs Backpack";

        await inventoryPage.addToCartByName(productName);
        await expect(inventoryPage.header.getCartBadge()).toHaveText("1");

        await inventoryPage.removeFromCartByName(productName);
        await expect(inventoryPage.header.getCartBadge()).not.toBeVisible();
    });

    test("Should sort by price low to high", async () => {
        await inventoryPage.sortBy("lohi");

        const prices = await inventoryPage.getAllPrices();

        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    });

});