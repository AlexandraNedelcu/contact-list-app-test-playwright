import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { RegisterPage } from '../../../pages/registerPage';
import { ContactListPage } from '../../../pages/contactListPage';
import { AddContactPage } from '../../../pages/addContactPage';
import { ViewContactPage } from '../../../pages/viewContactPage';
import { EditContactPage } from '../../../pages/editContactPage';
import { validUser, generateRandomUser, generateRandomContact } from '../../utils/testData';

test.describe.serial('Regression Suite', () => {
    test('@regression Should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);
        await expect(page).toHaveURL(/.*contactList/);
    });

    test('@regression Should register successfully', async ({ page }) => {
        const newUser = generateRandomUser();
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        await registerPage.register(newUser.firstName, newUser.lastName, newUser.email, newUser.password);
        await expect(page).toHaveURL(/.*contactList/);
    });

    test('@regression Should create a contact with first and last name only', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const contactsList = new ContactListPage(page);
        const addContactPage = new AddContactPage(page);

        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);
        await contactsList.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        const {firstName, lastName} = generateRandomContact();
        await addContactPage.fillContactForm({firstName, lastName});
        await addContactPage.submit();
        await expect(page).toHaveURL('/contactList');
        await page.waitForTimeout(1000);
        const fullName = `${firstName} ${lastName}`;
        const contactExists = await contactsList.isContactInTable(fullName);
        expect(contactExists).toBe(true);
    });

    test('@regression Should view contact details', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const contactsList = new ContactListPage(page);
        const viewContactPage = new ViewContactPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);
        const rowData = await contactsList.getContactRowData(0);
        await contactsList.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        const contactDetails = await viewContactPage.getContactDetails();
        expect(contactDetails.firstName).toContain(rowData.firstName);
        expect(contactDetails.lastName).toContain(rowData.lastName);
    });

    test('@regression Should edit contact first name', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const contactsList = new ContactListPage(page);
        const viewContactPage = new ViewContactPage(page);
        const editContactPage = new EditContactPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);
        await contactsList.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewContactPage.clickEdit();
        await expect(page).toHaveURL('/editContact');
        await page.waitForTimeout(1000);
        const {firstName} = generateRandomContact();
        await editContactPage.modifyForm(editContactPage.firstNameInput, firstName);
        await editContactPage.submit();
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewContactPage.returnToContactList();
        await page.waitForTimeout(1000);
        const updated = await contactsList.getContactRowData(0);
        expect(updated.firstName).toContain(firstName);
    });

    test('@regression Should delete a contact successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const contactsList = new ContactListPage(page);
        const viewContactPage = new ViewContactPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);
        const initialData = await contactsList.getContactRowData(0);
        await contactsList.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await viewContactPage.deleteContact(true);
        await expect(page).toHaveURL('/contactList');
        await page.waitForTimeout(1000);
        const afterDelete = await contactsList.getContactRowData(0);
        expect(afterDelete.firstName).not.toBe(initialData.firstName);
    });

    test('@regression Should logout when pressing logout button - Add Contact Page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const contactsList = new ContactListPage(page);
        const addContactPage = new AddContactPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);
        await contactsList.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        await addContactPage.logout();
        await expect(page).toHaveURL('/');
    });
});