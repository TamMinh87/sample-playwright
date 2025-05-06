import { test } from "../fixtures/base";

test.describe("Search test", () => {
  test.beforeEach("Open start URL", async ({ loginPage }) => {
    await loginPage.openLoginPage();
    await loginPage.loginWithCorrectCredential();
  });

  test("Search 'Admin' in navigation bar",  async ({ dashboardPage }) => {
    await dashboardPage.navbar.search('Admin');
    await dashboardPage.navbar.verifyNumberOfOptionsInNavigationBar(1);
    await dashboardPage.navbar.verifyAdminOptionDisplays();
  });
});
