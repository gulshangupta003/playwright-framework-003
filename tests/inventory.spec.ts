import test, { expect } from "@playwright/test";

test.describe("Inventory page", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page).toHaveURL("/inventory.html");
    });


    test("Should display total 6 inventory items", async ({ page }) => {
        const items = page.locator(".inventory_item");

        await expect(items).toHaveCount(6)
    });

    test("Should display correct first product name", async ({ page }) => {
        const firstItem = page.locator(".inventory_item_name ").first();

        await expect(firstItem).toHaveText("Sauce Labs Backpack");
    });

    test("Should add item to cart and verify badge", async ({ page }) => {
        await page.getByRole("button", { name: "Add to cart" }).first().click();

        const cartBadge = page.locator(".shopping_cart_badge");
        await expect(cartBadge).toHaveText("1");
        await expect(cartBadge).toBeVisible();
    });

    test("Should sort product by price low to high", async ({ page }) => {
        await page.locator(".product_sort_container").selectOption("lohi");

        const firstPrice = page.locator(".inventory_item_price").first();
        await expect(firstPrice).toHaveText("$7.99");
    });

    test("Should navigate to cart page", async ({ page }) => {
        await page.locator(".shopping_cart_link").click();

        await expect(page).toHaveURL("/cart.html");
        await expect(page.getByText("Your Cart")).toBeVisible();
    });

    test("Soft assertion example", async ({ page }) => {
        await expect.soft(page).toHaveTitle("Swag Labs");
        await expect.soft(page.getByText("Products")).toBeVisible();
        await expect.soft(page.locator(".inventory_item")).toHaveCount(6);
    })

});