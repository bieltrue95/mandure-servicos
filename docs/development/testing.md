# Documentação de Testes

## Visão geral

O projeto usa **Playwright** para testes end-to-end da landing page. A cobertura
automatizada atual é focada no comportamento visível da aplicação, SEO básico,
acessibilidade estrutural, CTAs e fluxo de filtro do portfólio.

Os testes são executados em múltiplos navegadores e devices:

- Chromium
- Firefox
- WebKit
- Mobile Chrome (`Pixel 5`)
- Mobile Safari (`iPhone 12`)

## Objetivos da suíte

- Validar a home page principal
- Garantir o funcionamento dos CTAs de WhatsApp
- Verificar o filtro de categorias do portfólio
- Cobrir requisitos básicos de acessibilidade
- Validar pontos simples de performance e SEO

## Estrutura de testes

```text
tests/
├── e2e/
│   ├── accessibility.spec.ts
│   ├── home.spec.ts
│   ├── performance.spec.ts
│   ├── portfolio-filter.spec.ts
│   └── whatsapp-cta.spec.ts
├── fixtures/
│   └── test-data.ts
└── helpers/
    └── index.ts
```

### Papel de cada pasta

- `tests/e2e/`: specs Playwright
- `tests/fixtures/`: constantes reutilizáveis de teste
- `tests/helpers/`: helpers para scroll, espera de imagens e validação de links

## Configuração atual do Playwright

Arquivo principal: `playwright.config.ts`

Pontos relevantes da configuração atual:

- `testDir: './tests/e2e'`
- `fullyParallel: true`
- `baseURL: 'http://localhost:3000'`
- `trace: 'on-first-retry'`
- `screenshot: 'only-on-failure'`
- `video: 'on'`
- `webServer.command: 'npm run dev'`
- `webServer.reuseExistingServer: !process.env.CI`

### O que isso significa na prática

- Em ambiente local, o Playwright reaproveita um servidor já em execução quando
  possível
- Em CI, a suíte fica mais conservadora com `retries` e `workers`
- Cada execução de teste gera vídeo
- Screenshots só são gerados em falhas
- Trace é gerado no primeiro retry, o que ajuda no debug sem inflar tanto os
  artifacts

## Suites disponíveis

| Arquivo                    | Cobertura principal                                     |
| -------------------------- | ------------------------------------------------------- |
| `home.spec.ts`             | Carregamento da página, Hero, metadata e JSON-LD        |
| `portfolio-filter.spec.ts` | Filtro de categorias do portfólio                       |
| `whatsapp-cta.spec.ts`     | Links e comportamento dos CTAs de WhatsApp              |
| `performance.spec.ts`      | `alt`, `fetchpriority`, `title`, `viewport`, `manifest` |
| `accessibility.spec.ts`    | `lang`, headings, `aria-labels` e estrutura básica      |

## Como executar

### Rodar toda a suíte

```bash
npm run test:e2e
```

### Rodar tudo simultaneamente em cross-browser e mobile

```bash
npm run test:e2e
```

Ou, de forma equivalente:

```bash
npx playwright test
```

Esse comando executa:

- Todos os arquivos em `tests/e2e/`
- Todos os `projects` configurados no `playwright.config.ts`
- Desktop e mobile na mesma execução

Na configuração atual, isso significa rodar a suíte em:

- Chromium
- Firefox
- WebKit
- Mobile Chrome
- Mobile Safari

Exemplo prático:

- Se um arquivo possui `4` testes e existem `5` projects configurados, a execução total desse arquivo será `20` casos de teste

### Ajustar paralelismo da execução

Para usar mais da máquina atual:

```bash
npx playwright test --workers=100%
```

Para reduzir consumo local de CPU e memória:

```bash
npx playwright test --workers=4
```

### Abrir modo visual interativo

```bash
npm run test:e2e:ui
```

### Rodar com navegador visível

```bash
npm run test:e2e:headed
```

### Rodar em modo debug

```bash
npm run test:e2e:debug
```

### Abrir relatório HTML

```bash
npm run test:e2e:report
```

## Execuções direcionadas

### Rodar um arquivo específico

```bash
npx playwright test tests/e2e/portfolio-filter.spec.ts
```

### Rodar em um navegador específico

```bash
npx playwright test --project=chromium
```

### Rodar um arquivo em um navegador específico

```bash
npx playwright test tests/e2e/portfolio-filter.spec.ts --project=webkit
```

### Rodar apenas mobile

```bash
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

## Artifacts gerados

Durante a execução, o Playwright gera artifacts úteis para análise:

- Vídeo de cada teste em `test-results/**/video.webm`
- Screenshot em falhas
- Trace no primeiro retry
- Relatório HTML em `playwright-report/`

### Quando usar cada artifact

- **Vídeo**: revisar o fluxo real executado
- **Screenshot**: identificar o estado visual no momento da falha
- **Trace**: inspecionar timeline, DOM, rede e ações do teste
- **HTML Report**: visão consolidada da execução

## Fluxo recomendado para desenvolvimento

1. Rodar `npm run test:e2e` ao finalizar uma alteração relevante
2. Se houver falha, abrir `npm run test:e2e:report`
3. Revisar vídeo, screenshot e trace antes de alterar o teste
4. Corrigir o problema no código ou no seletor
5. Reexecutar o arquivo ou projeto afetado

## Como criar um novo teste

### Gerar uma base com Codegen

```bash
npm run test:e2e:codegen
```

O Playwright abre um browser, grava suas ações e gera um esqueleto inicial de
teste. Esse código normalmente precisa de limpeza manual antes de entrar no
repositório.

### Convenções recomendadas

- Nomear arquivos com sufixo `.spec.ts`
- Agrupar cenários relacionados em `test.describe(...)`
- Usar `beforeEach` apenas para setup comum
- Preferir seletores acessíveis como `getByRole`, `getByLabel` e `getByText`
- Usar `data-testid` apenas quando o DOM não oferecer um seletor estável
- Evitar `waitForTimeout` sem necessidade real

## Exemplo de teste

```ts
import { test, expect } from '@playwright/test';

test.describe('Portfolio - Filtro de Categorias', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve filtrar por Residencial', async ({ page }) => {
    await page.getByRole('tab', { name: 'Residencial' }).click();
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(2);
  });
});
```

## Boas práticas para este projeto

- Validar comportamento, não implementação interna
- Escrever asserts objetivos e estáveis
- Evitar dependência excessiva de animações
- Se precisar esperar layout ou scroll, usar helpers em `tests/helpers/index.ts`
- Manter fixtures compartilhadas em `tests/fixtures/test-data.ts`
- Ao alterar conteúdo da home, revisar testes de SEO, acessibilidade e WhatsApp

## Pontos de atenção

### Animações

O projeto usa `Framer Motion`. Em cenários com scroll, filtro e transição
visual, alguns testes podem exigir espera curta ou sincronização melhor com o
DOM renderizado.

### Servidor local

O `webServer` do Playwright sobe a aplicação com `npm run dev`. Se já houver um
servidor disponível na porta `3000`, ele pode ser reaproveitado localmente.

### Volume de artifacts

Como `video: 'on'` está habilitado, execuções grandes geram muitos arquivos em
`test-results/`. Limpe a pasta periodicamente se necessário.

## Checklist antes de abrir PR

- `npm run type-check`
- `npm run build`
- `npm run test:e2e`
- Revisar falhas intermitentes antes de concluir que o teste está correto

## Estado atual da estratégia

Hoje o projeto possui **cobertura E2E**, mas não possui suíte formal de testes
unitários ou de integração. Se a base crescer, o próximo passo natural é
adicionar testes de unidade para utilitários e serviços em `lib/`.
