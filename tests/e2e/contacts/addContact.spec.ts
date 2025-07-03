import { test, expect } from "../../../fixtures/custom-fixtures";
import { validUser, generateRandomContact } from "../../utils/testData";

test("Should create a contact with first and last name only", async ({
    loginPage,
    contactListPage,
    addContactPage,
    page,
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickOnButton('Add Contact');
    const { firstName, lastName } = generateRandomContact();
    await addContactPage.fillContactForm({ 
        firstName, 
        lastName,
        birthdate: '',
        email: '',
        phone: '',
        street1: '',
        street2: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country:''
    });
    await addContactPage.clickOnButton('Submit');
    const fullName = `${firstName} ${lastName}`;
    await expect(
        page.locator('#myTable').locator('td', { hasText: fullName })
    ).toBeVisible();
});

test("Should logout when pressing logout button - Add Contact Page", async ({
    loginPage,
    contactListPage,
    addContactPage,
    page,
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickOnButton('Add Contact');
    await addContactPage.clickOnButton('Logout');
    await expect(page).toHaveURL("/");
});

test("Should return to contacts list when pressing cancel button", async ({
    loginPage,
    contactListPage,
    addContactPage,
    page,
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickOnButton('Add Contact');
    await addContactPage.clickOnButton('Cancel');
    await expect(page).toHaveURL("/contactList");
});

test("Should show error when first name is missing", async ({ 
    loginPage,
    contactListPage,
    addContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickOnButton('Add Contact');
    const contact = generateRandomContact();
    contact.firstName = '';
    await addContactPage.fillContactForm(contact);
    await addContactPage.clickOnButton('Submit');
    await expect(addContactPage.getErrorMessage()).toContainText(
        "`firstName` is required"
    );
});

test("Should show error when last name is missing", async ({ 
    loginPage,
    contactListPage,
    addContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickOnButton('Add Contact');
    const contact = generateRandomContact();
    contact.lastName = '';
    await addContactPage.fillContactForm(contact);
    await addContactPage.clickOnButton('Submit');
    await expect(addContactPage.getErrorMessage()).toContainText(
        "`lastName` is required"
    );
});

test("Should show error for invalid email format", async ({ 
    loginPage,
    contactListPage,
    addContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickOnButton('Add Contact');
    const contact = generateRandomContact();
    contact.email = "wrong";
    await addContactPage.fillContactForm(contact);
    await addContactPage.clickOnButton('Submit');
    await expect(addContactPage.getErrorMessage()).toContainText(
        "Email is invalid"
    );
});

test("Should show error for invalid phone format", async ({ 
    loginPage,
    contactListPage,
    addContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickOnButton('Add Contact');
    const contact = generateRandomContact();
    contact.phone = "777";
    await addContactPage.fillContactForm(contact);
    await addContactPage.clickOnButton('Submit');
    await expect(addContactPage.getErrorMessage()).toContainText(
        "Phone number is invalid"
    );
});

test("Should show error for invalid postal code format", async ({ 
    loginPage,
    contactListPage,
    addContactPage
}) => {
    await loginPage.login(validUser.email, validUser.password);
    await contactListPage.clickOnButton('Add Contact');
    const contact = generateRandomContact();
    contact.postalCode = "aaa";
    await addContactPage.fillContactForm(contact);
    await addContactPage.clickOnButton('Submit');
    await expect(addContactPage.getErrorMessage()).toContainText(
        "Postal code is invalid"
    );
});