import { type Locator, type Page } from "@playwright/test";
import ENV from "../utils/env";
import path from "path";
import { decorateMethodsWithAllure, step } from "../utils/allureDecorators";

export class LoginPage {
  readonly page: Page;
  readonly logInBtn: Locator;
  readonly nameTxt: Locator;
  readonly passwordTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInBtn = page.locator(".orangehrm-login-button");
    this.nameTxt = page.locator("[name='username']");
    this.passwordTxt = page.locator("[name='password']");
  }

  async openLoginPage() {
    await this.page.goto(new URL(path.join(`${ENV.BASE_URL}`)).toString());
    await this.page.waitForLoadState("load", { timeout: 60000 });
  }

  async clickLogIn() {
    await this.logInBtn.click();
  }

  async enterEmail(email: string) {
    await this.nameTxt.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordTxt.fill(password);
  }

  async loginWithCorrectCredential(){
    await this.enterEmail(ENV.USERNAME);
    await this.enterPassword(ENV.PASSWORD);
    await this.clickLogIn();
  }
}

decorateMethodsWithAllure(LoginPage);
