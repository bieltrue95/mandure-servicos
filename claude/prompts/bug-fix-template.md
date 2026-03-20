# Prompt: Bug Fix

```
Bug relatado: [descrever o bug]

## Contexto
- Arquivo: [arquivo afetado]
- Comportamento esperado: [o que deveria acontecer]
- Comportamento atual: [o que está acontecendo]
- Reprodução: [passos para reproduzir]

## Stack relevante
- Next.js 15 + TypeScript strict
- Framer Motion v11
- Tailwind CSS

## Verificações
1. Checar types em lib/types/
2. Verificar 'use client' se necessário
3. Confirmar que barrel exports estão corretos
4. Rodar: npm run type-check

## Após fix
- [ ] npm run type-check
- [ ] npm run lint
- [ ] npm run test:e2e
```
