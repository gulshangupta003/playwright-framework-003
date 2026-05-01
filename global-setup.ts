import { FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
    console.log("🚀 Running global setup...");

    process.env.TEST_START_TIME = new Date().toISOString();
};

export default globalSetup;