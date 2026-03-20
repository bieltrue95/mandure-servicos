# Prompt: Geração de Componente

Use este template ao pedir ao Claude para criar um novo componente:

```
Crie o componente [NomeComponente] para a landing page Mandure Serviços.

## Especificação
- Seção: [Hero/Portfolio/etc]
- Props: [descrever props]
- Animação: [tipo de animação Framer Motion]
- Responsivo: mobile-first com breakpoints sm/lg

## Padrões obrigatórios
- Server Component por padrão
- Adicionar `'use client'` somente se usar hooks, Framer Motion ou APIs do browser
- Props em arquivo [NomeComponente].types.ts separado
- Barrel export no index.ts
- Usar cn() para classes condicionais
- Usar design tokens (primary-500, slate-800, etc.)
- Variants de animação de lib/constants/animations.ts

## Referências
- Componente similar: [citar componente existente]
- Cores: primary-500 (#b8876d), slate-900 (#0f172a)
```
