import { Locator, Page } from '@playwright/test';

export class EditContactPage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly birthdateInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly streetAddress1Input: Locator;
  readonly streetAddress2Input: Locator;
  readonly cityInput: Locator;
  readonly stateProvinceInput: Locator;
  readonly postalCodeInput: Locator;
  readonly countryInput: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  readonly url = '/editContact';

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('#logout');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.birthdateInput = page.locator('#birthdate');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');
    this.streetAddress1Input = page.locator('#street1');
    this.streetAddress2Input = page.locator('#street2');
    this.cityInput = page.locator('#city');
    this.stateProvinceInput = page.locator('#stateProvince');
    this.postalCodeInput = page.locator('#postalCode');
    this.countryInput = page.locator('#country');
    this.submitButton = page.locator('#submit');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('#error');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async logout() {
        await this.logoutButton.click();
    }

  async modifyForm(field: any , value: string) {
    await field.fill(value);
  }

  async submit() {
    await this.submitButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }
}
