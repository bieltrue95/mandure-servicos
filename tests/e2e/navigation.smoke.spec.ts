import { expect, test } from '@playwright/test';

test.describe('Navegação @smoke', () => {
  test('mobile abre drawer e navega para Serviços', async ({ page }) => {
    const isMobileProject = test.info().project.name.startsWith('mobile');
    test.skip(!isMobileProject, 'Cenário mobile-only.');

    await page.goto('/');

    await page.getByRole('button', { name: /abrir menu de navegação/i }).click();

    const drawer = page.getByRole('dialog', { name: /menu de navegação/i });
    await expect(drawer).toBeVisible();

    await drawer.getByRole('link', { name: 'Serviços' }).click();

    await expect(page).toHaveURL(/#servicos/);
    await expect(page.locator('#servicos')).toBeVisible();
  });

  test('desktop navega para Processo pela barra principal', async ({ page }) => {
    const isMobileProject = test.info().project.name.startsWith('mobile');
    test.skip(isMobileProject, 'Cenário desktop-only.');

    await page.goto('/');

    const desktopNav = page.getByRole('navigation', { name: /navegação principal desktop/i });
    await desktopNav.getByRole('link', { name: 'Processo' }).click();

    await expect(page).toHaveURL(/#processo/);
    await expect(page.locator('#processo')).toBeVisible();
  });
});
