import { Locator, Page } from "@playwright/test";

export class HeaderComponent {

    private readonly cartLink: Locator;
    private readonly cartBadge: Locator;
    private readonly menuButton: Locator;
    private readonly logoutLink: Locator;

    constructor(private page: Page) {
        this.cartLink = page.locator(".shopping_cart_link");
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.menuButton = page.locator("#react-burger-menu-btn");
        this.logoutLink = page.locator("#logout_sidebar_link");
    }

    getCartBadge(): Locator {
        return this.cartBadge;
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    async getCartCount(): Promise<string> {
        if (await this.cartBadge.isVisible()) {
            return await this.cartBadge.textContent() ?? "0";
        }
        return "0";
    }

    async logout(): Promise<void> {
        await this.menuButton.click();
        await this.logoutLink.click();
    }

}