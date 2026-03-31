# Component Guide

## Architecture

Components follow a two-layer structure:

```text
components/
├── ui/           # Primitive, reusable UI atoms
│   ├── button.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   └── tabs.tsx
└── sections/     # Page sections (feature components)
    ├── SiteHeader/
    ├── Hero/
    ├── Stats/
    ├── Services/
    ├── Portfolio/
    ├── Process/
    ├── Testimonials/
    ├── Certifications/
    ├── CTAFinal/
    ├── Footer/
    └── WhatsAppButton/
```

## Conventions

### Client vs Server Components

- Prefer **Server Components** when possible
- Add `'use client'` when the component uses:
  - React hooks (`useState`, `useEffect`, `useRef`, etc.)
  - Browser APIs
  - Framer Motion animations
  - Interactions that depend on runtime client state

### File Structure per Section

```text
SectionName/
├── SectionName.tsx        # Main component
├── SectionName.types.ts   # TypeScript interfaces/types
├── SubComponent.tsx       # Supporting components
└── index.ts               # Barrel export
```

### Props Pattern

```tsx
// SectionName.types.ts
export interface SectionNameProps {
  data?: SectionData;
  className?: string;
}

// SectionName.tsx
import type { SectionNameProps } from './SectionName.types';

export function SectionName({ data, className }: SectionNameProps) {
  // ...
}
```

## Adding a New Section

1. Create directory: `components/sections/NewSection/`
2. Add `NewSection.types.ts` with props interface
3. Implement `NewSection.tsx`
4. Add `index.ts` barrel export
5. Export from `components/sections/index.ts`
6. Import and render in `app/page.tsx`
7. If the section must appear in the main nav/footer, update `lib/constants/routes.ts` (`NAV_ITEMS`)

## UI Components

All UI primitives use [CVA (Class Variance Authority)](https://cva.style/) for
type-safe variant management and are built on Radix UI primitives where
applicable.

```tsx
import { Button } from '@/components/ui';

<Button variant="whatsapp" size="lg">
  Falar no WhatsApp
</Button>;
```

Available variants: `default`, `outline`, `ghost`, `secondary`, `whatsapp`, `destructive`  
Available sizes: `sm`, `default`, `lg`, `xl`, `icon`

## Section Header Pattern

Section titles and subtitles should follow the shared utilities defined in
`app/globals.css` to keep responsive reading rhythm consistent across the
landing page.

```tsx
<span className="section-eyebrow bg-primary-100 text-primary-700">Categoria</span>
<h2 className="section-title text-balance text-slate-900">Titulo da secao</h2>
<p className="section-subtitle text-balance text-slate-500">Subtitulo da secao</p>
```

For the hero, use the dedicated variants:

```tsx
<h1 className="hero-title text-balance text-white">Headline principal</h1>
<p className="hero-subtitle text-balance text-slate-300">Subheadline principal</p>
```

Rules:

- Use `section-title` and `section-subtitle` in all section headers with `h2`
- Keep color decisions local to each component; sizing and rhythm come from the
  shared utilities
- Add `text-balance` to titles and subtitles when the text spans multiple lines
