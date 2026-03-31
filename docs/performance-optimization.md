# Performance Optimization Guide

## Otimizacoes em uso

### 1. Next.js config

Em `next.config.js`:

- `experimental.optimizeCss: true`
- `experimental.optimizePackageImports: ['lucide-react']`
- `compress: true`
- `output: 'standalone'` (ou `export` quando `NEXT_OUTPUT_MODE=export`)
- split de chunks para `ui`, `sections` e `framer-motion`

### 2. Imagens

- formatos modernos: AVIF e WebP
- `next/image` com `sizes` e `priority` quando necessario
- assets locais em `public/images/`

### 3. Carregamento da home

- `app/layout.tsx` com `SiteHeader` em dynamic import com SSR
- `app/page.tsx` com dynamic imports para secoes mais pesadas

## Como validar hoje

### Build e inspeção basica

```bash
npm run build
```

Verifique no output do build:

- tamanhos de bundles por rota
- "First Load JS"
- ausencia de erros de type/lint

### Script auxiliar de performance

```bash
node scripts/performance-check.js
```

## Metas praticas

- LCP < 2.5s
- CLS < 0.1
- INP/FID baixo em dispositivos moveis
- evitar crescimento continuo do bundle inicial

## Checklist rapido por PR

- evitar imports desnecessarios no topo da home
- revisar `sizes`/`priority` de imagens
- manter animacoes em `transform` e `opacity`
- rodar `npm run build` antes de abrir PR
