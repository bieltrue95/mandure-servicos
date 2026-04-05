import { expect, test } from '@playwright/test';

test.describe('Portfolio Desktop @smoke', () => {
  test('abre e fecha a galeria de um projeto no desktop', async ({ page }) => {
    const isMobileProject = test.info().project.name.startsWith('mobile');
    test.skip(isMobileProject, 'Cenário desktop-only.');

    await page.goto('/');

    const firstProjectCard = page.getByTestId('project-card').first();
    await expect(firstProjectCard).toBeVisible();
    await firstProjectCard.click();

    const modal = page.getByTestId('project-gallery-modal');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });
});
