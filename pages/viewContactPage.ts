import { Locator, Page, expect } from '@playwright/test';

export class ViewContactPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly returnButton: Locator;
    readonly deleteButton: Locator;
    readonly editButton: Locator;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly birthdate: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly streetAddress1: Locator;
    readonly streetAddress2: Locator;
    readonly city: Locator;
    readonly stateProvince: Locator;
    readonly postalCode: Locator;
    readonly country: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.locator('#logout');
        this.returnButton = page.locator('#return');
        this.deleteButton = page.locator('#delete');
        this.editButton = page.locator('#edit-contact');

        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.birthdate = page.locator('#birthdate');
        this.email = page.locator('#email');
        this.phone = page.locator('#phone');
        this.streetAddress1 = page.locator('#street1');
        this.streetAddress2 = page.locator('#street2');
        this.city = page.locator('#city');
        this.stateProvince = page.locator('#stateProvince');
        this.postalCode = page.locator('#postalCode');
        this.country = page.locator('#country');
    }

    async goto() {
        await this.page.goto("/contactDetails");
    }

    async clickOnButton(buttonName: string): Promise<void> {
        switch (buttonName) {
        case "Return":
            await this.returnButton.click();
            break;
        case "Logout":
            await this.logoutButton.click();
            break;
        case "Edit":
            await this.editButton.click();
            break;
        default:
            throw new Error(`Button ${buttonName} not recognized`);
        }
    }

    async deleteContact(confirm: boolean = true) {
        this.page.once('dialog', async dialog => {
        if (confirm) {
            await dialog.accept();
        } else {
            await dialog.dismiss();
        }
        });
        await this.deleteButton.click();
    }

    async getContactDetails() {
        return {
        firstName: await this.firstName.textContent(),
        lastName: await this.lastName.textContent(),
        birthdate: await this.birthdate.textContent(),
        email: await this.email.textContent(),
        phone: await this.phone.textContent(),
        streetAddress1: await this.streetAddress1.textContent(),
        streetAddress2: await this.streetAddress2.textContent(),
        city: await this.city.textContent(),
        stateProvince: await this.stateProvince.textContent(),
        postalCode: await this.postalCode.textContent(),
        country: await this.country.textContent(),
        };
    }

    async waitForHydration() {
        await expect(this.firstName).not.toHaveText('');
    }

    getContactFirstName(): Locator {
        return this.firstName
    }
}