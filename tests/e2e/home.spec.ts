import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve carregar sem erros', async ({ page }) => {
    await expect(page).toHaveTitle(/Mandure Serviços/);
    await expect(page.locator('main')).toBeVisible();
  });

  test('Hero deve exibir conteúdo principal', async ({ page }) => {
    const hero = page.locator('section[aria-label*="Hero"]');
    await expect(hero).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/Construímos|Solidez|Precisão/i);
  });

  test('Stats deve exibir 4 números', async ({ page }) => {
    const statsSection = page.locator('section[aria-label*="Estatísticas"]');
    await statsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(statsSection).toBeVisible();
  });

  test('WhatsApp button deve estar visível', async ({ page }) => {
    const whatsappBtn = page.locator('[aria-label="Contato via WhatsApp"]');
    await expect(whatsappBtn).toBeVisible();
  });

  test('deve ter metadata SEO correto', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /empreiteira|construção/i);
  });

  test('deve ter JSON-LD schema', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const content = await jsonLd.textContent();
    expect(content).toContain('GeneralContractor');
    expect(content).toContain('Mandure Serviços');
  });
});
