# Playwright Test Setup

This repository contains Playwright tests for the project. Follow the instructions below to clone, set up, and run the tests locally.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Download and install the latest version from [Node.js official website](https://nodejs.org/).
- **Git**: You need Git to clone the repository. If it's not already installed, download and install it from [Git official website](https://git-scm.com/).

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/iamsowa/qa-form.git
```

Navigate into the project directory:

```bash
cd qa-form
```

### 2. Install Dependencies

Once you're inside the project directory, install the necessary dependencies using `npm`:

```bash
npm install
```

This will install Playwright and any other dependencies specified in the `package.json` file.

### 3. Install Playwright Browsers

Playwright requires specific browser binaries to run tests. You can install them using the following command:

```bash
npx playwright install
```

This will download and install the necessary browsers (Chromium, Firefox, WebKit) for Playwright.

### 4. Run the Tests

You can run the Playwright tests with the following command:

```bash
npx playwright test
```

This will run all the tests located in the `tests` directory by default.

### 5. Headed Mode (Optional)

By default, the tests will run in headless mode (without a visible browser). If you'd like to run the tests with the browser visible (headed mode), use the following command:

```bash
npx playwright test --headed
```

### 6. Running Specific Tests

To run a specific test or group of tests, you can use the `-g` option followed by the name of the test or the `test.only` directive in the test file.

Example:

```bash
npx playwright test -g "should validate required fields"
```

### 7. View Test Reports

After running the tests, you can generate an HTML report using:

```bash
npx playwright show-report
```

This will open a detailed report of the test results in your default browser.

## Additional Commands

- **Run tests in parallel**:

  Playwright runs tests in parallel by default. You can configure the number of workers using the `--workers` option:

  ```bash
  npx playwright test --workers=4
  ```

- **Retry failing tests**:

  If you want to retry tests on failure, you can use the `--retries` option (configured in `playwright.config.ts`):

  ```bash
  npx playwright test --retries=1
  ```

## Configuration

The `playwright.config.ts` file contains various configuration options for running the tests. You can customize it as per your needs (e.g., base URL, timeouts, browsers).

### Example Configuration:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
});
```

## Folder Structure

```plaintext
├── src/                 # Application source code
├── tests/               # Playwright test files
│   ├── e2e/             # End-to-end tests
│   └── utils/           # Helper functions for tests
├── playwright.config.ts # Playwright configuration file
├── package.json         # Project dependencies and scripts
└── README.md            # Instructions for setting up and running tests
```

## Troubleshooting

If you encounter any issues, make sure that:

1. Node.js and npm are correctly installed.
2. All dependencies are properly installed (`node_modules` folder exists).
3. Browsers required for Playwright are installed (`npx playwright install`).

For further assistance, please refer to the [Playwright documentation](https://playwright.dev/docs/intro).


