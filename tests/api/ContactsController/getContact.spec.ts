import { test, expect, getFirstContactId } from "../../../fixtures/custom-fixtures";

test.describe("/contacts/:id GET", () => {
  test("should get a contact", async ({ request }) => {
    const contactId = await getFirstContactId(request);
    expect(contactId).toBeDefined();

    const response = await request.get(`/contacts/${contactId}`);
    expect(response.ok()).toBeTruthy();

    const contact = await response.json();
    expect(contact._id).toBe(contactId);
    expect(contact).toHaveProperty("firstName");
    expect(contact).toHaveProperty("lastName");
  });
});
