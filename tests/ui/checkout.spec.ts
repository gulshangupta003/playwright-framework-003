import { expect, test } from "../../fixtures/test-fixtures";

test.describe("Checkout Flow - E2E", () => {

    test("Should complete purchase @e2e @regression", async ({ page, loginPage, inventoryPage, cartPage }) => {

        await test.step("Login as standard user", async () => {
            await loginPage.login("standard_user", "secret_sauce");
            await expect(page).toHaveURL("/inventory.html");
        });

        await test.step("Add item to cart", async () => {
            await page.getByRole("button", { name: "Add to cart" }).first().click();
            await expect(inventoryPage.header.getCartBadge()).toHaveText("1");
        });

        await test.step("Navigate tp cart", async () => {
            await inventoryPage.header.goToCart();
            await expect(page).toHaveURL("/cart.html");
        });

        await test.step("Proceed to checkout", async () => {
            await cartPage.checkout();
            await expect(page).toHaveURL("/checkout-step-one.html");
        });

        await test.step("Fill checkout information", async () => {
            await cartPage.enterCheckoutInfo("John", "Cena", "123456");
            await cartPage.continue();

        });

        await test.step("Verify order summary", async () => {
            await expect(page).toHaveURL("/checkout-step-two.html");
            await cartPage.finish();
            await expect(cartPage.getThankYouHead()).toBeVisible();
        });

    });

});