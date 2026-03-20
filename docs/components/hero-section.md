# Hero Section

**File:** `components/sections/Hero/Hero.tsx`  
**Type:** Client Component (`'use client'`)

## Overview

Full-viewport hero with background image, gradient overlay, animated text, and two CTAs (WhatsApp + scroll indicator).

## Props

```ts
interface HeroProps {
  headline: string;
  subheadline: string;
  badge?: string;
  ctaText: string;
  ctaWhatsAppUrl: string;
  backgroundImage: string;
}
```

Data is sourced from `lib/data/hero.data.ts`.

## Key Features

- `next/image` with `fill` + `priority` for LCP optimization
- `fetchpriority="high"` on the background image
- Gradient overlay: `from-slate-900/95 via-slate-900/80 to-transparent`
- Framer Motion `STAGGER_CONTAINER` + `FADE_IN_UP` for headline animation
- Bouncing scroll indicator (ArrowDown icon) anchors to `#servicos`
- Trust badge with shield icon and tagline text

## Animation

Uses `STAGGER_CONTAINER` variant with `viewport: { once: true }` so animations fire once on scroll-in.

## Customization

Edit `lib/data/hero.data.ts` to change headline, badge text, and background image path.  
Background image should be placed at `public/images/hero/` and referenced as `/images/hero/filename.jpg`.
