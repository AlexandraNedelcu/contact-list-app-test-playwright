import { test as setup } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";

setup("get cookies", async ({ page }) => {
  const loginpage = new LoginPage(page);
  await page.goto("/");
  await loginpage.login(
    process.env.TEST_USER_EMAIL as string,
    process.env.TEST_USER_PASSWORD as string
  );
  await page.waitForURL("**/contactList");
  await page.context().storageState({ path: ".auth/cookies.json" });
});
