# Arquitetura - Visao Geral

## Stack

- **Next.js 15** (App Router)
- **React 18 + TypeScript strict**
- **Tailwind CSS** com tokens centralizados
- **Framer Motion** para interacoes e transicoes
- **Radix UI** para primitives acessiveis
- **Sentry** para monitoramento de erros e tracing

## Principios

1. **Modularidade**: barrel exports por dominio
2. **Type Safety**: contratos em `lib/types`
3. **Colocacao**: componente e tipos no mesmo modulo
4. **Separacao de camadas**: dados, servicos, apresentacao

## Fluxo de Dados

```text
lib/data/ (conteudo tipado)
  ↓
app/page.tsx (Client Component compositor)
  ↓
components/sections/ (renderizacao)
  ↘
lib/services/ (geracao de URL e tracking opcional)
```

`lib/types` e `lib/constants` suportam todas as camadas com contratos e
configuracoes.

## Server vs Client

- `app/layout.tsx` → **Server Component** (metadata, JSON-LD, fonte, shell
  global)
- `app/page.tsx` → **Client Component** (composicao + dynamic imports)
- `components/sections/SiteHeader` → **Client** (drawer, scroll spy, eventos de
  viewport)
- `components/sections/Footer` → **Server-compatible** (sem hooks/browser API)
- `components/sections/*` (demais secoes) → majoritariamente **Client** por
  animacao/interacao
- `components/ui/*` → misto (ex.: `tabs.tsx` client, `button.tsx`
  server-compatible)

## Design System

Camadas de tokens em `styles/`:

```text
styles/
├── themes/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── shadows.ts
└── tokens/
    ├── breakpoints.ts
    ├── transitions.ts
    └── z-index.ts
```

`tailwind.config.ts` consome esses tokens para manter uma unica fonte de verdade
visual.

## Diagramas Excalidraw

- `docs/architecture/mandure-servicos-complete-diagram.excalidraw` — visao geral
  da arquitetura
- `docs/architecture/project-complete-status.excalidraw` — diagrama com
  checklist de status (implementado / parcial / pendente) — atualizado em
  2026-04-05

## Checklist de Status

Auditoria completa com 55 itens tecnicos, evidencias e roadmap 30/60/90 dias:

- `docs/architecture/project-checklist-status.md`
