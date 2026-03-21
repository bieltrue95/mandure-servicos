import { test, expect } from '@playwright/test';

test.describe('Portfolio - Filtro de Categorias', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const portfolio = page.locator('section[aria-label*="Portfolio"]');
    await portfolio.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
  });

  test('deve exibir todos os projetos por padrão', async ({ page }) => {
    const cards = page.locator('[data-testid="project-card"]');
    await expect(cards).toHaveCount(6);
  });

  test('deve filtrar por Residencial', async ({ page }) => {
    await page.getByRole('tab', { name: 'Residencial' }).click();
    await page.waitForTimeout(600);
    const cards = page.locator('[data-testid="project-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(6);
  });

  test('deve filtrar por Comercial', async ({ page }) => {
    await page.getByRole('tab', { name: 'Comercial' }).click();
    await page.waitForTimeout(600);
    const cards = page.locator('[data-testid="project-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('deve voltar ao Todos', async ({ page }) => {
    await page.getByRole('tab', { name: 'Residencial' }).click();
    await page.waitForTimeout(400);
    await page.getByRole('tab', { name: 'Todos' }).click();
    await page.waitForTimeout(600);
    const cards = page.locator('[data-testid="project-card"]');
    await expect(cards).toHaveCount(6);
  });
});
