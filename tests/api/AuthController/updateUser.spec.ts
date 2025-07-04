import { test, expect } from "../../../fixtures/custom-fixtures";
import { generateRandomUser } from "../../utils/testData"

test.describe("/users/me PATCH", () => {
  test("should update user", async ({ request }) => {
    const updatedData = generateRandomUser();
    const response = await request.patch("/users/me", {
      data: updatedData
    });
    expect(response.ok()).toBeTruthy();

    const updatedUser = await response.json();
    expect(updatedUser.firstName).toBe(updatedData.firstName);
  });
});