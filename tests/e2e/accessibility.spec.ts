import { test, expect } from '@playwright/test';

test.describe('Acessibilidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve ter lang="pt-BR" no html', async ({ page }) => {
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('pt-BR');
  });

  test('deve ter hierarquia de headings correta', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    const h2 = page.locator('h2');
    const h2Count = await h2.count();
    expect(h2Count).toBeGreaterThan(3);
  });

  test('botões devem ter texto acessível ou aria-label', async ({ page }) => {
    const buttons = page.locator('button, [role="button"]');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = await btn.textContent();
      const ariaLabel = await btn.getAttribute('aria-label');
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test('WhatsApp link deve ter aria-label', async ({ page }) => {
    const floatingBtn = page.locator('[aria-label="Falar pelo WhatsApp"]');
    await expect(floatingBtn).toBeVisible();
  });

  test('sections devem ter aria-labels', async ({ page }) => {
    const sections = page.locator('section[aria-label]');
    const count = await sections.count();
    expect(count).toBeGreaterThan(5);
  });
});
