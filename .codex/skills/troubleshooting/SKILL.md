---
name: troubleshooting
description: Use quando houver erro de build, runtime ou performance para aplicar um roteiro rapido de diagnostico no stack Next.js + TypeScript + Tailwind + Framer Motion.
---

# Troubleshooting

## Build errors
- `Module not found: @/lib/...`
  - Verificar `tsconfig.json` e `paths` para `@/*`
- `Cannot use import statement in module`
  - Confirmar `use client` quando houver hooks/Framer Motion
- `Type error: Property X does not exist`
  - Verificar export no barrel `lib/types/index.ts`

## Runtime errors
- Imagem remota nao carrega
  - Checar `images.remotePatterns` em `next.config.js`
  - Confirmar status HTTP da URL
- Animacao nao dispara
  - Revisar config de viewport
  - Verificar se o componente esta como client quando necessario

## Performance
- Lighthouse < 90
  - Verificar `priority` no Hero
  - Revisar `sizes` de `<Image>`
  - Evitar Framer Motion em componente server
- Bundle grande
  - Evitar imports pesados fora de necessidade
  - Usar dynamic import em componentes caros
