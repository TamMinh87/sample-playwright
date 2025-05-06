import { test } from "../fixtures/base";
import ENV from "../utils/env";

test.describe("Login test", () => {
  test.beforeEach("Open start URL", async ({ loginPage }) => {
    await loginPage.openLoginPage();
  });

  test('Login with correct credential',  async ({ loginPage, dashboardPage }) => {
    await loginPage.enterEmail(ENV.USERNAME);
    await loginPage.enterPassword(ENV.PASSWORD);
    await loginPage.clickLogIn();
    await dashboardPage.verifyUserDropdownDisplays();
  });
});
