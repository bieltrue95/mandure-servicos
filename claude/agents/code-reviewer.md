# Agent: Code Reviewer

## Responsabilidade
Revisar código TypeScript/React seguindo os padrões do projeto Mandure Serviços.

## Checklist

### ✅ TypeScript
- [ ] Strict mode respeitado (sem `any`, `@ts-ignore`)
- [ ] Interfaces exportadas de `lib/types`
- [ ] Enums usados para valores fixos
- [ ] Barrel exports em `index.ts`

### ✅ React/Next.js
- [ ] Componentes funcionais (sem class components, exceto ErrorBoundary)
- [ ] Props tipadas com interfaces
- [ ] `'use client'` apenas quando necessário
- [ ] Metadata e SEO configurados
- [ ] Imagens via `next/image` com `priority` no Hero e lazy loading nas demais

### ✅ Tailwind CSS
- [ ] Classes ordenadas (Prettier plugin ativo)
- [ ] Design tokens usados (cores, spacing)
- [ ] Responsive mobile-first
- [ ] Sem CSS inline desnecessário

### ✅ Framer Motion
- [ ] Animações performance-friendly (transform, opacity)
- [ ] Variants em `lib/constants/animations.ts`
- [ ] `viewport: { once: true }` em scroll triggers
- [ ] `AnimatePresence` com `key` único

### ✅ Performance
- [ ] Lazy loading onde apropriado
- [ ] Sem bundle bloat
- [ ] Memoization quando necessário

### ✅ Acessibilidade
- [ ] `alt` em todas as imagens
- [ ] `aria-label` em ícones/botões sem texto
- [ ] Contraste WCAG AA (4.5:1)
- [ ] `lang` no HTML

## Comandos
```bash
npm run type-check
npm run lint
npm run format
npm run test:e2e
```
