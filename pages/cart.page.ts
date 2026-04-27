import { Locator, Page } from "@playwright/test";
import { HeaderComponent } from "./components/header.component";

export class CartPage {

    readonly header: HeaderComponent;
    private readonly title: Locator;
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly cancelButton: Locator;
    private readonly finishButton: Locator;
    private readonly thankYouHead: Locator;

    constructor(private page: Page) {
        this.header = new HeaderComponent(page);
        this.title = page.getByText("Your Cart");
        this.cartItems = page.locator(".cart_item");
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
        this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
        this.firstNameInput = page.getByPlaceholder("First Name");
        this.lastNameInput = page.getByPlaceholder("Last Name");
        this.zipCodeInput = page.getByPlaceholder("Zip/Postal Code");
        this.continueButton = page.getByRole("button", { name: "Continue" });
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
        this.finishButton = page.getByRole("button", { name: "Finish" });
        this.thankYouHead = page.getByRole("heading", { name: "Thank you for your order!" });
    }

    getTitle(): Locator {
        return this.title;
    }

    getCartItems(): Locator {
        return this.cartItems;
    }

    getThankYouHead(): Locator {
        return this.thankYouHead;
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

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    async enterZipCode(zipCode: string): Promise<void> {
        await this.zipCodeInput.fill(zipCode);
    }

    async continue(): Promise<void> {
        await this.continueButton.click();
    }

    async cancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async finish(): Promise<void> {
        await this.finishButton.click();
    }

    async enterCheckoutInfo(firstName: string, lastName: string, zipCode: string): Promise<void> {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterZipCode(zipCode);
    }

}