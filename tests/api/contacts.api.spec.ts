import { test, expect } from '@playwright/test';
import {
    loginUser,
    createContact,
    getContacts,
    getContactForEdit,
    updateContact,
    deleteContact,
} from '../utils/apiHelpers';
import { validUser, generateRandomContact } from '../utils/testData';

test.describe.serial('Contacts API tests', () => {
    let token: string;
    let contactId: string;

    test.beforeAll(async () => {
        token = await loginUser(validUser.email, validUser.password);
    });

    test('Create Contact - Fail without First Name', async () => {
        const contact = generateRandomContact();
        delete contact.firstName;
        await expect(createContact(token, contact)).rejects.toThrow();
    });

    test('Create Contact - Fail without Last Name', async () => {
        const contact = generateRandomContact();
        delete contact.lastName;
        await expect(createContact(token, contact)).rejects.toThrow();
    });

    test('Create Contact - Fail with invalid birthdate format', async () => {
        const contact = generateRandomContact();
        contact.birthdate = '31-12-1990';
        await expect(createContact(token, contact)).rejects.toThrow();
    });

    test('Create Contact - Fail with invalid email format', async () => {
        const contact = generateRandomContact();
        contact.email = 'invalid-email';
        await expect(createContact(token, contact)).rejects.toThrow();
    });

    test('Create Contact - Fail with invalid phone number', async () => {
        const contact = generateRandomContact();
        contact.phone = '123';
        await expect(createContact(token, contact)).rejects.toThrow();
    });

    test('Create Contact - Fail with invalid postal code', async () => {
        const contact = generateRandomContact();
        contact.postalCode = '12';
        await expect(createContact(token, contact)).rejects.toThrow();
    });

    test('Create Contact - Success with First Name and Last Name only', async () => {
        const contact = generateRandomContact();
        const minimalContact = {
            firstName: contact.firstName,
            lastName: contact.lastName,
        };
        const response = await createContact(token, minimalContact);
        expect(response).toHaveProperty('_id');
        expect(response.firstName).toBe(minimalContact.firstName);
        expect(response.lastName).toBe(minimalContact.lastName);
    });

    test('Create Contact - Success', async () => {
        const contact = generateRandomContact();
        const response = await createContact(token, contact);
        expect(response).toHaveProperty('_id');
        contactId = response.id;
    });

    test('Get All Contacts - Success', async () => {
        const contact = generateRandomContact();
        const newContact = await createContact(token, contact);
        const contactsList = await getContacts(token);
        expect(Array.isArray(contactsList)).toBe(true);
        expect(contactsList.length).toBeGreaterThan(0);
        const found = contactsList.find(c => c._id === newContact._id);
        expect(found).toBeDefined();
    });

    test('Get Contact for Edit - Success', async () => {
        const contact = generateRandomContact();
        const contactToGet = await createContact(token, contact);
        const fetchedContact = await getContactForEdit(token, contactToGet._id);
        expect(fetchedContact._id).toBe(contactToGet._id);
        expect(fetchedContact.firstName).toBe(contactToGet.firstName);
        expect(fetchedContact.lastName).toBe(contactToGet.lastName);
    });

    test('Update Contact - Fail without First Name', async () => {
        const updatedData = { firstName: '' };
        await expect(updateContact(token, contactId, updatedData)).rejects.toThrow();
    });

    test('Update Contact - Fail without Last Name', async () => {
        const updatedData = { lastName: '' };
        await expect(updateContact(token, contactId, updatedData)).rejects.toThrow();
    });

    test('Update Contact - Fail with invalid birthdate format', async () => {
        const updatedData = { birthDate: '12/31/1990' };
        await expect(updateContact(token, contactId, updatedData)).rejects.toThrow();
    });

    test('Update Contact - Fail with invalid email format', async () => {
        const updatedData = { email: 'bad-email' };
        await expect(updateContact(token, contactId, updatedData)).rejects.toThrow();
    });

    test('Update Contact - Fail with invalid phone number', async () => {
        const updatedData = { phone: '123' };
        await expect(updateContact(token, contactId, updatedData)).rejects.toThrow();
    });

    test('Update Contact - Fail with invalid postal code', async () => {
        const updatedData = { postalCode: '12' };
        await expect(updateContact(token, contactId, updatedData)).rejects.toThrow();
    });

    test('Update Contact - Success', async () => {
        const contact = generateRandomContact();
        await expect(updateContact(token, contactId, contact)).rejects.toThrow();
    });

    test('Delete Contact - Success', async () => {
        const contact = generateRandomContact();
        const contactToDelete = await createContact(token, contact);
        const deleteResult = await deleteContact(token, contactToDelete._id);
        expect(deleteResult).toBe(true);
        await expect(getContactForEdit(token, contactToDelete.id)).rejects.toThrow();
    });
});