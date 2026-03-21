import { test, expect } from '@playwright/test';

test.describe('Performance e Otimização', () => {
  test('imagens devem ter atributo alt', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('hero image deve ter priority', async ({ page }) => {
    await page.goto('/');
    // Next.js com priority adiciona fetchpriority="high"
    const heroImg = page.locator('section[aria-label*="Hero"] img').first();
    if (await heroImg.count() > 0) {
      const fetchPriority = await heroImg.getAttribute('fetchpriority');
      expect(fetchPriority).toBe('high');
    }
  });

  test('página deve ter title correto', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mandure Serviços/);
  });

  test('deve ter viewport meta tag', async ({ page }) => {
    await page.goto('/');
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('manifest.json deve ser acessível', async ({ page }) => {
    const response = await page.goto('/manifest.json');
    expect(response?.status()).toBe(200);
  });
});
