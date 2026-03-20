# Agent: Test Generator

## Template Base
```typescript
import { test, expect } from '@playwright/test';

test.describe('ComponentName', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve renderizar corretamente', async ({ page }) => {
    // assertions
  });

  test('deve responder a interações', async ({ page }) => {
    // interações + assertions
  });
});
```

## Checklist
- [ ] Renderização: elementos visíveis, textos corretos
- [ ] Interação: cliques, filtros, animações
- [ ] Conversão: CTAs com href correto, WhatsApp links
- [ ] Performance: LCP, lazy loading
- [ ] Acessibilidade: alt texts, aria-labels, headings

## Comandos
```bash
npm run test:e2e          # Rodar testes
npm run test:e2e:ui       # Modo interativo
npm run test:e2e:debug    # Debug
npm run test:e2e:codegen  # Gerar novos testes
```

## Exemplo: Portfolio Filter
```typescript
test('deve filtrar projetos por categoria', async ({ page }) => {
  const portfolio = page.locator('section[aria-label*="Portfolio"]');
  await portfolio.scrollIntoViewIfNeeded();

  const initialCount = await page.locator('[data-testid="project-card"]').count();
  await page.getByRole('tab', { name: 'Residencial' }).click();
  await page.waitForTimeout(500);

  const filteredCount = await page.locator('[data-testid="project-card"]').count();
  expect(filteredCount).toBeGreaterThan(0);
  expect(filteredCount).toBeLessThanOrEqual(initialCount);
});
```
