import { test, expect } from "../../../fixtures/custom-fixtures";
import { validUser } from "../../utils/testData";

test("@e2e Should logout when pressing logout button - View Contact Page", async ({
    loginPage,
    contactListPage,
    viewContactPage,
    page
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await viewContactPage.clickOnButton('Logout');
    await expect(page).toHaveURL("/");
});

test("@e2e Should view contact details", async ({ 
    loginPage,
    contactListPage,
    viewContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    const rowData = await contactListPage.getContactRowData(0);
    await contactListPage.clickContactRow(0);
    await expect(viewContactPage.getContactFirstName()).toHaveText(
        rowData.firstName
    );
});

test("@e2e Should return to contact list from details", async ({ 
    loginPage,
    contactListPage,
    viewContactPage,
    page 
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickContactRow(0);
    await viewContactPage.clickOnButton('Return');
    await expect(page).toHaveURL("/contactList");
});

test("@e2e Should delete a contact successfully", async ({ 
    loginPage,
    contactListPage,
    viewContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    const initialData = await contactListPage.getContactRowData(0);
    await contactListPage.clickContactRow(0);
    await viewContactPage.deleteContact(true);
    await contactListPage.waitForHydration();
    const afterDelete = await contactListPage.getContactRowData(0);
    expect(afterDelete.firstName).not.toBe(initialData.firstName);
});

test("@e2e Should cancel the delete of a contact", async ({ 
    loginPage,
    contactListPage,
    viewContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    const initialData = await contactListPage.getContactRowData(0);
    await contactListPage.clickContactRow(0);
    await viewContactPage.deleteContact(false);
    await viewContactPage.clickOnButton('Return');
    await contactListPage.waitForHydration();
    const afterDelete = await contactListPage.getContactRowData(0);
    expect(afterDelete.firstName).toBe(initialData.firstName);
});