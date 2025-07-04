import { test, expect } from "../../../fixtures/custom-fixtures";

test.describe("/users/me GET", () => {
  test("should get user profile", async ({ request }) => {
    const response = await request.get("/users/me");
    expect(response.ok()).toBeTruthy();
    const userData = await response.json();
    expect(userData).toHaveProperty("_id");
    expect(userData).toHaveProperty("firstName");
    expect(userData).toHaveProperty("lastName");
    expect(userData).toHaveProperty("email");
  });
});