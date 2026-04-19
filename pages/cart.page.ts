import { Locator, Page } from "@playwright/test";
import { HeaderComponent } from "./components/header.component";

export class CartPage {

    readonly header: HeaderComponent;
    private readonly title: Locator;
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;

    constructor(private page: Page) {
        this.header = new HeaderComponent(page);
        this.title = page.getByText("Your Cart");
        this.cartItems = page.locator(".cart_item");
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
        this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
    }

    getTitle(): Locator {
        return this.title;
    }

    getCartItems(): Locator {
        return this.cartItems;
    }

    async removeItem(productName: string): Promise<void> {
        const item = this.cartItems.filter({ hasText: productName });
        await item.getByRole("button", { name: "Remove" }).click();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

}