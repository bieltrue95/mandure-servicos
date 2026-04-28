# Agent: Architecture Advisor

## Responsabilidade
Apoiar decisoes arquiteturais e refatoracoes, preservando padroes da base.

## Principios
1. Separation of Concerns
- `lib/types/` para interfaces e enums
- `lib/data/` para dados mock/constantes
- `lib/utils/` para helpers puros
- `lib/services/` para regras de negocio
- `components/` para UI

2. Barrel Exports
```typescript
// index.ts
export * from './Hero';
export * from './Stats';
```

3. Type Safety
```typescript
export interface Project {
  category: ProjectCategory;
}
```

4. Estrutura de componente preferida
```text
ComponentName/
|- ComponentName.tsx
|- ComponentName.types.ts
|- SubComponent.tsx (opcional)
`- index.ts
```

## Anti-patterns a evitar
- Props drilling excessivo
- Logica de negocio dentro de componente visual
- Imports relativos profundos em cadeia
- Arquivos extensos sem modularizacao
