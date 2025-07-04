import { test, expect, getFirstContactId } from "../../../fixtures/custom-fixtures";
import { generateRandomContact } from "../../utils/testData"

test.describe("/contacts/:id PUT", () => {
  test("should update a contact", async ({ request }) => {
    const contactId = await getFirstContactId(request);
    expect(contactId).toBeDefined();

    const updatedData = generateRandomContact();
    const response = await request.put(`/contacts/${contactId}`, {
      data: updatedData
    });
    expect(response.ok()).toBeTruthy();

    const updatedContact = await response.json();
    expect(updatedContact.firstName).toBe(updatedData.firstName);
    expect(updatedContact.email).toBe(updatedData.email.toLowerCase());
  });
});

test.describe("/contacts/:id PATCH", () => {
  test("should update a contact", async ({ request }) => {
    const contactId = await getFirstContactId(request);
    expect(contactId).toBeDefined();

    const updatedData = generateRandomContact();
    const response = await request.patch(`/contacts/${contactId}`, {
      data: {
        firstName: updatedData.firstName
      }
    });
    expect(response.ok()).toBeTruthy();

    const updatedContact = await response.json();
    expect(updatedContact.firstName).toBe(updatedData.firstName);
  });
});
