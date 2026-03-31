'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
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

  const [direction, setDirection] = useState<1 | -1>(1);
  const dragX = useMotionValue(0);
  const rotateY = useTransform(dragX, [-300, 0, 300], [2, 0, -2]);

  const navigateToImage = useCallback(
    (src: string, dir: 1 | -1) => {
      setDirection(dir);
      onImageChange(src);
    },
    [onImageChange],
  );

  const handlePrevious = useCallback(() => {
    const prev =
      galleryImages[(safeActiveImageIndex - 1 + galleryImages.length) % galleryImages.length];
    navigateToImage(prev.src, -1);
  }, [galleryImages, safeActiveImageIndex, navigateToImage]);

  const handleNext = useCallback(() => {
    const next = galleryImages[(safeActiveImageIndex + 1) % galleryImages.length];
    navigateToImage(next.src, 1);
  }, [galleryImages, safeActiveImageIndex, navigateToImage]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (galleryImages.length <= 1) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [galleryImages, safeActiveImageIndex, onClose, handleNext, handlePrevious]);

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

          {/* Área da imagem com swipe */}
          <div
            className="relative min-h-0 flex-1 overflow-hidden bg-slate-900"
            style={{ perspective: '1200px' }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeImage.src}
                className="absolute inset-0"
                drag={galleryImages.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                style={{ x: dragX, rotateY, touchAction: 'pan-y' }}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ x: dir * 300, opacity: 0 }),
                  center: { x: 0, opacity: 1, rotateY: 0 },
                  exit: (dir: number) => ({ x: dir * -300, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onDragEnd={(_, info) => {
                  const { offset, velocity } = info;

                  // Fechar por swipe down (mobile)
                  if (window.innerWidth < 1024 && velocity.y > 600) {
                    onClose();
                    return;
                  }

                  // Navegação horizontal
                  if (offset.x < -80 || velocity.x < -200) {
                    handleNext();
                  } else if (offset.x > 80 || velocity.x > 200) {
                    handlePrevious();
                  }
                  dragX.set(0);
                }}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 80vw"
                  className="pointer-events-none object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Contador de imagens */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                {safeActiveImageIndex + 1} de {galleryImages.length}
              </div>
            )}
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
