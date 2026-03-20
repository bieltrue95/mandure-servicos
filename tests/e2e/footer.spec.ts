import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
  test('deve exibir o rodapé com links institucionais e contato', async ({ page }) => {
    await page.goto('/');

    const footer = page.getByRole('contentinfo', { name: 'Rodapé - Mandure Serviços' });

    await expect(footer).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Voltar ao topo', exact: true })).toBeVisible();
    await expect(footer.getByRole('navigation', { name: 'Links rápidos do rodapé' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Instagram' })).toBeVisible();
    await expect(
      footer.getByRole('link', { name: /contato@mandureservicos\.com\.br/i })
    ).toBeVisible();
  });
});
