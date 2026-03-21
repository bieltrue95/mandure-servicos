'use client';

import type { ImageData, Project } from '@/lib/types';

export const PORTFOLIO_PROJECT_QUERY_PARAM = 'projeto';
export const PORTFOLIO_IMAGE_QUERY_PARAM = 'imagem';

export type ProjectGalleryImage = ImageData;

export function getProjectGalleryImages(project: Project): ProjectGalleryImage[] {
  // A capa sempre vira a primeira imagem compartilhável do modal e as demais
  // imagens usam a própria src para permitir compartilhamento direto pela URL.
  const normalizedImages = [project.coverImage, ...(project.images ?? [])];
  const seenSources = new Set<string>();
  const uniqueImages: ImageData[] = [];

  normalizedImages.forEach((image) => {
    if (seenSources.has(image.src)) {
      return;
    }

    seenSources.add(image.src);
    uniqueImages.push(image);
  });

  return uniqueImages.map((image) => ({ ...image }));
}

export function getProjectShareSlug(project: Project): string {
  // O slug deriva do título visível para que a URL fique legível e estável para compartilhamento.
  return project.title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveProjectByShareSlug(
  projects: Project[],
  projectSlug?: string | null
): Project | null {
  if (!projectSlug) {
    return null;
  }

  return projects.find((project) => getProjectShareSlug(project) === projectSlug) ?? null;
}

export function resolveProjectGalleryImageSrc(project: Project, imageSrc?: string | null): string {
  const galleryImages = getProjectGalleryImages(project);
  const matchingImage = galleryImages.find((image) => image.src === imageSrc);

  // Se a imagem informada na URL não existir mais, o modal faz fallback para a primeira imagem válida.
  return matchingImage?.src ?? galleryImages[0]?.src ?? project.coverImage.src;
}
