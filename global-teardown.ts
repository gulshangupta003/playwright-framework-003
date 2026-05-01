import { FullConfig } from "@playwright/test";

async function globalTeardown(config: FullConfig) {
    console.log("🧹 Running global teardown...");
};

export default globalTeardown;