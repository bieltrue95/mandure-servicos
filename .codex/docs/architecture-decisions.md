# Decisoes Arquiteturais

## 2026: Estrutura de animacoes
- Decisao: `lib/constants/animations.ts` centraliza variants Framer Motion
- Razao: consistencia visual e menos duplicacao

## 2026: Design tokens em TypeScript
- Decisao: `styles/themes/` e `styles/tokens/` em TypeScript
- Razao: type safety e integracao com Tailwind

## 2026: Barrel exports
- Decisao: modulos com `index.ts` de re-export
- Razao: imports mais limpos e previsiveis

## 2026: Services estaticos
- Decisao: services como `WhatsAppService`, `AnalyticsService` estaticos
- Razao: simplicidade para landing page

## 2026: Componentes por secao
- Decisao: pasta por secao com componente, tipos e index
- Razao: coesao e manutencao
