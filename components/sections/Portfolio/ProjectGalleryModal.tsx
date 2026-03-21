'use client';

import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Maximize2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getProjectGalleryImages, resolveProjectGalleryImageSrc } from './Portfolio.utils';
import type { ProjectGalleryModalProps } from './Portfolio.types';

export function ProjectGalleryModal({
  project,
  activeImageSrc,
  onImageChange,
  onClose,
}: ProjectGalleryModalProps) {
  const galleryImages = useMemo(() => getProjectGalleryImages(project), [project]);
  // A src é a fonte de verdade da imagem ativa para que o estado do modal seja compartilhável.
  const resolvedImageSrc = resolveProjectGalleryImageSrc(project, activeImageSrc);
  const activeImageIndex = galleryImages.findIndex((image) => image.src === resolvedImageSrc);
  const safeActiveImageIndex = activeImageIndex >= 0 ? activeImageIndex : 0;
  const activeImage = galleryImages[safeActiveImageIndex] ?? galleryImages[0];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    // Teclado reutiliza a mesma troca por src para manter a URL e o estado visual sempre alinhados.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (galleryImages.length <= 1) {
        return;
      }

      if (event.key === 'ArrowRight') {
        const nextImage = galleryImages[(safeActiveImageIndex + 1) % galleryImages.length];

        onImageChange(nextImage.src);
      }

      if (event.key === 'ArrowLeft') {
        const previousImage =
          galleryImages[(safeActiveImageIndex - 1 + galleryImages.length) % galleryImages.length];

        onImageChange(previousImage.src);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [galleryImages, onClose, onImageChange, safeActiveImageIndex]);

  const handlePreviousImage = () => {
    const previousImage =
      galleryImages[(safeActiveImageIndex - 1 + galleryImages.length) % galleryImages.length];

    onImageChange(previousImage.src);
  };

  const handleNextImage = () => {
    const nextImage = galleryImages[(safeActiveImageIndex + 1) % galleryImages.length];

    onImageChange(nextImage.src);
  };

  return (
    <>
      <motion.button
        type="button"
        className="fixed inset-0 z-[89] bg-slate-950/70 backdrop-blur-sm"
        aria-label="Fechar galeria do projeto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-0 z-[90] overflow-y-auto sm:px-4 sm:py-4 lg:px-6 lg:py-6 xl:px-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="mx-auto flex min-h-full w-full items-stretch justify-center md:max-w-5xl lg:max-w-6xl lg:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Galeria do projeto ${project.title}`}
            // Mobile e tablet usam fluxo vertical com rolagem natural.
            // Notebook e desktop passam para card centralizado com altura travada e colunas.
            className="relative w-full bg-white shadow-2xl shadow-slate-950/20 sm:rounded-[28px] lg:h-[calc(100dvh-3rem)] lg:max-h-[860px] lg:overflow-hidden"
            data-testid="project-gallery-modal"
          >
            <button
              type="button"
              aria-label="Fechar modal da galeria"
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/95 text-slate-700 shadow-lg transition-colors duration-300 hover:bg-slate-100 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col lg:h-full lg:flex-row">
              <div className="flex flex-col border-b border-slate-200 lg:min-w-0 lg:flex-[1.08] lg:border-b-0 lg:border-r xl:flex-[1.15]">
                <div className="relative h-[clamp(260px,42svh,420px)] bg-slate-100 sm:h-[clamp(320px,48svh,520px)] lg:h-auto lg:min-h-0 lg:flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage.src}
                      className="absolute inset-0"
                      initial={{ opacity: 0.2, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.2, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <Image
                        src={activeImage.src}
                        alt={activeImage.alt}
                        fill
                        priority
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 92vw, (max-width: 1279px) 56vw, 58vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Imagem anterior"
                        className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition-colors duration-300 hover:bg-white sm:left-4 sm:h-11 sm:w-11"
                        data-testid="gallery-prev"
                        onClick={handlePreviousImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Próxima imagem"
                        className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition-colors duration-300 hover:bg-white sm:right-4 sm:h-11 sm:w-11"
                        data-testid="gallery-next"
                        onClick={handleNextImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-white sm:bottom-4 sm:left-4 sm:px-4 sm:py-2 sm:text-sm">
                    Imagem {safeActiveImageIndex + 1} de {galleryImages.length}
                  </div>
                </div>

                {galleryImages.length > 1 && (
                  <div className="shrink-0 border-t border-slate-200 bg-slate-50 p-3 sm:p-4">
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {galleryImages.map((image, index) => (
                        <button
                          key={image.src}
                          type="button"
                          aria-label={`Selecionar imagem ${index + 1} do projeto`}
                          aria-pressed={safeActiveImageIndex === index}
                          data-testid="gallery-thumbnail"
                          className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 sm:h-20 sm:w-32 lg:h-20 lg:w-28 xl:h-24 xl:w-36 ${
                            safeActiveImageIndex === index
                              ? 'border-primary-500 shadow-lg shadow-primary-500/20'
                              : 'border-transparent hover:border-slate-300'
                          }`}
                          onClick={() => onImageChange(image.src)}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 639px) 96px, (max-width: 1023px) 128px, (max-width: 1279px) 112px, 144px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:p-7 xl:p-8">
                <div className="pr-12 sm:pr-14">
                  <Badge variant="default" className="mb-3 sm:mb-4">
                    {project.category}
                  </Badge>
                  <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600 sm:mt-4 sm:text-lg sm:leading-8">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      <MapPin className="h-4 w-4 text-primary-500" />
                      Localização
                    </div>
                    <p className="mt-2 text-base leading-7 text-slate-700">{project.location}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      <Calendar className="h-4 w-4 text-primary-500" />
                      Ano
                    </div>
                    <p className="mt-2 text-base leading-7 text-slate-700">{project.year}</p>
                  </div>

                  {project.area && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        <Maximize2 className="h-4 w-4 text-primary-500" />
                        Área
                      </div>
                      <p className="mt-2 text-base leading-7 text-slate-700">{project.area}</p>
                    </div>
                  )}
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="mt-5 sm:mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Destaques do projeto
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
