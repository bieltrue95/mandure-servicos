# Problemas Comuns

## Build falha: "Module not found"

Verificar:

1. `tsconfig.json` tem `"paths": { "@/*": ["./*"] }`
2. Arquivo existe no caminho correto
3. Barrel export (`index.ts`) inclui o modulo

## Animacoes nao funcionam

Verificar:

1. Componente tem `'use client'` no topo
2. Import de `motion` de `framer-motion` (nao de subpaths)
3. `whileInView` precisa de `viewport` prop

## Imagens nao carregam

Em desenvolvimento:

- Colocar imagens em `public/images/`
- Path comeca com `/` (ex: `/images/hero/foto.jpg`)
- Verificar `next.config.js` se imagem e externa

## TypeScript errors

```bash
npm run type-check
```

Erros comuns:

- `'use client'` faltando em componente com hooks
- Type mismatch: usar o Enum em vez de string literal
- Barrel export nao atualizado

## Prettier nao formata

Verificar:

- Plugin instalado: `prettier-plugin-tailwindcss`
- `prettier` instalado como devDependency
- Arquivo nao esta em `.prettierignore`
