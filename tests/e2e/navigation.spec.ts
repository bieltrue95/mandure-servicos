import { test, expect } from '@playwright/test';

test.describe('Navigation Drawer', () => {
  test('deve exibir navegação inline no desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const desktopNav = page
      .locator('nav[aria-label="Navegação principal desktop"]:visible')
      .first();
    const visibleMenuButtons = page.locator('button[aria-label="Abrir menu de navegação"]:visible');

    await expect(desktopNav).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'Projetos' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ligar para Mandure Serviços' })).toBeVisible();
    await expect(visibleMenuButtons).toHaveCount(0);
  });

  test('deve alternar entre white mode e dark mode pelo header', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await page.waitForFunction(
      () =>
        document.documentElement.classList.contains('light') ||
        document.documentElement.classList.contains('dark')
    );

    const html = page.locator('html');
    const toggleThemeButton = page.getByRole('button', { name: 'Ativar modo escuro' });

    await expect(html).toHaveClass(/light/);

    await toggleThemeButton.click({ force: true });

    await expect(html).toHaveClass(/dark/);
    await expect(page.getByRole('button', { name: 'Ativar modo claro' })).toBeVisible();
  });

  test('deve marcar o item clicado como ativo no desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const desktopNav = page
      .locator('nav[aria-label="Navegação principal desktop"]:visible')
      .first();
    const processLink = desktopNav.getByRole('link', { name: 'Processo' });

    await processLink.click({ force: true });

    await expect(page).toHaveURL(/#processo$/);
    await expect(processLink).toHaveAttribute('aria-current', 'location');
  });

  test('deve abrir e fechar o drawer no mobile ao navegar por âncora', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const openMenuButton = page
      .locator('button[aria-label="Abrir menu de navegação"]:visible')
      .first();
    await expect(openMenuButton).toBeVisible();

    await openMenuButton.click({ force: true });

    const drawer = page.locator('[role="dialog"][aria-label="Menu de navegação"]:visible').first();
    await expect(drawer).toBeVisible();

    await drawer.getByRole('link', { name: 'Projetos' }).click();

    await expect(drawer).toBeHidden();
    await expect(page).toHaveURL(/#projetos$/);
  });
});
