import { test, expect } from "../../../fixtures/custom-fixtures";
import { validUser, generateRandomContact } from "../../utils/testData";

test("@e2e Should logout when pressing logout button - Edit Contact Page", async ({
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage,
    page,
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await viewContactPage.clickOnButton('Edit');
    await editContactPage.clickOnButton('Logout');
    await expect(page).toHaveURL("/");
});

test("@e2e Should edit contact first name", async ({ 
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage
}) => {
    const { firstName } = generateRandomContact();
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await viewContactPage.clickOnButton('Edit');
    await editContactPage.waitForHydration();
    await editContactPage.modifyForm(editContactPage.firstNameInput, firstName);
    await editContactPage.clickOnButton('Submit');
    await viewContactPage.waitForHydration();
    await viewContactPage.clickOnButton('Return');
    await contactListPage.waitForHydration();
    const updated = await contactListPage.getContactRowData(0);
    expect(updated.firstName).toContain(firstName);
});

test("@e2e Should show error for invalid email", async ({ 
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await viewContactPage.clickOnButton('Edit');
    await editContactPage.waitForHydration();
    await editContactPage.modifyForm(editContactPage.emailInput, "wrongEmail");
    await editContactPage.clickOnButton('Submit');
    await expect(editContactPage.getErrorMessage()).toContainText(
        "Email is invalid"
    );
});

test("@e2e Should show error for invalid phone number", async ({ 
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await viewContactPage.clickOnButton('Edit');
    await editContactPage.waitForHydration();
    await editContactPage.modifyForm(editContactPage.phoneInput, "222");
    await editContactPage.clickOnButton('Submit');
    await expect(editContactPage.getErrorMessage()).toContainText(
        "Phone number is invalid"
    );
});

test("@e2e Should show error for invalid postal code", async ({ 
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await viewContactPage.clickOnButton('Edit');
    await editContactPage.waitForHydration();
    await editContactPage.modifyForm(editContactPage.postalCodeInput, "aaaa");
    await editContactPage.clickOnButton('Submit');
    await expect(editContactPage.getErrorMessage()).toContainText(
        "Postal code is invalid"
    );
});

test("@e2e Should return to contact details when pressing cancel button without saving", async ({
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await viewContactPage.clickOnButton('Edit');
    await editContactPage.waitForHydration();
    const { firstName } = generateRandomContact();
    await editContactPage.modifyForm(editContactPage.firstNameInput, firstName);
    await editContactPage.clickOnButton('Cancel');
    await viewContactPage.waitForHydration();
    await viewContactPage.clickOnButton('Return');
    await contactListPage.waitForHydration();
    const updated = await contactListPage.getContactRowData(0);
    expect(updated.firstName).not.toContain(firstName);
});