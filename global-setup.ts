import { FullConfig } from "@playwright/test";
import { getEnvironment } from "./config/environments";

async function globalSetup(config: FullConfig) {
    console.log("🚀 Running global setup...");
    console.log("ENV: ", getEnvironment().env);

    process.env.TEST_START_TIME = new Date().toISOString();
};

export default globalSetup;