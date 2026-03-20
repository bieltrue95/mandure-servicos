# Decisões Arquiteturais

## 2026: Estrutura de Animações

**Decisão**: `lib/constants/animations.ts` centraliza todos os Framer Motion
variants **Razão**: Evitar duplicação, consistência visual em toda a landing
page

## 2026: Design Tokens TypeScript

**Decisão**: `styles/themes/` e `styles/tokens/` em TypeScript puro **Razão**:
Type safety, integração com Tailwind via `tailwind.config.ts`

## 2026: Barrel Exports

**Decisão**: Todo módulo tem `index.ts` com re-exports **Razão**: Imports limpos
com `@/lib/types`, `@/components/sections`

## 2026: Services como Classes Estáticas

**Decisão**: `WhatsAppService`, `AnalyticsService` com métodos estáticos
**Razão**: Simplicidade, sem instanciação necessária em landing page

## 2026: Componentes por Seção em Diretórios

**Decisão**: Cada seção tem sua própria pasta com tipos e barrel export
**Razão**: Colocação de código (component + types + index juntos)
