/**
 * Sistema de cores - Mandure Serviços
 *
 * Conceito visual: Solidez, Confiança, Modernidade
 * Inspiração: Aço escovado, Concreto arquitetônico, Detalhes em cobre/bronze
 */

export const colors = {
  // Primary: Bronze/Copper (CTAs, acentos, hover states)
  primary: {
    50: '#fdf8f6',
    100: '#f2e8e5',
    200: '#eaddd7',
    300: '#e0cec7',
    400: '#d2bab0',
    500: '#b8876d',
    600: '#a47764',
    700: '#8b6555',
    800: '#6d4f43',
    900: '#583f36',
    950: '#33251f',
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
 * Gradientes para efeitos premium
 */
export const gradients = {
  heroDark: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  heroOverlay: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.9))',
  bronzeShimmer: 'linear-gradient(135deg, #b8876d 0%, #a47764 50%, #8b6555 100%)',
  slateToBlue: 'linear-gradient(135deg, #334155 0%, #2563eb 100%)',
  cardHover: 'linear-gradient(to top, rgba(184, 135, 109, 0.1), transparent)',
} as const;

export type Colors = typeof colors;
export type Gradients = typeof gradients;
