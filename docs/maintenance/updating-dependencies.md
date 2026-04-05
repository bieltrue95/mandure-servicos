# Atualizando Dependencias

## Verificar atualizacoes

```bash
npx npm-check-updates
```

## Atualizar dependencias seguras (patch/minor)

```bash
npm update
npm run type-check
npm run build
```

## Atualizar major versions

Fazer uma de cada vez, verificar changelog:

```bash
# Exemplo: Next.js
npm install next@latest
npm run build
```

## Dependencias criticas

| Pacote          | Risco | Notas                                    |
| --------------- | ----- | ---------------------------------------- |
| `next`          | Alto  | Verificar breaking changes do App Router |
| `framer-motion` | Medio | API relativamente estavel                |
| `tailwindcss`   | Baixo | Raro ter breaking changes                |
| `typescript`    | Baixo | Pode revelar novos erros                 |

## Apos atualizar

```bash
npm run type-check  # TypeScript OK?
npm run lint        # ESLint OK?
npm run build       # Build OK?
npm run format:check # Formatacao OK?
```
