import { test, expect } from "../../fixtures/test-fixtures";

test.describe("Inventory Page", () => {

    test("Should display total 6 inventory items @regression", async ({ authenticatedPage }) => {
        await expect(authenticatedPage.getInventoryItems()).toHaveCount(6);
    });

    test("Should add item to cart @regression", async ({ authenticatedPage }) => {
        const productName: string = "Sauce Labs Backpack";
        await authenticatedPage.addToCartByName(productName);

        await expect(authenticatedPage.header.getCartBadge()).toHaveText("1");
    });

    test("Should add and remove product from cart @regression", async ({ authenticatedPage }) => {
        const productName: string = "Sauce Labs Backpack";

        await authenticatedPage.addToCartByName(productName);
        await expect(authenticatedPage.header.getCartBadge()).toHaveText("1");

        await authenticatedPage.removeFromCartByName(productName);
        await expect(authenticatedPage.header.getCartBadge()).not.toBeVisible();
    });

    test("Should sort by price low to high @regression", async ({ authenticatedPage }) => {
        await authenticatedPage.sortBy("lohi");

        const prices = await authenticatedPage.getAllPrices();

        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    });

    test("Should sortt by name Z - A @regression", async ({ authenticatedPage }) => {
        await authenticatedPage.sortBy("za");
        const names = await authenticatedPage.getAllItemNames();

        for (let i = 0; i < names.length - 1; i++) {
            expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
        }
    });

});