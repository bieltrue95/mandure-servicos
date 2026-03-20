# Troubleshooting

## Build Errors

### "Module not found: @/lib/..."
Verificar `tsconfig.json` → `paths: { "@/*": ["./*"] }`

### "Cannot use import statement in module"
Adicionar `'use client'` se o componente usa hooks ou Framer Motion

### "Type error: Property X does not exist"
Verificar se o tipo foi exportado do barrel `lib/types/index.ts`

## Runtime Errors

### Imagens não carregam
- Se a imagem for remota, verificar `images.remotePatterns` em `next.config.js`
- Confirmar que a URL responde `200` e não `404`/`403`
- Para assets locais, conferir se o arquivo existe em `public/`
- O `onError` atual só evita quebra visual no Hero; não existe fallback global para todas as imagens

### Animações não disparam no scroll
- Verificar `viewport: { once: true }` não está impedindo re-trigger
- Checar se componente tem `'use client'`

## Performance

### Lighthouse Performance < 90
1. Verificar `priority` no Hero Image
2. Checar `sizes` nos `<Image>` do portfolio
3. Verificar se Framer Motion não está em Server Components

### Bundle grande
- Verificar se `framer-motion` está sendo importado em Server Components
- Usar dynamic imports para componentes pesados
