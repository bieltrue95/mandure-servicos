'use client';

import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
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
      {/* Backdrop */}
      <motion.button
        type="button"
        className="fixed inset-0 z-gallery-overlay bg-slate-950/70 backdrop-blur-sm"
        aria-label="Fechar galeria do projeto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-gallery flex items-center justify-center lg:p-6">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria do projeto ${project.title}`}
          data-testid="project-gallery-modal"
          className="
            relative flex flex-col overflow-hidden bg-white
            w-full h-full
            lg:rounded-2xl lg:shadow-2xl lg:shadow-slate-950/30
            lg:h-[calc(100dvh-3rem)] lg:max-h-[860px] lg:max-w-5xl
          "
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        >
          {/* Botão fechar */}
          <button
            type="button"
            aria-label="Fechar modal da galeria"
            className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950/60 text-white backdrop-blur-sm transition-colors hover:bg-slate-950/80"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Área da imagem — ocupa todo espaço acima da faixa */}
          <div className="relative min-h-0 flex-1 bg-slate-900">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 80vw"
              className="object-cover"
            />
          </div>

          {/* Faixa de informações */}
          <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
            <p className="text-slate-900">{project.title}</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
