---
name: typescript-patterns
description: Use quando modelar tipos e contratos TypeScript, mantendo strict mode, enums para valores fixos e barrel exports consistentes.
---

# TypeScript Patterns

## Interfaces vs types
```typescript
export interface Project {
  id: string;
  category: ProjectCategory;
}

type ProjectOrNull = Project | null;
```

## Enums para valores fixos
```typescript
export enum ProjectCategory {
  TODOS = 'Todos',
  RESIDENCIAL = 'Residencial',
}
```

## Barrel exports
```typescript
export * from './common.types';
export * from './project.types';
```

## Type guards
```typescript
function isProject(value: unknown): value is Project {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

## Const assertions
```typescript
export const PAGE_CONFIG = {
  whatsappNumber: '5511999999999',
} as const;
```
