import { test, expect } from "../../../fixtures/custom-fixtures";
import { validUser, generateRandomContact } from "../../utils/testData";

test("Should logout when pressing logout button - Edit Contact Page", async ({
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

test("Should edit contact first name", async ({ 
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage,
    page
}) => {
    const { firstName } = generateRandomContact();
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await viewContactPage.clickOnButton('Edit');
    await page.waitForTimeout(1000);
    await editContactPage.modifyForm(editContactPage.firstNameInput, firstName);
    await editContactPage.clickOnButton('Submit');
    await page.waitForTimeout(1000);
    await viewContactPage.clickOnButton('Return');
    await page.waitForTimeout(1000);
    const updated = await contactListPage.getContactRowData(0);
    expect(updated.firstName).toContain(firstName);
});

test("Should show error for invalid email", async ({ 
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage,
    page 
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await page.waitForTimeout(1000);
    await viewContactPage.clickOnButton('Edit');
    await page.waitForTimeout(1000);
    await editContactPage.modifyForm(editContactPage.emailInput, "wrongEmail");
    await editContactPage.clickOnButton('Submit');
    await expect(editContactPage.getErrorMessage()).toContainText(
        "Email is invalid"
    );
});

test("Should show error for invalid phone number", async ({ 
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage,
    page 
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await page.waitForTimeout(1000);
    await viewContactPage.clickOnButton('Edit');
    await page.waitForTimeout(1000);
    await editContactPage.modifyForm(editContactPage.phoneInput, "222");
    await editContactPage.clickOnButton('Submit');
    await expect(editContactPage.getErrorMessage()).toContainText(
        "Phone number is invalid"
    );
});

test("Should show error for invalid postal code", async ({ 
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage,
    page 
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await page.waitForTimeout(1000);
    await viewContactPage.clickOnButton('Edit');
    await page.waitForTimeout(1000);
    await editContactPage.modifyForm(editContactPage.postalCodeInput, "aaaa");
    await editContactPage.clickOnButton('Submit');
    await expect(editContactPage.getErrorMessage()).toContainText(
        "Postal code is invalid"
    );
});

test("Should return to contact details when pressing cancel button without saving", async ({
    loginPage,
    contactListPage,
    viewContactPage,
    editContactPage,
    page,
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await page.waitForTimeout(1000);
    await viewContactPage.clickOnButton('Edit');
    await page.waitForTimeout(1000);
    const { firstName } = generateRandomContact();
    await editContactPage.modifyForm(editContactPage.firstNameInput, firstName);
    await editContactPage.clickOnButton('Cancel');
    await expect(page).toHaveURL("/contactDetails");
    await page.waitForTimeout(1000);
    await viewContactPage.clickOnButton('Return');
    await page.waitForTimeout(1000);
    const updated = await contactListPage.getContactRowData(0);
    expect(updated.firstName).not.toContain(firstName);
});