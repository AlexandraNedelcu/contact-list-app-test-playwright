import { Page, Locator } from '@playwright/test';

export class ContactListPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly addContactButton: Locator;
    readonly contactsTableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.locator('#logout');
        this.addContactButton = page.locator('#add-contact');
        this.contactsTableRows = page.locator('#myTable tr.contactTableBodyRow');
    }

    async goto() {
        await this.page.goto("/contactList");
    }

    async clickOnButton(buttonName: string): Promise<void> {
        switch (buttonName) {
        case "Add Contact":
            await this.addContactButton.click();
            break;
        case "Logout":
            await this.logoutButton.click();
            break;
        default:
            throw new Error(`Button ${buttonName} not recognized`);
        }
    }

    async isContactInTable(fullName: string): Promise<boolean> {
        return await this.page.locator('#myTable').locator('td', { hasText: fullName }).count() > 0;
    }

    async getContactRowData(rowIndex: number) {
        const row = this.contactsTableRows.nth(rowIndex);
        const columns = row.locator('td');

        const fullName = await columns.nth(1).textContent() ?? '';
        const [firstName, ...lastNameParts] = fullName.trim().split(' ');
        const lastName = lastNameParts.join(' ');

        const locationRaw = (await columns.nth(6).textContent())?.trim() ?? '';
        const locationParts = locationRaw.split(' ');
        const postalCode = locationParts.pop() || '';
        const stateProvince = locationParts.pop() || '';
        const city = locationParts.join(' ');

        return {
            id: await columns.nth(0).textContent(),
            firstName,
            lastName,
            birthdate: await columns.nth(2).textContent(),
            email: await columns.nth(3).textContent(),
            phone: await columns.nth(4).textContent(),
            address: await columns.nth(5).textContent(),
            city,
            stateProvince,
            postalCode,
            country: await columns.nth(7).textContent(),
        };
    }

    async clickContactRow(rowIndex: number) {
        await this.contactsTableRows.nth(rowIndex).click();
    }
}
