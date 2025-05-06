import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from "allure-playwright/dist/testplan";
import * as os from "os";

export default defineConfig({
  globalSetup: "./src/utils/globalSetup.ts",
  // globalTeardown : "./src/utils/globalTeardown.ts",
  grep: testPlanFilter(),
  testDir: 'src/tests',
  timeout: 90*1000,
  expect:{
    timeout: 20000
  },
  fullyParallel: true,
  workers: process.env.CI ? 1 : 3,
  reporter: 
  [['json', {  outputFile: './test-results/report.json' }], ['list'],
  ['allure-playwright',{
      detail: true,
        suiteTitle: true,
        outputFolder: "test-results",
        environmentInfo: {
          Report: "S5Tech Test Report (Web)",
          Environment: process.env.ENV,
          OS_platform: os.platform(),
          OS_version: os.version(),
          Node_version: process.version
        }
    }
  ]],
  use: {
    trace: 'retain-on-failure',
    video: 'off',
    screenshot: 'only-on-failure',
    headless: process.env.HEADLESS && process.env.HEADLESS == "false" ? false : true,
    permissions: ['geolocation']
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome']},
    },
    {
      name: 'Safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
