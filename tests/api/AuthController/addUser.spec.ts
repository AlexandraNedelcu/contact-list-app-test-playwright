import { test, expect } from "../../../fixtures/custom-fixtures";
import { generateRandomUser } from "../../utils/testData"

test.describe("/users POST", () => {
  test("should add an user", async ({ request }) => {
    const randomUser = generateRandomUser();
    const response = await request.post("/users", {
      data: randomUser
    });
    expect(response.ok()).toBeTruthy();
  });
});