/**
 * Transições e durações de animação
 */

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
    slowest: '1000ms',
  },
  timing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
    // Custom easings
    buildIn: 'cubic-bezier(0.6, 0.05, 0.01, 0.9)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    curtain: 'cubic-bezier(0.76, 0, 0.24, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

export type Transitions = typeof transitions;
