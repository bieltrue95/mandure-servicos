# Troubleshooting

## Build errors
- `Module not found: @/lib/...`
  - Verificar `paths` em `tsconfig.json`
- `Cannot use import statement in module`
  - Revisar necessidade de `use client`
- `Type error: Property X does not exist`
  - Checar export no `lib/types/index.ts`

## Runtime
- Imagens nao carregam
  - Validar `images.remotePatterns` e URLs
  - Conferir arquivo local em `public/`
- Animacoes nao disparam
  - Revisar `viewport` e client component

## Performance
- Lighthouse baixo
  - `priority` no Hero
  - `sizes` corretos em `next/image`
- Bundle alto
  - Evitar imports pesados desnecessarios
  - Usar dynamic import quando fizer sentido
