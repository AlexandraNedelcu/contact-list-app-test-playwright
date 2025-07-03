import { test, expect } from "../../../fixtures/custom-fixtures";
import { validUser, generateRandomUser } from "../../utils/testData";

test("Should login successfully with valid credentials", async ({
  loginPage,
  page,
}) => {
  await loginPage.login(validUser.email, validUser.password);
  await expect(page).toHaveURL("/contactList");
});

test("Should show error with wrong password", async ({ loginPage }) => {
  await loginPage.login(validUser.email, "wrongPassword");
  await expect(loginPage.getErrorMessage()).toHaveText(
    "Incorrect username or password"
  );
});

test("Should show error with non-existent email", async ({ loginPage }) => {
  const user = generateRandomUser();
  await loginPage.login(user.email, user.password);
  await expect(loginPage.getErrorMessage()).toHaveText(
    "Incorrect username or password"
  );
});

test("Should show error with empty fields", async ({ loginPage }) => {
  await loginPage.login("", "");
  await expect(loginPage.getErrorMessage()).toHaveText(
    "Incorrect username or password"
  );
});

test("Should go to register page from login page", async ({
  loginPage,
  page,
}) => {
  await loginPage.clickOnButton("Sign Up");
  await expect(page).toHaveURL("/addUser");
});
