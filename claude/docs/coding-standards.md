# Padrões de Código

## Nomenclatura
- Componentes: PascalCase (`Hero`, `ServiceCard`)
- Hooks: camelCase com `use` (`useInView`)
- Types/Interfaces: PascalCase com sufixo Props/State (`HeroProps`)
- Constantes: SCREAMING_SNAKE_CASE (`PAGE_CONFIG`)
- Utils/Services: camelCase (`formatPhone`, `WhatsAppService`)

## Imports (ordem)
1. React/Next.js
2. Bibliotecas externas (framer-motion, lucide-react)
3. Componentes internos (@/components)
4. Lib (@/lib/...)
5. Tipos (@/lib/types)
6. Relativos (./SubComponent)

## Componentes
- Sempre 'use client' quando usa hooks ou Framer Motion
- Props tipadas com interface em arquivo separado
- Sempre usar `cn()` para classes condicionais
- Sempre `next/image` para imagens (nunca `<img>`)

## Formatação
```bash
npm run format     # Prettier automático
npm run lint:fix   # ESLint fix
npm run type-check # TypeScript check
```
