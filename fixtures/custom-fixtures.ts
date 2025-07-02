import { test as baseTest, request as baseRequest } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { RegisterPage } from "../pages/registerPage";
import fs from "fs";

type MyFixtures = {
  authToken: string;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  navigateToBaseUrl: void;
  request: typeof baseRequest;
};

export const test = baseTest.extend<MyFixtures>({
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
  request: async ({ baseURL }, use) => {
    const storage = JSON.parse(fs.readFileSync(".auth/cookies.json", "utf-8"));
    const tokenCookie = storage.cookies.find((c: any) => c.name === "token");
    if (!tokenCookie?.value) {
      throw new Error("Bearer token not found in .auth/cookies.json");
    }
    const token = tokenCookie.value;
    const apiRequest = await baseRequest.newContext({
      baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    await use(apiRequest);
    await apiRequest.dispose();
  },
});

export { expect } from "@playwright/test";
