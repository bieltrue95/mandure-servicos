---
name: framer-motion-recipes
description: Use quando criar animacoes com Framer Motion no projeto, priorizando recipes reutilizaveis e performance.
---

# Framer Motion Recipes

## Scroll reveal
```typescript
import { FADE_IN_UP, SCROLL_REVEAL_CONFIG } from '@/lib/constants/animations';

<motion.div
  variants={FADE_IN_UP}
  initial={SCROLL_REVEAL_CONFIG.initial}
  whileInView={SCROLL_REVEAL_CONFIG.whileInView}
  viewport={SCROLL_REVEAL_CONFIG.viewport}
/>
```

## Stagger
```typescript
import { STAGGER_CONTAINER, STAGGER_ITEM } from '@/lib/constants/animations';
```

## Card hover
```typescript
<motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} />
```

## Performance
- Priorizar `transform` e `opacity`
- Evitar animar `width`, `height`, `margin`
- Usar `viewport: { once: true }` quando apropriado
- Centralizar variants reutilizaveis em `lib/constants/animations.ts`
