import { defineConfig, devices } from "@playwright/test";
import { CoverageReportOptions } from "monocart-reporter";

const coverageReportOptions: CoverageReportOptions = {
  // logging: 'debug',
  outputDir: "./coverage",

  entryFilter: (entry) => {
    return entry.url.includes('next/static/chunks') ||  entry.url.includes('next/server/app');
  },

  sourceFilter: (sourcePath) => {
      return sourcePath.includes('src/app/');
  },

  sourcePath: (fileSource) => {
    const list = ['_N_E/', 'todo-app-nextjs-v8-coverage/'];
    for (const pre of list) {
        if (fileSource.startsWith(pre)) {
            return fileSource.slice(pre.length);
        }
    }
    return fileSource;
},

  reports: ['v8', 'console-details'],

  all: {
    dir: ["./src/app"],
    filter: {
      "**/*.tsx": true,
      "**/*.ts": true,
    },
  },
};

const monocartReportOptions = {
  name: "todo-app Playwright Integration Test Report",
  outputFile: "./test-results/report.html",
  coverage: coverageReportOptions,
};

/**

* Read environment variables from file.

* https://github.com/motdotla/dotenv

*/

// import dotenv from 'dotenv';

// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**

* See https://playwright.dev/docs/test-configuration.

*/

export default defineConfig({
  testDir: "./e2e",

  /* Run tests in files in parallel */

  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */

  forbidOnly: !!process.env.CI,

  /* Retry on CI only */

  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */

  workers: process.env.CI ? 1 : 1,

  globalTeardown: './global-teardown.js',

  reporter: [["list"], ["monocart-reporter", monocartReportOptions]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */

    baseURL: "http://127.0.0.1:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
