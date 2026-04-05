# Documentacao de Testes

## Estado atual

O repositorio possui suite E2E com Playwright focada em smoke tests.

Escopo inicial:

- carregamento da home e secoes principais
- navegacao por ancora em mobile e desktop
- validacao dos links de WhatsApp
- abertura/fechamento do modal de portfolio no desktop

## Navegadores e estrategia mobile-first

A configuracao do Playwright executa os testes nos projetos:

- `mobile-chromium`
- `mobile-firefox`
- `mobile-webkit`
- `desktop-chromium`
- `desktop-firefox`
- `desktop-webkit`

Os cenarios priorizam mobile, com casos desktop dedicados para fluxos criticos.

## Comandos locais

```bash
npm run test:e2e:install
npm run test:e2e:smoke
npm run test:e2e
```

- `test:e2e:install`: instala browsers locais do Playwright
- `test:e2e:smoke`: roda apenas testes com tag `@smoke`
- `test:e2e`: roda a suite completa

## CI/CD no GitHub Actions

Workflow: `.github/workflows/playwright.yml`

### PR/push no `develop`

- roda automaticamente apenas em mudancas relevantes (app, components, lib,
  tests, config)
- executa somente `@smoke` por padrao
- publica artefatos (`playwright-report/` e `test-results/`)

### Execucao manual

Use `workflow_dispatch` com input `suite`:

- `smoke` para validacao rapida
- `full` para suite completa em todos os projetos

## Como evitar pipeline lenta

Para nao processar "uma eternidade" a cada alteracao:

- smoke por padrao em PR/push
- suite full sob demanda manual
- gatilho por `paths` para nao rodar E2E em alteracao somente de documentacao

## Checklist antes de PR

- `npm run lint`
- `npm run type-check`
- `npm run format:check`
- `npm run build`
- `npm run test:e2e:smoke`
