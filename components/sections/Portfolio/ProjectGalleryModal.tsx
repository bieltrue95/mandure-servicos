'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Maximize2, X } from 'lucide-react';
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
      if (e.key === 'Escape') {
        onClose();
        return;
      }
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

          </div>

          {/* Faixa de informações */}
          <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
            {/* Linha 1: badge + título + contador */}
            <div className="flex items-center justify-between gap-4">
              <Badge variant="default">{project.category}</Badge>
              <h3 className="mx-3 flex-1 truncate text-lg font-bold text-slate-900">
                {project.title}
              </h3>
              {galleryImages.length > 1 && (
                <span className="shrink-0 whitespace-nowrap text-sm text-slate-400">
                  {safeActiveImageIndex + 1} de {galleryImages.length}
                </span>
              )}
            </div>

            {/* Linha 2: metadados */}
            <div className="mt-1 flex flex-wrap items-center gap-x-1 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-primary-500" />
              <span>{project.location}</span>
              <span className="mx-1.5 text-slate-300">·</span>
              <Calendar className="h-3.5 w-3.5 text-primary-500" />
              <span>{project.year}</span>
              {project.area && (
                <>
                  <span className="mx-1.5 text-slate-300">·</span>
                  <Maximize2 className="h-3.5 w-3.5 text-primary-500" />
                  <span>{project.area}</span>
                </>
              )}
            </div>

            {/* Linha 3: thumbnails */}
            {galleryImages.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    aria-label={`Selecionar imagem ${index + 1}`}
                    aria-pressed={safeActiveImageIndex === index}
                    data-testid="gallery-thumbnail"
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                      safeActiveImageIndex === index
                        ? 'border-primary-500 shadow-sm'
                        : 'border-transparent hover:border-slate-300'
                    }`}
                    onClick={() => navigateToImage(image.src, index > safeActiveImageIndex ? 1 : -1)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Linha 4: tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
