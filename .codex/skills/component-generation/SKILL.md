---
name: component-generation
description: Use quando for criar um novo componente para a landing page seguindo padroes Mandure de estrutura, tipagem, animacao e responsividade.
---

# Component Generation

Quando criar um componente novo, siga este checklist:

## Especificacao minima
- Secao alvo (Hero, Portfolio, etc.)
- Props necessarias
- Tipo de animacao (se houver)
- Comportamento responsivo mobile-first

## Padroes obrigatorios
- Server Component por padrao
- `use client` apenas com hooks, Framer Motion ou APIs do browser
- Props em arquivo `ComponentName.types.ts` quando fizer sentido
- Barrel export no `index.ts`
- Usar `cn()` para classes condicionais
- Usar design tokens do projeto
- Reaproveitar variants de `lib/constants/animations.ts`

## Validacao final
- `npm run type-check`
- `npm run lint`
