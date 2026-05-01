import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 1,
  retries: process.env.CI ? 2 : 0,
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['list'],
    ['html']
  ],
  use: {
    trace: process.env.CI ? 'on-first-retry' : 'on',
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'retain-on-failure' : 'off'
  },
  projects: [
    {
      name: 'ui-tests',
      testDir: './tests/ui',
      use: {
        baseURL: 'https://www.saucedemo.com',
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: {
        baseURL: 'https://reqres.in',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY || ''
        },
      },
    },
  ],
});