import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["json", { outputFile: "playwright-report/report.json" }],
  ],
  use: {
    baseURL: "https://thinking-tester-contact-list.herokuapp.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 0,
    navigationTimeout: 15000,
  },
  projects: [
    {
      name: "auth",
      testMatch: "**/*global.setup.ts",
      testDir: "tests/config",
    },
    {
      name: "api",
      testDir: "tests/api",
      dependencies: ["auth"],
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  outputDir: "test-results/",
  snapshotDir: "__snapshots__",
});
