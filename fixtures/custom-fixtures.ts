import { test as baseTest } from '@playwright/test';
import { loginUser } from '../tests/utils/apiHelpers';

type MyFixtures = {
  authToken: string;
};

export const test = baseTest.extend<MyFixtures>({
  authToken: async ({}, use) => {
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;
    const token = await loginUser(email, password);
    await use(token);
  },
});

export { expect } from '@playwright/test';
