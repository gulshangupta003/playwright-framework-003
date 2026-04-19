import { Locator, Page } from "@playwright/test";
import { HeaderComponent } from "./components/header.component";

export class InventoryPage {

    readonly header: HeaderComponent;
    private readonly inventoryItems: Locator;
    private readonly sortDropdown: Locator;
    private readonly itemNames: Locator;
    private readonly itemPrices: Locator;

    constructor(private page: Page) {
        this.header = new HeaderComponent(page);
        this.inventoryItems = page.locator(".inventory_item");
        this.sortDropdown = page.locator(".product_sort_container");
        this.itemNames = page.locator(".inventory_item_name");
        this.itemPrices = page.locator(".inventory_item_price");
    }

    getInventoryItems(): Locator {
        return this.inventoryItems;
    }

    getItemNames(): Locator {
        return this.itemNames;
    }

    async addToCartByName(productName: string): Promise<void> {
        const item = this.inventoryItems.filter({
            hasText: productName
        });
        await item.getByRole("button", { name: "Add to cart" }).click();
    }

    async removeFromCartByName(productName: string): Promise<void> {
        const item = this.inventoryItems.filter({
            hasText: productName
        });
        await item.getByRole("button", { name: "Remove" }).click();
    }

    async sortBy(value: string): Promise<void> {
        await this.sortDropdown.selectOption(value);
    }

    async getAllItemNames(): Promise<string[]> {
        return await this.itemNames.allTextContents();
    }

    async getAllPrices(): Promise<number[]> {
        const priceTexts = await this.itemPrices.allTextContents();
        return priceTexts.map(priceText => parseFloat(priceText.replace("$", "")));
    }

}