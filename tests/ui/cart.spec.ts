import { test, expect } from "../../fixtures/test-fixtures";

test.describe("Cart Page", () => {

    test("Should show added item in cart", async ({ authenticatedPage, cartPage }) => {
        const productName = "Sauce Labs Backpack";

        await authenticatedPage.addToCartByName(productName);
        await authenticatedPage.header.goToCart();

        await expect(cartPage.getTitle()).toBeVisible();
        await expect(cartPage.getCartItems()).toHaveCount(1);
    });

    test("Should remove item from cart", async ({ authenticatedPage, cartPage }) => {
        const productName = "Sauce Labs Bike Light";

        await authenticatedPage.addToCartByName(productName);
        await authenticatedPage.header.goToCart();
        await cartPage.removeItem(productName);

        await expect(cartPage.getCartItems()).toHaveCount(0);
    });

    test("Should go back to shopping", async ({ page, authenticatedPage, cartPage }) => {
        await authenticatedPage.header.goToCart();
        await cartPage.continueShopping();

        await expect(page).toHaveURL("/inventory.html");
    });

});