# Hero Section

**File:** `components/sections/Hero/Hero.tsx`  
**Type:** Client Component (`'use client'`)

## Overview

Full-viewport hero with background image, gradient overlay, animated text, and two CTAs (WhatsApp + scroll indicator).

## Props

```ts
interface HeroProps {
  whatsappUrl: string;
}
```

Conteudo visual e textual principal vem de `lib/data/hero.data.ts`.

## Key Features

- `next/image` with `fill` + `priority` for LCP optimization
- `fetchPriority="high"` on the background image
- Gradient overlay: `from-slate-900/80 via-slate-900/70 to-slate-950/90`
- Framer Motion `STAGGER_CONTAINER` + `STAGGER_ITEM`
- CTA principal de WhatsApp recebe `whatsappUrl` por props
- CTA secundario ancora em `#projetos`
- Indicador de scroll (ArrowDown) aponta para `#stats`

## Animation

Usa animacao inicial em `animate="visible"` para o bloco principal e loop infinito no indicador de scroll.

## Customization

Edite `lib/data/hero.data.ts` para alterar imagem de fundo (`backgroundImage`) e textos.
Imagens do hero ficam em `public/images/hero/`.

## Asset Strategy

- Prioriza asset local para estabilidade visual no first fold
- Mantem compatibilidade com `next/image` e formatos modernos (AVIF/WebP quando aplicavel)
