import { test, expect } from '@playwright/test';

test.describe('WhatsApp CTAs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Hero CTA deve ter link WhatsApp válido', async ({ page }) => {
    const heroSection = page.locator('section[aria-label*="Hero"]');
    const ctaLink = heroSection.locator('a[href*="wa.me"]').first();
    await expect(ctaLink).toBeVisible();
    const href = await ctaLink.getAttribute('href');
    expect(href).toContain('wa.me');
    expect(href).toContain('text=');
  });

  test('WhatsApp button flutuante deve ter link correto', async ({ page }) => {
    const floatingBtn = page.locator('[aria-label="Contato via WhatsApp"] a');
    await expect(floatingBtn).toBeVisible();
    const href = await floatingBtn.getAttribute('href');
    expect(href).toContain('wa.me');
  });

  test('CTA Final deve ter botão WhatsApp', async ({ page }) => {
    const ctaSection = page.locator('section[aria-label*="CTA"]');
    await ctaSection.scrollIntoViewIfNeeded();
    const ctaLink = ctaSection.locator('a[href*="wa.me"]');
    await expect(ctaLink).toBeVisible();
  });

  test('links WhatsApp devem abrir em nova aba', async ({ page }) => {
    const whatsappLinks = page.locator('a[href*="wa.me"]');
    const count = await whatsappLinks.count();
    for (let i = 0; i < count; i++) {
      const target = await whatsappLinks.nth(i).getAttribute('target');
      expect(target).toBe('_blank');
    }
  });
});
