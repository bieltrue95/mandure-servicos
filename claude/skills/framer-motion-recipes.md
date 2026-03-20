# Skill: Framer Motion Recipes

## Scroll Reveal (padrão)
```typescript
import { FADE_IN_UP, SCROLL_REVEAL_CONFIG } from '@/lib/constants/animations';

<motion.div
  variants={FADE_IN_UP}
  initial={SCROLL_REVEAL_CONFIG.initial}
  whileInView={SCROLL_REVEAL_CONFIG.whileInView}
  viewport={SCROLL_REVEAL_CONFIG.viewport}
>
```

## Stagger (listas/grids)
```typescript
import { STAGGER_CONTAINER, STAGGER_ITEM } from '@/lib/constants/animations';

<motion.div variants={STAGGER_CONTAINER} initial="hidden" whileInView="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={STAGGER_ITEM}>
      <Card />
    </motion.div>
  ))}
</motion.div>
```

## Card Hover
```typescript
<motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
```

## AnimatePresence (filtros)
```typescript
<AnimatePresence mode="popLayout">
  <motion.div key={activeFilter} variants={GALLERY_STAGGER_CONTAINER}
    initial="hidden" animate="visible" exit={{ opacity: 0 }}>
    {filteredItems.map(item => <motion.div key={item.id} variants={GALLERY_STAGGER_ITEM} />)}
  </motion.div>
</AnimatePresence>
```

## Performance Tips
- ✅ Usar `transform` e `opacity` (GPU)
- ❌ Evitar `width`, `height`, `margin` (CPU)
- ✅ `viewport: { once: true }` para scroll triggers
- ✅ Variants em `lib/constants/animations.ts`
