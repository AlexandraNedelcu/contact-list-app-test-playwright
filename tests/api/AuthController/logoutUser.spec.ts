import { test, expect } from "../../../fixtures/custom-fixtures";

test.describe("/users/logout POST", () => {
  test("should logout user", async ({ request }) => {
    const response = await request.post("/users/logout");
    expect(response.ok()).toBeTruthy();
  });
});