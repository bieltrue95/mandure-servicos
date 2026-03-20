import type { Variants } from 'framer-motion';

// ========== ANIMAÇÕES BASE ==========

export const FADE_IN_UP: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const STAGGER_ITEM: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const SCALE_ON_HOVER = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
};

export const PULSE_INFINITE = {
  animate: {
    scale: [1, 1.1, 1],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: 'loop' as const,
    ease: 'easeInOut',
  },
};

export const SCROLL_REVEAL_CONFIG = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
};

// ========== EFEITOS PARA PORTFOLIO ==========

/**
 * Efeito de "construção" - elementos aparecem como se fossem sendo construídos
 */
export const BUILD_IN_EFFECT: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: 'bottom',
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

/**
 * Efeito parallax para imagens de projetos
 */
export const PARALLAX_IMAGE = {
  initial: { scale: 1.2, y: 0 },
  whileInView: {
    scale: 1,
    y: -20,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  viewport: { once: true, amount: 0.3 },
};

/**
 * Efeito de reveal com máscara (tipo cortina)
 */
export const CURTAIN_REVEAL: Variants = {
  hidden: {
    clipPath: 'inset(0 100% 0 0)',
  },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

/**
 * Hover effect para cards de projeto (efeito arquitetônico)
 */
export const PROJECT_CARD_HOVER = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Stagger para galeria de projetos (efeito cascata diagonal)
 */
export const GALLERY_STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const GALLERY_STAGGER_ITEM: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Número animado (contador) com efeito de "construção"
 */
export const NUMBER_COUNT_UP = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Efeito de "materialização" (tipo concretagem)
 */
export const MATERIALIZE_EFFECT: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Scroll-triggered timeline (processo de construção)
 */
export const TIMELINE_PROGRESS = {
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: {
    duration: 1.5,
    ease: 'easeInOut',
  },
  style: {
    transformOrigin: 'left',
  },
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const IMAGE_SIZES = {
  hero: '100vw',
  projectCard: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  certificationLogo: '(max-width: 768px) 120px, 160px',
  testimonialAvatar: '80px',
} as const;
