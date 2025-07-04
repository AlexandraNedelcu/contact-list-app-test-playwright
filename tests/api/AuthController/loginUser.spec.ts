import { test, expect } from "../../../fixtures/custom-fixtures";
import { validUser } from "../../utils/testData";

test.describe("/users/login POST", () => {
  test("should login user", async ({ request }) => {
    const response = await request.post("/users/login", {
        data: validUser
    });
    expect(response.ok()).toBeTruthy();
    const userData = await response.json();
    expect(userData).toHaveProperty("user");
    expect(userData).toHaveProperty("token");
  });
});