---
name: bug-fix
description: Use quando corrigir bug com diagnostico objetivo, reproducao clara e checklist de validacao tecnica.
---

# Bug Fix

Use o formato abaixo para atacar bugs:

```text
Bug relatado: [descrever o bug]

Contexto
- Arquivo: [arquivo afetado]
- Comportamento esperado: [o que deveria acontecer]
- Comportamento atual: [o que esta acontecendo]
- Reproducao: [passos para reproduzir]
```

## Verificacoes tecnicas
1. Checar tipos em `lib/types/`
2. Validar necessidade de `use client`
3. Confirmar barrel exports
4. Rodar `npm run type-check`

## Apos fix
- [ ] `npm run type-check`
- [ ] `npm run lint`
- [ ] `npm run test:e2e`
