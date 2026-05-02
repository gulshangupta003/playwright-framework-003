import { expect, Locator, Page } from "@playwright/test";

export abstract class BasePage {

    constructor(protected page: Page) { }

    // common navigations
    async navigateTo(path: string) {
        await this.page.goto(path);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    // common waits
    async waitForPageLoad() {
        await this.page.waitForLoadState("networkidle");
    }

    async waitForURL(urlPattern: string | RegExp) {
        await this.page.waitForURL(urlPattern);
    }

    // common assertion helper
    async verifyURL(expectedPath: string) {
        await expect(this.page).toHaveURL(new RegExp(expectedPath));
    }

    async takeScreenshot(name: string): Promise<Buffer> {
        return await this.page.screenshot({
            path: `test-results/screenshots/${name}.png`,
            fullPage: true
        });
    }

    // scroll helper
    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async scrollIntoView(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }

}