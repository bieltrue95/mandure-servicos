# Animation System

**File:** `lib/constants/animations.ts`

## Overview

Centralized Framer Motion variants used across all section components. Import from `@/lib/constants` or `@/lib` — never inline motion variants.

## Available Variants

| Export | Usage |
|--------|-------|
| `FADE_IN_UP` | Fade + translate Y from below |
| `FADE_IN` | Simple opacity fade |
| `STAGGER_CONTAINER` | Parent container for staggered children |
| `STAGGER_ITEM` | Child item inside stagger container |
| `SCALE_ON_HOVER` | `whileHover` scale up |
| `PULSE_INFINITE` | Infinite pulse (WhatsApp button ring) |
| `SCROLL_REVEAL_CONFIG` | `viewport` config for scroll-triggered animations |
| `BUILD_IN_EFFECT` | Slow reveal with custom cubic-bezier |
| `PARALLAX_IMAGE` | Subtle scale on scroll |
| `CURTAIN_REVEAL` | Curtain wipe reveal |
| `PROJECT_CARD_HOVER` | Portfolio card lift on hover |
| `GALLERY_STAGGER_CONTAINER` | Portfolio grid stagger parent |
| `GALLERY_STAGGER_ITEM` | Portfolio card stagger child |
| `NUMBER_COUNT_UP` | Stats counter animation trigger |
| `MATERIALIZE_EFFECT` | Material-style entrance |
| `TIMELINE_PROGRESS` | Process timeline connector |

## Custom Easings

```ts
buildIn:  [0.6, 0.05, 0.01, 0.9]   // sharp deceleration
smooth:   [0.25, 0.46, 0.45, 0.94] // natural ease-out
curtain:  [0.76, 0, 0.24, 1]       // dramatic curtain
```

## Usage Pattern

```tsx
'use client';
import { motion } from 'framer-motion';
import { STAGGER_CONTAINER, FADE_IN_UP, SCROLL_REVEAL_CONFIG } from '@/lib/constants';

export function MySection() {
  return (
    <motion.div
      variants={STAGGER_CONTAINER}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_REVEAL_CONFIG.viewport}
    >
      <motion.h2 variants={FADE_IN_UP}>Title</motion.h2>
      <motion.p variants={FADE_IN_UP}>Content</motion.p>
    </motion.div>
  );
}
```

## Animated Counter

`components/sections/Stats/AnimatedCounter.tsx` uses `useMotionValue` + `useTransform` + `useInView` to count from 0 to the target value when the element enters the viewport.

```tsx
<AnimatedCounter value={500} suffix="+" />
```

## Performance Notes

- Always use `viewport: { once: true }` to prevent re-animation on scroll-back
- Use `layout` prop on AnimatePresence children for smooth list mutations (Portfolio)
- The `PULSE_INFINITE` variant uses `repeat: Infinity` — only apply to one element per page
