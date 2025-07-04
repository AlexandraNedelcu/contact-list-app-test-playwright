import { test, expect } from "../../../fixtures/custom-fixtures";

test.describe("/users/me DELETE", () => {
  test("should delete user", async ({ request }) => {
    const response = await request.delete("/users/me");
    expect(response.ok()).toBeTruthy();
  });
});