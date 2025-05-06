import { expect, type Locator, type Page } from "@playwright/test";

export class NavBar {
  readonly page: Page;
  readonly adminOption: Locator;
  readonly searchBox: Locator;
  readonly userDropdown: Locator;
  readonly navBarOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminOption = page.locator("//a[contains(@href,'viewAdminModule')]");
    this.searchBox = page.locator(".oxd-main-menu-search input");
    this.userDropdown = page.locator(".oxd-userdropdown");
    this.navBarOptions = page.locator("ul.oxd-main-menu li");
  }

  async openAdminPage() {
    await this.adminOption.click();
  }

  async search(query: string) {
    await this.searchBox.fill(query);
  }

  async verifyNumberOfOptionsInNavigationBar(number: number){
    const numberOfOptions = await this.navBarOptions.count();
    expect(numberOfOptions).toBe(number);
  }

  async verifyAdminOptionDisplays(){
    await expect(this.adminOption).toBeVisible();
  }
}