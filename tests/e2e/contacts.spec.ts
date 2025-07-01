import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { ViewContactPage } from '../../pages/viewContactPage';
import { AddContactPage } from '../../pages/addContactPage';
import { EditContactPage } from '../../pages/editContactPage';
import { ContactListPage } from '../../pages/contactListPage';
import { validUser, generateRandomContact } from '../utils/testData';

test.describe('Contacts E2E Flow', () => {
    let loginPage: LoginPage;
    let listPage: ContactListPage;
    let viewPage: ViewContactPage;
    let addPage: AddContactPage;
    let editPage: EditContactPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        listPage = new ContactListPage(page);
        viewPage = new ViewContactPage(page);
        addPage = new AddContactPage(page);
        editPage = new EditContactPage(page);

        await page.goto('/');
        await loginPage.login(validUser.email, validUser.password);
        await expect(page).toHaveURL('/contactList');
    });

    // Add new contact page
    test('Should create a contact with first and last name only', async ({ page }) => {
        await listPage.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        const {firstName, lastName} = generateRandomContact();
        await addPage.fillContactForm({firstName, lastName});
        await addPage.submit();
        await expect(page).toHaveURL('/contactList');
        await page.waitForTimeout(1000);
        const fullName = `${firstName} ${lastName}`;
        const contactExists = await listPage.isContactInTable(fullName);
        expect(contactExists).toBe(true);
    });

    test('Should logout when pressing logout button - Add Contact Page', async ({ page }) => {
        await listPage.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        await addPage.logout();
        await expect(page).toHaveURL('/');
    });

    test('Should return to contacts list when pressing cancel button', async ({ page }) => {
        await listPage.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        await addPage.cancel();
        await expect(page).toHaveURL('/contactList');
    });

    test('Should show error when first name is missing', async ({ page }) => {
        await listPage.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        const contact = generateRandomContact();
        delete contact.firstName;
        await addPage.fillContactForm(contact);
        await addPage.submit();
        await page.waitForTimeout(1000);
        const error = await addPage.getErrorMessage();
        expect(error).toContain("`firstName` is required");
    });

    test('Should show error when last name is missing', async ({ page }) => {
        await listPage.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        const contact = generateRandomContact();
        delete contact.lastName;
        await addPage.fillContactForm(contact);
        await addPage.submit();
        await page.waitForTimeout(1000);
        const error = await addPage.getErrorMessage();
        expect(error).toContain("`lastName` is required");
    });

    test('Should show error for invalid email format', async ({ page }) => {
        await listPage.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        const contact = generateRandomContact();
        contact.email = 'wrong';
        await addPage.fillContactForm(contact);
        await addPage.submit();
        await page.waitForTimeout(1000);
        const error = await addPage.getErrorMessage();
        expect(error).toContain('Email is invalid');
    });

    test('Should show error for invalid phone format', async ({ page }) => {
        await listPage.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        const contact = generateRandomContact();
        contact.phone = '777';
        await addPage.fillContactForm(contact);
        await addPage.submit();
        await page.waitForTimeout(1000);
        const error = await addPage.getErrorMessage();
        expect(error).toContain('Phone number is invalid');
    });

    test('Should show error for invalid postal code format', async ({ page }) => {
        await listPage.clickAddContact();
        await expect(page).toHaveURL('/addContact');
        const contact = generateRandomContact();
        contact.postalCode = 'aaa';
        await addPage.fillContactForm(contact);
        await addPage.submit();
        await page.waitForTimeout(1000);
        const error = await addPage.getErrorMessage();
        expect(error).toContain('Postal code is invalid');
    });

    // View contact page
    test('Should logout when pressing logout button - View Contact Page', async ({ page }) => {
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await viewPage.logout();
        await expect(page).toHaveURL('/');
    });

    test('Should view contact details', async ({ page }) => {
        const rowData = await listPage.getContactRowData(0);
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        const contactDetails = await viewPage.getContactDetails();
        expect(contactDetails.firstName).toContain(rowData.firstName);
        expect(contactDetails.lastName).toContain(rowData.lastName);
    });

    test('Should return to contact list from details', async ({ page }) => {
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await viewPage.returnToContactList();
        await expect(page).toHaveURL('/contactList');
    });

    test('Should delete a contact successfully', async ({ page }) => {
        const initialData = await listPage.getContactRowData(0);
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await viewPage.deleteContact(true);
        await expect(page).toHaveURL('/contactList');
        await page.waitForTimeout(1000);
        const afterDelete = await listPage.getContactRowData(0);
        expect(afterDelete.firstName).not.toBe(initialData.firstName);
    });

    test('Should cancel the delete of a contact', async ({ page }) => {
        const initialData = await listPage.getContactRowData(0);
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await viewPage.deleteContact(false);
        await viewPage.returnToContactList();
        await expect(page).toHaveURL('/contactList');
        await page.waitForTimeout(1000);
        const afterDelete = await listPage.getContactRowData(0);
        expect(afterDelete.firstName).toBe(initialData.firstName);
    });
    
    // Edit contact page
    test('Should logout when pressing logout button - Edit Contact Page', async ({ page }) => {
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewPage.clickEdit();
        await expect(page).toHaveURL('/editContact');
        await page.waitForTimeout(1000);
        await editPage.logout();
        await expect(page).toHaveURL('/');
    });

    test('Should edit contact first name', async ({ page }) => {
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewPage.clickEdit();
        await expect(page).toHaveURL('/editContact');
        await page.waitForTimeout(1000);
        const {firstName} = generateRandomContact();
        await editPage.modifyForm(editPage.firstNameInput, firstName);
        await editPage.submit();
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewPage.returnToContactList();
        await page.waitForTimeout(1000);
        const updated = await listPage.getContactRowData(0);
        expect(updated.firstName).toContain(firstName);
    });

    test('Should show error for invalid email', async ({ page }) => {
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewPage.clickEdit();
        await expect(page).toHaveURL('/editContact');
        await page.waitForTimeout(1000);
        await editPage.modifyForm(editPage.emailInput, 'wrongEmail');
        await editPage.submit();
        await page.waitForTimeout(1000);
        const error = await editPage.getErrorMessage();
        expect(error).toContain('Email is invalid');
    });

    test('Should show error for invalid phone number', async ({ page }) => {
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewPage.clickEdit();
        await expect(page).toHaveURL('/editContact');
        await page.waitForTimeout(1000);
        await editPage.modifyForm(editPage.phoneInput, '222');
        await editPage.submit();
        await page.waitForTimeout(1000);
        const error = await editPage.getErrorMessage();
        expect(error).toContain('Phone number is invalid');
    });

    test('Should show error for invalid postal code', async ({ page }) => {
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewPage.clickEdit();
        await expect(page).toHaveURL('/editContact');
        await page.waitForTimeout(1000);
        await editPage.modifyForm(editPage.postalCodeInput, 'aaaa');
        await editPage.submit();
        await page.waitForTimeout(1000);
        const error = await editPage.getErrorMessage();
        expect(error).toContain('Postal code is invalid');
    });

    test('Should return to contact details when pressing cancel button without saving', async ({ page }) => {
        await listPage.clickContactRow(0);
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewPage.clickEdit();
        await expect(page).toHaveURL('/editContact');
        await page.waitForTimeout(1000);
        const {firstName} = generateRandomContact();
        await editPage.modifyForm(editPage.firstNameInput, firstName);
        await editPage.cancel();
        await expect(page).toHaveURL('/contactDetails');
        await page.waitForTimeout(1000);
        await viewPage.returnToContactList();
        await page.waitForTimeout(1000);
        const updated = await listPage.getContactRowData(0);
        expect(updated.firstName).not.toContain(firstName);
    });
});
