# Arquitetura - Visao Geral

## Stack

- **Next.js 15** (App Router) — Framework React com SSR/SSG
- **TypeScript strict** — Type safety em toda a aplicacao
- **Tailwind CSS** — Utility-first CSS com design tokens
- **Framer Motion** — Animacoes com GPU acceleration
- **Radix UI** — Componentes acessiveis sem estilos

## Principios

1. **Modularidade**: Barrel exports em cada modulo
2. **Type Safety**: Interfaces e Enums para todos os dados
3. **Colocacao**: Tipos junto com componentes que os usam
4. **Separacao**: UI / Logica / Dados em camadas distintas

## Fluxo de Dados

```
lib/data/ (mock data)
  ↓ tipado por
lib/types/ (interfaces + enums)
  ↓ processado por
lib/services/ (WhatsAppService)
  ↓ passado para
app/page.tsx (Server Component)
  ↓ renderiza
components/sections/ (Client Components)
```

## Server vs Client

- `app/layout.tsx` → Server Component (metadata, JSON-LD)
- `app/page.tsx` → Server Component (composicao das secoes)
- `components/sections/*/` → Client Components (`'use client'`, Framer Motion)
- `components/ui/` → Client/Server conforme necessario

## Design System

Camadas de tokens em `styles/`:
```
styles/
├── themes/
│   ├── colors.ts      # Paleta Bronze + Slate + Accent
│   ├── typography.ts  # Fontes e tamanhos
│   ├── spacing.ts     # Section/container spacing
│   └── shadows.ts     # Sombras custom
└── tokens/
    ├── breakpoints.ts # sm/md/lg/xl/2xl
    ├── transitions.ts # Duration + easing curves
    └── z-index.ts     # Layering semantico
```
