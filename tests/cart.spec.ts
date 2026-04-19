import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";

test.describe("Cart Page", () => {

    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await page.goto("/");
        await loginPage.login("standard_user", "secret_sauce");
    });

    test("Should show added item in cart", async () => {
        const productName = "Sauce Labs Backpack";

        await inventoryPage.addToCartByName(productName);
        await inventoryPage.header.goToCart();

        await expect(cartPage.getTitle()).toBeVisible();
        await expect(cartPage.getCartItems()).toHaveCount(1);
    });

    test("Should remove item from cart", async () => {
        const productName = "Sauce Labs Bike Light";

        await inventoryPage.addToCartByName(productName);
        await inventoryPage.header.goToCart();
        await cartPage.removeItem(productName);

        await expect(cartPage.getCartItems()).toHaveCount(0);
    });

    test("Should go back to shopping", async ({ page }) => {
        await inventoryPage.header.goToCart();
        await cartPage.continueShopping();

        await expect(page).toHaveURL("/inventory.html");
    });

});