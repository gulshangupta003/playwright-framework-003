import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutInfoPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

}