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
npm run test:e2e:ui
npm run test:e2e:headed
```

- `test:e2e:install`: instala browsers locais do Playwright
- `test:e2e:smoke`: roda apenas testes com tag `@smoke`
- `test:e2e`: roda a suite completa
- `test:e2e:ui`: abre a UI do Playwright para depuracao
- `test:e2e:headed`: executa com browser visivel

## CI/CD no GitHub Actions

Workflow: `.github/workflows/playwright.yml`

### Gatilhos atuais

- `push` para `develop`
- `pull_request` para `develop`
- `workflow_dispatch` com input `suite` (`smoke` ou `full`)

### Execucao manual

Use `workflow_dispatch` com input `suite`:

- `smoke` para validacao rapida
- `full` para suite completa em todos os projetos

### Comportamento em push/PR para `develop`

- detecta mudancas relevantes para E2E com `dorny/paths-filter@v3`
- inclui, entre outros paths: `app/**`, `components/**`, `lib/**`, `styles/**`,
  `tests/**`, `public/**`, `playwright.config.ts`, `package.json`,
  `next.config.js` e o proprio workflow
- quando nao ha mudanca relevante, o job `e2e` encerra com sucesso sem rodar
  Playwright (docs-only, por exemplo)
- quando ha mudanca relevante, executa a suite `@smoke`
- publica artefatos `playwright-report/` e `test-results/` com retencao de 7
  dias
- timeout do job no CI: 45 minutos

## Parametros atuais do Playwright

Fonte: `playwright.config.ts`.

- `retries`: `2` no CI e `0` local
- `timeout` por teste: `45s`
- `expect.timeout`: `10s`
- `workers`: `2`
- `fullyParallel`: `false`
- `trace`: `retain-on-failure`
- `video`: `retain-on-failure`
- `screenshot`: `only-on-failure`
- `webServer`: `npm run dev -- --port 3000` com timeout de `120s`

## Como evitar pipeline lenta

Para nao processar "uma eternidade" a cada alteracao:

- smoke por padrao em PR/push
- suite full sob demanda manual
- detecao interna de paths para nao rodar E2E completo em alteracao somente de
  documentacao

## Checklist antes de PR

- `npm run lint`
- `npm run type-check`
- `npm run format:check`
- `npm run build`
- `npm run test:e2e:smoke`
