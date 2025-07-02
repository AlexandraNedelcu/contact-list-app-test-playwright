import { test, expect } from "../../../fixtures/custom-fixtures";
import { validUser, generateRandomUser } from "../../utils/testData";

test("should register successfully", async ({ registerPage, page }) => {
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

test("should show error when fields are empty", async ({
  registerPage,
  page,
}) => {
  await page.goto("/addUser");
  await registerPage.clickOnButton("Submit");
  await expect(registerPage.getErrorMessage()).toContainText(
    "firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required."
  );
});

test("should show error for already registered email", async ({
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

test("should show error for invalid email format", async ({
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

test("should show error for short password", async ({ registerPage, page }) => {
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
