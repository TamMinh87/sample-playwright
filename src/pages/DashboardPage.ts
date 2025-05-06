import { expect, type Page } from "@playwright/test";
import { NavBar } from "./common/navbar";
import { decorateMethodsWithAllure, step } from "../utils/allureDecorators";

export class DashboardPage {
  readonly page: Page;
  readonly navbar: NavBar;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavBar(page);
  }

  async verifyUserDropdownDisplays(){
    await expect(this.navbar.userDropdown).toBeVisible();
  }
}

decorateMethodsWithAllure(DashboardPage);
