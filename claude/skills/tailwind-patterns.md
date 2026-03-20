# Skill: Tailwind Patterns

## Layout Base
```
container-max → mx-auto max-w-7xl
section-padding → px-4 py-16 sm:px-6 lg:px-8 lg:py-24
```

## Cores do Projeto
```
bg-primary-500 → Bronze #b8876d (CTAs)
bg-slate-900   → Dark background
bg-slate-50    → Light background
text-slate-800 → Texto principal
text-slate-500 → Texto secundário
```

## Responsive Pattern (mobile-first)
```
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
text-3xl sm:text-4xl lg:text-5xl
py-16 lg:py-24
```

## Hover States
```
hover:bg-primary-600 active:scale-95
hover:shadow-card-hover hover:-translate-y-2
group-hover:scale-110 group-hover:opacity-100
```

## Gradients
```css
bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-950/90
bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent
```
