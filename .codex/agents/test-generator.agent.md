# Agent: Test Generator

## Responsabilidade
Gerar testes E2E Playwright para fluxos criticos e componentes interativos.

## Template base
```typescript
import { test, expect } from '@playwright/test';

test.describe('ComponentName', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve renderizar corretamente', async ({ page }) => {
    // assertions
  });

  test('deve responder a interacoes', async ({ page }) => {
    // interacoes + assertions
  });
});
```

## Checklist
- [ ] Renderizacao (elementos e textos)
- [ ] Interacao (clique, filtros, estados)
- [ ] Conversao (CTAs e links WhatsApp)
- [ ] Performance basica (lazy loading, LCP)
- [ ] Acessibilidade basica

## Comandos
```bash
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:debug
npm run test:e2e:codegen
```
