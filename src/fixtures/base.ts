import base from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

type BaseFixtures = {
    loginPage: LoginPage,
    dashboardPage: DashboardPage,
}

export const test = base.extend<BaseFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    }
});

export const expect = base.expect;