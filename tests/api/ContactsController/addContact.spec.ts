import { test, expect } from "../../../fixtures/custom-fixtures";

test.describe("/contacts POST", () => {
  test("should add a contact", async ({ request }) => {
    const response = await request.post("/contacts", {
      data: {
        firstName: "John",
        lastName: "Doe",
      },
    });
    expect(response.ok()).toBeTruthy();
  });
});
