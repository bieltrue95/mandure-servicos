import { expect, test } from '@playwright/test';
import type { Locator } from '@playwright/test';

const assertWhatsAppLink = async (link: Locator) => {
  await expect(link).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+\?text=.+/);
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
};

test.describe('WhatsApp @smoke', () => {
  test('CTAs principais usam link válido do WhatsApp', async ({ page }) => {
    await page.goto('/');

    const heroCta = page.getByRole('link', { name: /solicitar orçamento grátis/i });
    const footerCta = page.getByRole('link', { name: /solicitar orçamento no whatsapp/i });
    const floatingCta = page
      .locator('div[aria-label=\"Contato via WhatsApp\"]')
      .getByRole('link', { name: /falar pelo whatsapp/i });

    await assertWhatsAppLink(heroCta);
    await assertWhatsAppLink(footerCta);
    await assertWhatsAppLink(floatingCta);
  });
});
