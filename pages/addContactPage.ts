import { Locator, Page } from '@playwright/test';

export class AddContactPage {
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
    await this.page.goto("/addContact");
  }

  async clickOnButton(buttonName: string): Promise<void> {
    switch (buttonName) {
      case "Submit":
        await this.submitButton.click();
        break;
      case "Cancel":
        await this.cancelButton.click();
        break;
      case "Logout":
        await this.logoutButton.click();
        break;
      default:
        throw new Error(`Button ${buttonName} not recognized`);
    }
  }

  async fillContactForm(contact: {
    firstName: string;
    lastName: string;
    birthdate: string | '';
    email: string | '';
    phone: string | '';
    street1: string | '';
    street2: string | '';
    city: string | '';
    stateProvince: string | '';
    postalCode: string | '';
    country: string | '';
  }) {
    if (contact.firstName !== undefined) await this.firstNameInput.fill(contact.firstName);
    if (contact.lastName !== undefined) await this.lastNameInput.fill(contact.lastName);
    if (contact.birthdate !== undefined) await this.birthdateInput.fill(contact.birthdate);
    if (contact.email !== undefined) await this.emailInput.fill(contact.email);
    if (contact.phone !== undefined) await this.phoneInput.fill(contact.phone);
    if (contact.street1 !== undefined) await this.streetAddress1Input.fill(contact.street1);
    if (contact.street2 !== undefined) await this.streetAddress2Input.fill(contact.street2);
    if (contact.city !== undefined) await this.cityInput.fill(contact.city);
    if (contact.stateProvince !== undefined) await this.stateProvinceInput.fill(contact.stateProvince);
    if (contact.postalCode !== undefined) await this.postalCodeInput.fill(contact.postalCode);
    if (contact.country !== undefined) await this.countryInput.fill(contact.country);
  }

  getErrorMessage(): Locator {
    return this.errorMessage;
  }
}
