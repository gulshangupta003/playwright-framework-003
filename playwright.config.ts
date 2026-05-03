import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";
import { getEnvironment } from './config/environments';
import os from 'os';

dotenv.config();

const env = getEnvironment();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 1,
  retries: process.env.CI ? 2 : 0,
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  timeout: env.timeout,
  expect: {
    timeout: 5000,
  },
  reporter: process.env.CI
    ? [
      ['list'],
      ['github'],
      ['html'],
      ['allure-playwright', {
        outputFolder: 'allure-results',
        environmentInfo: {
          'Framework': 'Playwright',
          'Language': 'TypeScript',
          'ENV': env.env.toUpperCase(),
          'OS': os.type(),
          'Node Version': process.version
        }
      }]
    ]
    : [
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
      name: 'ui-tests-chrome',
      testDir: './tests/ui',
      use: {
        baseURL: env.baseURL,
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: {
        baseURL: env.apiURL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY || ''
        },
      },
    },
  ],
});