import { test as baseTest, request as baseRequest, APIRequestContext } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { RegisterPage } from "../pages/registerPage";
import { AddContactPage  } from "../pages/addContactPage";
import { ContactListPage } from "../pages/contactListPage";
import { EditContactPage } from "../pages/editContactPage";
import { ViewContactPage } from "../pages/viewContactPage";
import fs from "fs";

type MyFixtures = {
  authToken: string;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  addContactPage: AddContactPage;
  contactListPage: ContactListPage;
  editContactPage: EditContactPage;
  viewContactPage: ViewContactPage;
  navigateToBaseUrl: void;
  request: typeof baseRequest;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  addContactPage: async ({ page }, use) => {
    await use(new AddContactPage(page));
  },
  contactListPage: async ({ page }, use) => {
    await use(new ContactListPage(page));
  },
  editContactPage: async ({ page }, use) => {
    await use(new EditContactPage(page));
  },
  viewContactPage: async ({ page }, use) => {
    await use(new ViewContactPage(page));
  },
  navigateToBaseUrl: [
    async ({ page, baseURL }, use) => {
      await page.goto(baseURL!);
      await use();
    },
    { auto: true },
  ],
  request: async ({ baseURL }, use) => {
    const storage = JSON.parse(fs.readFileSync(".auth/cookies.json", "utf-8"));
    const tokenCookie = storage.cookies.find((c: any) => c.name === "token");
    if (!tokenCookie?.value) {
      throw new Error("Bearer token not found in .auth/cookies.json");
    }
    const token = tokenCookie.value;
    const apiRequest = await baseRequest.newContext({
      baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    await use(apiRequest);
    await apiRequest.dispose();
  },
});

export async function getFirstContactId(request: APIRequestContext): Promise<string> {
  const listResponse = await request.get("/contacts");
  if (!listResponse.ok()) throw new Error("Failed to fetch contact list");
  const contacts = await listResponse.json();
  const contactId = contacts[0]?._id;
  if (!contactId) throw new Error("No contacts found in the list");
  return contactId;
}

export { expect } from "@playwright/test";
