import { test, expect } from '@playwright/test';

test.describe('Portfolio - Project Gallery Modal', () => {
  const residenceCoverImageSrc = '/images/projects/residencia-alto-lapa/01.svg';
  const residenceGalleryImageSrc = '/images/projects/residencia-alto-lapa/02.svg';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const portfolio = page.locator('section[aria-label*="Portfolio"]');
    await portfolio.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
  });

  test('deve abrir o modal da galeria e navegar entre as imagens do projeto', async ({ page }) => {
    const firstProjectCard = page.locator('[data-testid="project-card"]').first();

    await firstProjectCard.click();

    const modal = page.getByTestId('project-gallery-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Residência Alto da Lapa');
    await expect(page.getByTestId('gallery-thumbnail')).toHaveCount(10);
    await expect(modal).toContainText('Imagem 1 de 10');
    await expect(page).toHaveURL(new RegExp(`projeto=residencia-alto-da-lapa`));
    await expect(page).toHaveURL(
      new RegExp(`imagem=${encodeURIComponent(residenceCoverImageSrc)}`)
    );

    await page.getByTestId('gallery-next').click();
    await expect(modal).toContainText('Imagem 2 de 10');
    await expect(page).toHaveURL(
      new RegExp(`imagem=${encodeURIComponent(residenceGalleryImageSrc)}`)
    );

    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('deve abrir a galeria a partir de uma URL compartilhável', async ({ page }) => {
    await page.goto(
      `/?projeto=residencia-alto-da-lapa&imagem=${encodeURIComponent(residenceGalleryImageSrc)}`
    );

    const modal = page.getByTestId('project-gallery-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Residência Alto da Lapa');
    await expect(modal).toContainText('Imagem 2 de 10');
  });
});
