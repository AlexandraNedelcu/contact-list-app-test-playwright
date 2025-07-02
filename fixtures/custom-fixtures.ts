import { test as baseTest } from "@playwright/test";
import { loginUser } from "../tests/utils/apiHelpers";
import { LoginPage } from "../pages/loginPage";
import { RegisterPage } from "../pages/registerPage";

type MyFixtures = {
  authToken: string;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  navigateToBaseUrl: void;
};

export const test = baseTest.extend<MyFixtures>({
  authToken: async ({}, use) => {
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;
    const token = await loginUser(email, password);
    await use(token);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  navigateToBaseUrl: [
    async ({ page, baseURL }, use) => {
      await page.goto(baseURL!);
      await use();
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
