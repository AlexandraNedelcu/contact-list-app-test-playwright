import { test, expect } from "../../../fixtures/custom-fixtures";

test.describe("/contacts GET", () => {
  test("Should get contact list", async ({ request }) => {
    const response = await request.get("/contacts");
    expect(response.ok()).toBeTruthy();
    const contacts = await response.json();
    expect(Array.isArray(contacts)).toBeTruthy();
  });
});
