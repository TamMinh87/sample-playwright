import { Locator, Page, expect } from "@playwright/test";
import { allure } from 'allure-playwright';

export async function verifyLocatorVisible(locator: string | Locator, page: Page, name = '', timeout = 20000) {
  const locatorName = name != '' ? name : locator;
  await allure.step(`Verify locator ${locatorName} is visible`, async () => {
    try {
      if(typeof locator === 'string'){
        await page.waitForSelector(locator, {state: 'visible', timeout: timeout})
      } else {
        await locator.waitFor({state: 'visible', timeout: timeout})
      }
    } catch (e) {
      const errorMessage = `Failed to verify locator "${locator}" is visible: ${e.message}`;
      allure.attachment('Error Details', errorMessage, 'text/plain');
      throw new Error(errorMessage);
    }
  });
}

export async function verifyLocatorNotAttachToDom(locator: string | Locator, page: Page) {
  await allure.step(`Verify locator ${locator} is detached`, async () => {
    try {
      if(typeof locator === 'string'){
        await page.waitForSelector(locator, {state: 'detached', timeout: 20000})
      } else {
        await locator.waitFor({state: 'detached', timeout: 20000})
      }
    } catch (e) {
      const errorMessage = `Failed to verify locator "${locator}" is detached: ${e.message}`;
      allure.attachment('Error Details', errorMessage, 'text/plain');
      throw new Error(errorMessage);
    }
  });
}

export async function verifyContainText(locator: Locator, text: string, locatorName: string = '' ) {
  await allure.step(`Verify ${locatorName} contains text "${text}"`, async () => {
    try {
      await locator.waitFor({state: 'visible', timeout: 20000})
      await expect(locator).toContainText(text);
    } catch (e) {
      const errorMessage = `Failed to verify "${locatorName}" contains text "${text}": ${e.message}`;
      allure.attachment('Error Details', errorMessage, 'text/plain');
      throw new Error(errorMessage);
    }
  });
}

