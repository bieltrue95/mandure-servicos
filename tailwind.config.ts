import type { Config } from 'tailwindcss';
import { colors, gradients } from './styles/themes/colors';
import { typography } from './styles/themes/typography';
import { shadows } from './styles/themes/shadows';
import { zIndex as zIndexTokens } from './styles/tokens/z-index';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Cores ────────────────────────────────────────────────────────────
      // Fonte de verdade: styles/themes/colors.ts
      colors: {
        primary: colors.primary,
        slate: colors.slate,
        neutral: colors.neutral,
        accent: colors.accent,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        whatsapp: colors.whatsapp,
      },

      // ── Tipografia ────────────────────────────────────────────────────────
      // Fonte de verdade: styles/themes/typography.ts
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      letterSpacing: typography.letterSpacing,

      // ── Animações ─────────────────────────────────────────────────────────
      // Definidas aqui por serem específicas do Tailwind/Framer Motion
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      // ── Z-index ───────────────────────────────────────────────────────────
      // Fonte de verdade: styles/tokens/z-index.ts
      zIndex: {
        header: String(zIndexTokens.header),
        'drawer-overlay': String(zIndexTokens.drawerOverlay),
        drawer: String(zIndexTokens.drawer),
        'gallery-overlay': String(zIndexTokens.galleryOverlay),
        gallery: String(zIndexTokens.gallery),
      },

      // ── Dimensões ─────────────────────────────────────────────────────────
      maxWidth: {
        'container-xl': '1500px',
        'container-2xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // ── Sombras ───────────────────────────────────────────────────────────
      // Fonte de verdade: styles/themes/shadows.ts
      boxShadow: shadows,

      // ── Gradientes e backgrounds ──────────────────────────────────────────
      // Fonte de verdade: styles/themes/colors.ts (gradients)
      backgroundImage: gradients,
      backgroundSize: {
        'grid-60': '60px 60px',
      },
    },
  },
  plugins: [],
};

export default config;
