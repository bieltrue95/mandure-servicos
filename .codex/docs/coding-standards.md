# Padroes de Codigo

## Nomenclatura
- Componentes: PascalCase
- Hooks: camelCase com `use`
- Interfaces/Types: PascalCase
- Constantes: SCREAMING_SNAKE_CASE
- Utils/Services: camelCase ou PascalCase conforme contexto

## Ordem de imports
1. React/Next.js
2. Bibliotecas externas
3. Componentes internos
4. Lib (`@/lib/...`)
5. Tipos (`@/lib/types`)
6. Relativos locais

## Regras de componente
- `use client` com hooks/Framer Motion/APIs browser
- Props tipadas
- `cn()` para classes condicionais
- `next/image` no lugar de `<img>`

## Qualidade
```bash
npm run format
npm run lint
npm run type-check
```
