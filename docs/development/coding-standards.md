# Padroes de Codigo

## Formatacao

Configurada via Prettier + EditorConfig (automatico no save).

```bash
npm run format        # Formatar tudo
npm run format:check  # Verificar sem alterar
```

## TypeScript

- **Strict mode** obrigatorio
- Sem `any` — usar tipos especificos
- Sem `@ts-ignore` — corrigir o problema
- Interfaces para objetos, Enums para valores fixos

## Componentes React

```typescript
// Estrutura correta
'use client'; // so quando necessario

import { cn } from '@/lib/utils/cn';
import type { ComponentProps } from './Component.types';

export function Component({ prop }: ComponentProps) {
  return <div className={cn('base-class', conditionalClass)} />;
}
```

## Imports (ordem)

1. React/Next.js (`'use client'` primeiro se necessario)
2. Bibliotecas externas (`framer-motion`, `lucide-react`)
3. Componentes internos (`@/components/...`)
4. Lib (`@/lib/...`)
5. Relativos (`./SubComponent`)

## Git Commits

Formato [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona filtro de categoria no portfolio
fix: corrige contador animado no Safari
docs: atualiza README com instrucoes Docker
refactor: extrai logica WhatsApp para service
```
