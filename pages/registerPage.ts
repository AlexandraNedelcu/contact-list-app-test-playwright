import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
      this.page = page;
      this.firstNameInput = page.locator('#firstName');
      this.lastNameInput = page.locator('#lastName');
      this.emailInput = page.locator('#email');
      this.passwordInput = page.locator('#password');
      this.submitButton = page.locator('#submit');
      this.cancelButton = page.locator('#cancel');
      this.errorMessage = page.locator('#error');
    }

    async goto() {
      await this.page.goto('/addUser');
    }

    async register(firstName: string, lastName: string, email: string, password: string) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
    }

    async goToSignIn() {
      await this.cancelButton.click();
    }

    async getErrorMessage() {
      return await this.errorMessage.textContent();
    }
}
