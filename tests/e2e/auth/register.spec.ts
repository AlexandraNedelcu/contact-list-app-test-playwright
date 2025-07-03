import { test, expect } from "../../../fixtures/custom-fixtures";
import { validUser, generateRandomUser } from "../../utils/testData";

test("@e2e Should register successfully", async ({ registerPage, page }) => {
  const user = generateRandomUser();
  await page.goto("/addUser");
  await registerPage.register({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  });
  await expect(page).toHaveURL("/contactList");
});

test("@e2e Should show error when fields are empty", async ({
  registerPage,
  page,
}) => {
  await page.goto("/addUser");
  await registerPage.clickOnButton("Submit");
  await expect(registerPage.getErrorMessage()).toContainText(
    "firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required."
  );
});

test("@e2e Should show error for already registered email", async ({
  registerPage,
  page,
}) => {
  const user = generateRandomUser();
  await page.goto("/addUser");
  await registerPage.register({
    firstName: user.firstName,
    lastName: user.lastName,
    email: validUser.email,
    password: user.password,
  });
  await expect(registerPage.getErrorMessage()).toHaveText(
    "Email address is already in use"
  );
});

test("@e2e Should show error for invalid email format", async ({
  registerPage,
  page,
}) => {
  const user = generateRandomUser();
  await page.goto("/addUser");
  await registerPage.register({
    firstName: user.firstName,
    lastName: user.lastName,
    email: "invalidemail",
    password: user.password,
  });
  await expect(registerPage.getErrorMessage()).toContainText(
    "Email is invalid"
  );
});

test("@e2e Should show error for short password", async ({ registerPage, page }) => {
  const user = generateRandomUser();
  await page.goto("/addUser");
  await registerPage.register({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "123",
  });
  await expect(registerPage.getErrorMessage()).toContainText(
    "is shorter than the minimum allowed length (7)"
  );
});
