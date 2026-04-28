---
name: tailwind-patterns
description: Use quando construir UI com Tailwind no projeto Mandure, garantindo design tokens, responsividade mobile-first e estados de interacao.
---

# Tailwind Patterns

## Layout base
```text
container-max -> mx-auto max-w-7xl
section-padding -> px-4 py-16 sm:px-6 lg:px-8 lg:py-24
```

## Cores
```text
bg-primary-500 -> Bronze #b8876d
bg-slate-900 -> fundo escuro
bg-slate-50 -> fundo claro
text-slate-800 -> texto principal
text-slate-500 -> texto secundario
```

## Responsive mobile-first
```text
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
text-3xl sm:text-4xl lg:text-5xl
py-16 lg:py-24
```

## Hover e interacao
```text
hover:bg-primary-600 active:scale-95
hover:shadow-card-hover hover:-translate-y-2
group-hover:scale-110 group-hover:opacity-100
```
