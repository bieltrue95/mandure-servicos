# Design Patterns

## 1. Barrel Exports

Cada modulo expoe via `index.ts`:

```typescript
// components/sections/index.ts
export * from './Hero';
export * from './Stats';
// ...

// Uso em page.tsx
import { Hero, Stats } from '@/components/sections';
```

## 2. Component + Types Colocation

```
Hero/
├── Hero.tsx           # Implementacao
├── Hero.types.ts      # Interface HeroProps
└── index.ts           # export * from './Hero'
```

## 3. Static Service Classes

```typescript
// Sem instanciacao necessaria
const url = WhatsAppService.generateUrl({ phone, message });
```

## 4. Framer Motion Variants Centralizados

```typescript
// De lib/constants/animations.ts
import { FADE_IN_UP, STAGGER_CONTAINER } from '@/lib/constants/animations';

// Nao definir inline no componente
const variants = { hidden: {...}, visible: {...} }; // evitar
```

## 5. Design Tokens via Tailwind

```typescript
// tailwind.config.ts importa os tokens
colors: { primary: { 500: '#b8876d' } }

// Componentes usam classes Tailwind
className="bg-primary-500 text-white hover:bg-primary-600"
```
