# Documentacao de Testes

## Estado atual

No estado atual do repositorio **nao existe suite automatizada de testes**
configurada em `package.json` (ex.: `test:e2e`, `test`, `vitest`, `jest`).

Tambem nao existe pasta `tests/` versionada neste momento.

Pastas como `playwright-report/` e `test-results/` podem aparecer como
artefatos locais de execucoes anteriores, mas nao representam uma suite ativa
no projeto hoje.

## Quality gate atual

A validacao automatica principal acontece via:

- `npm run lint`
- `npm run type-check`
- `npm run format:check`
- `npm run build`

Esses checks tambem sao usados no workflow de CI (`.github/workflows/ci.yml`).

## Estrategia recomendada de QA manual

### 1. Smoke local

```bash
npm run dev
```

Validar manualmente:

- carregamento da home
- navegacao por ancoras no `SiteHeader`
- abertura do modal de portfolio
- links de WhatsApp e contatos no footer

### 2. Validacao de qualidade

```bash
npm run lint
npm run type-check
npm run build
```

### 3. Revisao visual responsiva

Conferir ao menos:

- mobile (`< 768px`)
- tablet (`>= 768px e < 1024px`)
- desktop (`>= 1024px`)

## Checklist antes de PR

- `npm run lint`
- `npm run type-check`
- `npm run format:check`
- `npm run build`
- smoke manual de navegacao, portfolio e CTAs

## Proximo passo sugerido (quando desejado)

Se o time decidir retomar automacao, priorizar:

1. smoke E2E da home
2. fluxo do modal de portfolio
3. validacao dos CTAs de WhatsApp
4. checks basicos de SEO (metadata, sitemap, robots)
