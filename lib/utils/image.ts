/**
 * Utilitários para otimização de imagens
 */

export function getImagePlaceholder(width: number, height: number): string {
  return `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#e2e8f0"/></svg>`
  )}`;
}

export function generateBlurDataURL(color = '#e2e8f0'): string {
  return `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${color}"/></svg>`
  )}`;
}

export function buildImageSrcSet(basePath: string, sizes: number[]): string {
  return sizes.map((size) => `${basePath}?w=${size} ${size}w`).join(', ');
}
