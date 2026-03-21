/**
 * Sistema tipográfico - Mandure Serviços
 */

type FontSizeToken = [fontSize: string, configuration: { lineHeight: string }];

type TypographyTheme = {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, FontSizeToken>;
  fontWeight: Record<string, string>;
  letterSpacing: Record<string, string>;
  lineHeight: Record<string, string>;
};

export const typography = {
  fontFamily: {
    sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  },

  fontSize: {
    xs: ['0.8125rem', { lineHeight: '1.125rem' }],
    sm: ['1rem', { lineHeight: '1.625rem' }],
    base: ['1.125rem', { lineHeight: '1.875rem' }],
    lg: ['1.25rem', { lineHeight: '2rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },

  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} satisfies TypographyTheme;

export type Typography = typeof typography;
