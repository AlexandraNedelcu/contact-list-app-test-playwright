import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { RegisterPage } from '../../pages/registerPage';
import { validUser, generateRandomUser } from '../utils/testData';

test.describe('Auth E2E Flow', () => {
    let loginPage: LoginPage;
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
    });

    test('Should login successfully with valid credentials', async ({ page }) => {
        await page.goto('/');
        await loginPage.login(validUser.email, validUser.password);
        await expect(page).toHaveURL('/contactList');
    });

    test('Should show error with wrong password', async ({ page }) => {
        await page.goto('/');
        await loginPage.login(validUser.email, 'wrongPassword');
        await page.waitForTimeout(2000);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Incorrect username or password');
    });

    test('Should show error with non-existent email', async ({ page }) => {
        const user = generateRandomUser();
        await page.goto('/');
        await loginPage.login(user.email, user.password);
        await page.waitForTimeout(2000);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Incorrect username or password');
    });

    test('Should show error with empty fields', async ({ page }) => {
        await page.goto('/');
        await loginPage.login('', '');
        await page.waitForTimeout(2000);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Incorrect username or password');
    });

    test('Should go to register page from login page', async ({ page }) => {
        await page.goto('/');
        await loginPage.goToSignUp();
        await expect(page).toHaveURL('/addUser');
    });

    test('Should register successfully', async ({ page }) => {
        const user = generateRandomUser();
        await page.goto('/addUser');
        await registerPage.register(user.firstName, user.lastName, user.email, user.password);
        await expect(page).toHaveURL('/contactList');
    });

    test('Should show error when fields are empty', async ({ page }) => {
        await page.goto('/addUser');
        await registerPage.register('', '', '', '');
        await page.waitForTimeout(2000);
        const error = await registerPage.getErrorMessage();
        expect(error).toContain('firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.');
    });

    test('Should show error for already registered email', async ({ page }) => {
        const user = generateRandomUser();
        await page.goto('/addUser');
        await registerPage.register(user.firstName, user.lastName, validUser.email, user.password);
        await page.waitForTimeout(2000);
        const error = await registerPage.getErrorMessage();
        expect(error).toContain('Email address is already in use');
    });

    test('Should show error for invalid email format', async ({ page }) => {
        const user = generateRandomUser();
        await page.goto('/addUser');
        await registerPage.register(user.firstName, user.lastName, 'invalidemail', user.password);
        await page.waitForTimeout(2000);
        const error = await registerPage.getErrorMessage();
        expect(error).toContain('Email is invalid');
    });

    test('Should show error for short password', async ({ page }) => {
        const user = generateRandomUser();
        await page.goto('/addUser');
        await registerPage.register(user.firstName, user.lastName, user.email, '123');
        await page.waitForTimeout(2000);
        const error = await registerPage.getErrorMessage();
        expect(error).toContain('is shorter than the minimum allowed length (7)');
    });
});