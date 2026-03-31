/**
 * Sistema de sombras - Mandure Serviços
 * Chaves em kebab-case para uso direto como tokens Tailwind (shadow-card-hover, etc.)
 */

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  card: '0 4px 20px rgba(0, 0, 0, 0.08)',
  'card-hover': '0 8px 40px rgba(0, 0, 0, 0.15)',
  primary: '0 4px 20px rgba(194, 65, 12, 0.3)',
  'primary-hover': '0 8px 40px rgba(194, 65, 12, 0.4)',
  none: 'none',
} as const;

export type Shadows = typeof shadows;
