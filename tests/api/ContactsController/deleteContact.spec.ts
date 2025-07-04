import { test, expect, getFirstContactId } from "../../../fixtures/custom-fixtures";

test.describe("/contacts/:id DELETE", () => {
  test("should delete a contact", async ({ request }) => {
    const contactId = await getFirstContactId(request);
    expect(contactId).toBeDefined();

    const deleteResponse = await request.delete(`/contacts/${contactId}`);
    expect(deleteResponse.ok()).toBeTruthy();

    const checkResponse = await request.get(`/contacts/${contactId}`);
    expect(checkResponse.status()).toBe(404);
  });
});
