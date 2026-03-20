# Skill: TypeScript Patterns

## Interfaces vs Types
```typescript
// ✅ Interface para objetos
export interface Project {
  id: string;
  category: ProjectCategory;
}

// ✅ Type para unions/utilitários
type ProjectOrNull = Project | null;
```

## Enums para valores fixos
```typescript
// ✅ Enum para categoria
export enum ProjectCategory {
  TODOS = 'Todos',
  RESIDENCIAL = 'Residencial',
}

// ❌ Evitar union literal
type Category = 'Todos' | 'Residencial';
```

## Barrel Exports
```typescript
// lib/types/index.ts
export * from './common.types';
export * from './project.types';

// Uso
import { Project, ProjectCategory } from '@/lib/types';
```

## Type Guards
```typescript
function isProject(value: unknown): value is Project {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

## Const Assertions
```typescript
export const PAGE_CONFIG = {
  whatsappNumber: '5511999999999',
} as const; // tipo literal, não string genérico
```
