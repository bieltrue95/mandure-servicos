'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronUp, MapPin, Ruler, X } from 'lucide-react';
import { getProjectGalleryImages, resolveProjectGalleryImageSrc } from './Portfolio.utils';
import type { ProjectGalleryModalProps } from './Portfolio.types';

// Altura fixa do painel no mobile — suficiente para handle + título + meta + thumbnails
const PANEL_HEIGHT_MOBILE = 168;
const PANEL_HEIGHT_DESKTOP = 180;

const SPRING = { type: 'spring', stiffness: 420, damping: 42 } as const;

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

  // isMobile: calculado imediatamente no cliente para evitar flash
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // panelY: motion value que controla a posição Y do painel no mobile.
  // 0 = visível na base; PANEL_HEIGHT_MOBILE = deslizado para fora da tela.
  const panelY = useMotionValue(0);
  const [isPanelHidden, setIsPanelHidden] = useState(false);

  // Reset quando sai do mobile (ex: resize para desktop)
  useEffect(() => {
    if (!isMobile) {
      panelY.set(0);
      setIsPanelHidden(false);
    }
  }, [isMobile, panelY]);

  const showPanel = useCallback(() => {
    animate(panelY, 0, SPRING);
    setIsPanelHidden(false);
  }, [panelY]);

  const hidePanel = useCallback(() => {
    animate(panelY, PANEL_HEIGHT_MOBILE, SPRING);
    setIsPanelHidden(true);
  }, [panelY]);

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

          {/* Área da imagem
              Mobile: flex-1 ocupa 100% do modal (painel overlay não consome espaço)
              Desktop: flex-1 compartilha altura com o painel in-flow */}
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

            {/* Botão para reexibir o painel — aparece quando oculto (mobile) */}
            <AnimatePresence>
              {isPanelHidden && isMobile && (
                <motion.button
                  type="button"
                  aria-label="Exibir informações do projeto"
                  className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-slate-950/60 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  onClick={showPanel}
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                  Informações
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Faixa de informações
              Mobile : overlay absoluto fixo na base. Gesto pra baixo → oculta.
              Desktop: in-flow abaixo da imagem, sem drag. */}
          <motion.div
            className="
              absolute bottom-0 left-0 right-0 z-10
              overflow-hidden border-t border-slate-200
              bg-white/95 backdrop-blur-md
              lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:z-auto
              lg:shrink-0 lg:bg-white lg:backdrop-blur-none
            "
            style={{
              height: isMobile ? PANEL_HEIGHT_MOBILE : PANEL_HEIGHT_DESKTOP,
              y: isMobile ? panelY : 0,
              touchAction: 'none',
            }}
            drag={isMobile ? 'y' : false}
            dragConstraints={{ top: 0, bottom: PANEL_HEIGHT_MOBILE }}
            dragElastic={{ top: 0, bottom: 0.1 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y > 60 || info.velocity.y > 350) {
                hidePanel();
              } else {
                // Volta para a posição original com spring
                animate(panelY, 0, SPRING);
              }
            }}
          >
            {/* Handle de swipe — visível apenas no mobile */}
            <div className="flex justify-center pb-1 pt-2 lg:hidden">
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            <div className="overflow-hidden px-6 pb-4">
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
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-primary-500" />
                <span>{project.location}</span>
                <span className="mx-1.5 text-slate-300">·</span>
                <Calendar aria-hidden="true" className="h-3.5 w-3.5 text-primary-500" />
                <span>{project.year}</span>
                {project.area && (
                  <>
                    <span className="mx-1.5 text-slate-300">·</span>
                    <Ruler aria-hidden="true" className="h-3.5 w-3.5 text-primary-500" />
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
                      onClick={() =>
                        navigateToImage(image.src, index > safeActiveImageIndex ? 1 : -1)
                      }
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

              {/* Linha 4: tags — visíveis apenas no desktop */}
              {project.tags && project.tags.length > 0 && (
                <div className="mt-2 hidden flex-wrap gap-1.5 lg:flex">
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
        </motion.div>
      </div>
    </>
  );
}
