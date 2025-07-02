import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly signUpButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator("#submit");
    this.errorMessage = page.locator("#error");
    this.signUpButton = page.locator("#signup");
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async clickOnButton(buttonName: string): Promise<void> {
    switch (buttonName) {
      case "Submit":
        await this.submitButton.click();
        break;
      case "Sign Up":
        await this.signUpButton.click();
        break;
      default:
        throw new Error(`Button ${buttonName} not recognized`);
    }
  }

  getErrorMessage(): Locator {
    return this.errorMessage;
  }
}
