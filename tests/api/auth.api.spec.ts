import { test, expect } from '@playwright/test';
import { registerUser, loginUser, logoutUser } from '../utils/apiHelpers';
import { generateRandomUser, validUser } from '../utils/testData';

test.describe('Auth API tests', () => {
    let testUser = generateRandomUser();

    test.describe('Register User Scenarios', () => {
        test('Register user - success', async () => {
            const response = await registerUser(
                testUser.firstName,
                testUser.lastName,
                testUser.email,
                testUser.password
            );
            expect(response).toHaveProperty('token');
        });

        test('Register User - Fail with empty fields', async () => {
            // All fields empty
            await expect(
                registerUser('', '', '', '')).rejects.toThrow();
            // Email empty
            await expect(
                registerUser(
                    testUser.firstName, 
                    testUser.lastName, 
                    '', 
                    testUser.password
                )
            ).rejects.toThrow();
            // First name empty
            await expect(
                registerUser(
                    '', 
                    testUser.lastName, 
                    testUser.email, 
                    testUser.password
                )
            ).rejects.toThrow();
            // Last name empty
            await expect(
                registerUser(
                    testUser.firstName, 
                    '', 
                    testUser.email, 
                    testUser.password
                )
            ).rejects.toThrow();
            // Password empty
            await expect(
                registerUser(
                    testUser.firstName, 
                    testUser.lastName, 
                    testUser.email, 
                    ''
                )
            ).rejects.toThrow();
        });

        test('Register User - Fail with email already used', async () => {
            await expect(
                registerUser(
                    testUser.firstName, 
                    testUser.lastName, 
                    validUser.email, 
                    testUser.password
                )
            ).rejects.toThrow();
        });

        test('Register User - Fail with invalid email format', async () => {
            await expect(
                registerUser(
                    testUser.firstName, 
                    testUser.lastName, 
                    'invalid-email', 
                    testUser.password
                )
            ).rejects.toThrow();
            await expect(
                registerUser(
                    testUser.firstName, 
                    testUser.lastName, 
                    'invalid@.com', 
                    testUser.password
                )
            ).rejects.toThrow();
            await expect(
                registerUser(
                    testUser.firstName, 
                    testUser.lastName, 
                    'invalid@com', 
                    testUser.password
                )
            ).rejects.toThrow();
        });

        test('Register User - Fail with short password', async () => {
            await expect(
                registerUser(
                    testUser.firstName, 
                    testUser.lastName, 
                    testUser.email, 
                    '123'
                )
            ).rejects.toThrow();
            await expect(
                registerUser(
                    testUser.firstName, 
                    testUser.lastName, 
                    testUser.email, 
                    '123456'
                )
            ).rejects.toThrow();
        });
    });

    test('Login User - Success', async () => {
        const token = await loginUser(validUser.email, validUser.password);
        expect(token).toBeTruthy();
    });

    test('Login User - Fail with wrong password', async () => {
        await expect(
            loginUser(validUser.email, 'wrongpassword')
        ).rejects.toThrow();
    });

    test('Logout User', async () => {
        const token = await loginUser(validUser.email, validUser.password);
        const isLoggedOut = await logoutUser(token);
        expect(isLoggedOut).toBe(true);
    });
});

