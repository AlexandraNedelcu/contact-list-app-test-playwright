import { test as setup } from "@playwright/test";
import { expect } from "../../fixtures/custom-fixtures";
import { LoginPage } from "../../pages/loginPage";
import dotenv from 'dotenv';

dotenv.config();

setup("get cookies", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("/");
  await loginPage.login(
    process.env.TEST_USER_EMAIL as string,
    process.env.TEST_USER_PASSWORD as string
  );
  await expect(page).toHaveURL("/contactList");
  await page.context().storageState({ path: ".auth/cookies.json" });
});
