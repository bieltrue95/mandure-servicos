/**
 * Configuração de performance otimizando o carregamento de scripts e stylesheets
 */

export const PRELOAD_FONTS = [
  {
    href: '/fonts/inter-var.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
] as const;

export const PREFETCH_ROUTES = ['#servicos', '#projetos', '#processo', '#depoimentos'] as const;

/**
 * Configuração de lazy loading para componentes não críticos
 */
export const LAZY_LOAD_CONFIG = {
  threshold: 0.1,
  rootMargin: '50px',
} as const;

/**
 * Limiares de performance esperados (em ms)
 */
export const PERFORMANCE_THRESHOLDS = {
  FCP: 1800, // First Contentful Paint
  LCP: 2500, // Largest Contentful Paint
  CLS: 0.1, // Cumulative Layout Shift
  FID: 100, // First Input Delay
  INP: 200, // Interaction to Next Paint
} as const;
