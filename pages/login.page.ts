import { Locator, Page } from "@playwright/test";

export class LoginPage {

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(private page: Page) {
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.errorMessage = page.locator("[data-test='error']");
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    getErrorMessage(): Locator {
        return this.errorMessage;
    }

    async goto(): Promise<void> {
        await this.page.goto("/");
    }

}