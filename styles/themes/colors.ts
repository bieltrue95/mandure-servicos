/**
 * Sistema de cores - Mandure Serviços
 *
 * Conceito visual: Solidez, Confiança, Modernidade
 * Inspiração: Aço escovado, Concreto arquitetônico, Detalhes em terracota
 */

export const colors = {
  // Primary: Esmeralda (CTAs, acentos, hover states)
  // Centrado em #10b981 — contraste alto para testes visuais em homolog
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },

  // Secondary: Slate (backgrounds, cards, estrutura)
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Neutral: Warm Gray (backgrounds suaves, overlays)
  neutral: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },

  // Accent: Deep Blue (profissionalismo, confiança)
  accent: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Status colors
  success: {
    500: '#10b981',
    600: '#059669',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },

  // WhatsApp (conversão)
  whatsapp: {
    500: '#25D366',
    600: '#128C7E',
  },
} as const;

/**
 * Gradientes e background-images para efeitos premium.
 * Chaves em kebab-case para uso direto como tokens Tailwind (bg-hero-gradient, etc.)
 */
export const gradients = {
  'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  'hero-overlay': 'linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.9))',
  'primary-shimmer': 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
  'slate-to-blue': 'linear-gradient(135deg, #334155 0%, #2563eb 100%)',
  'card-hover-gradient': 'linear-gradient(to top, rgba(16, 185, 129, 0.1), transparent)',
  'hero-grid':
    'linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
  'footer-radial':
    'radial-gradient(circle at top left, rgba(16, 185, 129, 0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 28%)',
} as const;

export type Colors = typeof colors;
export type Gradients = typeof gradients;
