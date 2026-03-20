/**
 * Sistema de espaçamento - Mandure Serviços
 */

export const spacing = {
  section: {
    sm: '4rem',      // py-16
    md: '6rem',      // py-24
    lg: '8rem',      // py-32
  },
  container: {
    sm: '1.5rem',    // px-6
    md: '2rem',      // px-8
    maxWidth: '80rem', // max-w-7xl
  },
  grid: {
    gapSm: '1rem',   // gap-4
    gapMd: '1.5rem', // gap-6
    gapLg: '2rem',   // gap-8
  },
} as const;

export type Spacing = typeof spacing;
