import { expect, test } from '@playwright/test';

test.describe('Home @smoke', () => {
  test('renderiza seções principais da landing page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Mandure Serviços/i);
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#stats')).toBeVisible();
    await expect(page.locator('#servicos')).toBeVisible();
    await expect(page.locator('#processo')).toBeVisible();
    await expect(page.locator('footer[role=\"contentinfo\"]')).toBeVisible();
  });
});
