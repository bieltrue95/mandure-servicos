import { Page } from '@playwright/test';

export async function scrollToSection(page: Page, sectionId: string): Promise<void> {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, sectionId);
  await page.waitForTimeout(500);
}

export async function waitForImagesLoaded(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.every((img) => img.complete);
  });
}

export async function checkWhatsAppLink(page: Page, href: string): Promise<boolean> {
  return href.startsWith('https://wa.me/') && href.includes('text=');
}
