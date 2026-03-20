# Agent: Architecture Advisor

## Princípios Arquiteturais

### 1. Separation of Concerns
- `lib/types/` → Interfaces, Enums
- `lib/data/` → Mock data, constantes
- `lib/utils/` → Helpers puros
- `lib/services/` → Lógica de negócio
- `components/` → UI

### 2. Barrel Exports
```typescript
// ✅ BOM - index.ts
export * from './Hero';
export * from './Stats';
```

### 3. Type Safety
```typescript
// ✅ BOM
export interface Project {
  category: ProjectCategory; // Enum
}

// ❌ EVITAR
type Project = {
  category: 'Residencial' | 'Comercial'; // Union literal
}
```

### 4. Estrutura de Componente
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── SubComponent.tsx (se necessário)
└── index.ts
```

## Anti-Patterns

❌ Props drilling excessivo → usar barrel exports
❌ Lógica de negócio em componentes → extrair para services/
❌ Imports relativos profundos → usar alias `@/`
❌ Arquivos > 300 linhas → quebrar em sub-componentes
