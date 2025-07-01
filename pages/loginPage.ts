import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly signUpButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
      this.page = page;
      this.emailInput = page.locator('#email');
      this.passwordInput = page.locator('#password');
      this.loginButton = page.locator('#submit');
      this.errorMessage = page.locator('#error');
      this.signUpButton = page.locator('#signup');
    }

    async goto() {
      await this.page.goto('/');
    }

    async login(email: string, password: string) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }

    async goToSignUp() {
      await this.signUpButton.click();
    }

    async getErrorMessage() {
      return await this.errorMessage.innerText();
    }
}
