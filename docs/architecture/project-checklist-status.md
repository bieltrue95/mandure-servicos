# mandure-servicos — Checklist de Status de Implementação

> Gerado em: 2026-04-05 Branch analisada: `docs/sync-readme-ci-e2e` Metodologia:
> evidência no código/workflow/docs — sem inferência

---

## Resumo Executivo

O projeto está em estado **maduro para produção** nos eixos de produto (UI,
seções, SEO, performance) e **parcialmente maduro** nos eixos de operação
(analytics, monitoramento, deploy multi-ambiente). O pipeline CI/CD é funcional
e os testes E2E cobrem os fluxos críticos da landing page. As lacunas críticas
estão concentradas em: (1) analytics real não integrado, (2) formulário de
contato ausente (dependência exclusiva do WhatsApp), (3) cobertura de testes
unitários zero, e (4) configuração de ambiente de produção não verificada como
separada do ambiente de teste.

---

## 1. Implementado ✅

| #   | Item                           | Evidência                                                                                                                                       | Notas                                                  |
| --- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 01  | Next.js 15 App Router          | `next.config.js`, `app/layout.tsx`, `app/page.tsx`                                                                                              | Server + Client split correto                          |
| 02  | React 18 strict mode           | `next.config.js: reactStrictMode: true`                                                                                                         | Concurrent mode habilitado                             |
| 03  | TypeScript 5.3 strict          | `tsconfig.json: "strict": true`                                                                                                                 | Sem implicit any                                       |
| 04  | Tailwind CSS 3.4 JIT           | `tailwind.config.ts`, `postcss.config.js`                                                                                                       | Purge configurado                                      |
| 05  | Framer Motion 11               | `lib/constants/animations.ts`, todas as seções                                                                                                  | Variantes reutilizáveis                                |
| 06  | Radix UI primitives            | `package.json`, `components/ui/tabs.tsx`, `button.tsx`                                                                                          | Acessibilidade base garantida                          |
| 07  | Design Token System            | `styles/themes/` (colors, typography, shadows), `styles/tokens/` (z-index, breakpoints, transitions)                                            | Single source of truth                                 |
| 08  | Semantic color palette         | `styles/themes/colors.ts` — primary terracota, accent, success, error, whatsapp                                                                 | Refatorado com tokens semânticos                       |
| 09  | Hero section                   | `components/sections/Hero/Hero.tsx`                                                                                                             | Background, CTA, trust badges, scroll indicator        |
| 10  | Stats com AnimatedCounter      | `components/sections/Stats/Stats.tsx`                                                                                                           | Scroll-triggered counter animation                     |
| 11  | Services section               | `components/sections/Services/Services.tsx`                                                                                                     | Grid com ícones e cards                                |
| 12  | Portfolio com filtros          | `components/sections/Portfolio/Portfolio.tsx`, `CategoryFilter.tsx`                                                                             | 5 categorias, AnimatePresence                          |
| 13  | Portfolio Gallery Modal        | `components/sections/Portfolio/ProjectGalleryModal.tsx`                                                                                         | Carousel, drag, keyboard nav, URL state                |
| 14  | URL-based portfolio state      | `Portfolio.tsx` com query params `?project=slug&image=src`, `popstate` sync                                                                     | Deep-linkable, browser history                         |
| 15  | Process/Timeline section       | `components/sections/Process/`                                                                                                                  | 4 passos com ícones e animação                         |
| 16  | Testimonials section           | `components/sections/Testimonials/`                                                                                                             | Grid de depoimentos com stagger                        |
| 17  | Certifications section         | `components/sections/Certifications/`                                                                                                           | Grid de logos responsivo                               |
| 18  | CTAFinal + Footer              | `components/sections/CTAFinal/`, `Footer/`                                                                                                      | Links sociais, contato, copyright                      |
| 19  | SiteHeader (mobile drawer)     | `components/sections/SiteHeader/SiteHeader.tsx`                                                                                                 | Drawer, ESC, scroll spy, scroll lock                   |
| 20  | WhatsApp button flutuante      | `components/sections/WhatsAppButton/`                                                                                                           | `WhatsAppService.generateUrl()`                        |
| 21  | WhatsAppService                | `lib/services/whatsapp.service.ts`                                                                                                              | generateUrl, open, generateBudgetMessage, validação BR |
| 22  | SEO: metadata API completa     | `app/layout.tsx` — title template, description, keywords, authors                                                                               | Next.js Metadata API                                   |
| 23  | SEO: OpenGraph + Twitter       | `app/layout.tsx` — og:type website, og:image, twitter:card summary_large_image                                                                  | 1200×630 configurado                                   |
| 24  | SEO: JSON-LD GeneralContractor | `app/layout.tsx` — schema.org, address, telephone, sameAs                                                                                       | Dados estruturados completos                           |
| 25  | SEO: robots.ts dinâmico        | `app/robots.ts` — allow all, disallow /api/ e /\_next/                                                                                          | Aponta para sitemap.xml                                |
| 26  | SEO: sitemap.ts dinâmico       | `app/sitemap.ts` — homepage, monthly, priority 1                                                                                                | Gerado pelo Next.js                                    |
| 27  | Image optimization             | `next.config.js` — AVIF+WebP, device sizes, minimumCacheTTL                                                                                     | `optimized-image.tsx` c/ SVG blur placeholder          |
| 28  | Code splitting (webpack)       | `next.config.js: cacheGroups` — ui-components, sections, framer-motion                                                                          | Pacotes isolados                                       |
| 29  | Lazy loading seções            | `app/page.tsx: dynamic()` — Portfolio, CTAFinal c/ skeleton loader                                                                              | Reduz JS inicial                                       |
| 30  | CI: lint + type-check + build  | `.github/workflows/ci.yml` — ESLint, tsc --noEmit, prettier --check, next build                                                                 | Bloqueia PRs com erros                                 |
| 31  | E2E Playwright configurado     | `playwright.config.ts` — 6 browsers, trace, screenshot on failure                                                                               | timeout 45s, retries 2 no CI                           |
| 32  | E2E smoke suite (4 specs)      | `tests/e2e/` — home, navigation, portfolio, whatsapp                                                                                            | Multi-browser mobile+desktop                           |
| 33  | CI smart skip docs-only        | `.github/workflows/playwright.yml` — paths-filter `dorny/paths-filter@v3`                                                                       | Evita runs desnecessários                              |
| 34  | Azure Static Web Apps          | `.github/workflows/azure-static-web-apps-test.yml`                                                                                              | Preview por PR, cleanup automático                     |
| 35  | Build estático Azure           | `scripts/build-azure.js`, `NEXT_OUTPUT_MODE=export`                                                                                             | Output para `./out`                                    |
| 36  | Git hooks (Husky)              | `.husky/`, `package.json: lint-staged`                                                                                                          | lint+format no pre-commit                              |
| 37  | Docker support                 | `Dockerfile` (multi-stage), `docker-compose.yml`                                                                                                | Dev e prod targets                                     |
| 38  | ErrorBoundary + AppError       | `lib/errors/ErrorBoundary.tsx`, `lib/errors/AppError.ts`                                                                                        | Captura erros de renderização                          |
| 39  | Anchor scroll fix              | `app/globals.css: scroll-padding-top`                                                                                                           | Header fixo não cobre conteúdo                         |
| 40  | Feature flags                  | `lib/constants/config.ts: FEATURE_FLAGS`                                                                                                        | enableWhatsApp, enableAnalytics, enablePWA             |
| 41  | Sentry integrado               | `instrumentation.ts`, `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, `app/global-error.tsx`, `next.config.js` | Captura erros client/server/edge + tracing básico      |

---

## 2. Parcial 🟡

| #   | Item                  | Gap Identificado                                                                                                                     | Esforço Estimado                                                  | Arquivo base                            |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------- |
| P1  | AnalyticsService      | Placeholder implementado (`lib/services/analytics.service.ts`) mas `enableAnalytics: false`. Sem GA4/GTM ID, sem eventos disparados. | Pequeno (1–2h): adicionar GA4 via `next/script` + env var         | `lib/services/analytics.service.ts`     |
| P2  | useWebVitals hook     | `lib/hooks/useWebVitals.ts` existe mas sem backend receptor. Métricas coletadas localmente sem envio.                                | Médio (3–4h): endpoint ou integração com analytics                | `lib/hooks/useWebVitals.ts`             |
| P3  | OG Image              | `/og-image.jpg` referenciado em `app/layout.tsx` mas arquivo não verificado em `public/`.                                            | Pequeno (1h): criar/verificar imagem 1200×630                     | `app/layout.tsx`, `public/og-image.jpg` |
| P4  | Sitemap parcial       | `app/sitemap.ts` inclui apenas `/`. Portfolio não tem URLs individuais por projeto.                                                  | Médio (2–3h): decidir URL strategy por projeto + expandir sitemap | `app/sitemap.ts`                        |
| P5  | Branch protection     | Workflows de CI existem mas regras de proteção de branch (required checks, reviewers) não verificáveis no repositório local.         | Configuração (30min): GitHub Settings > Branches                  | GitHub repository settings              |
| P6  | performance-check.js  | Script existe em `scripts/` mas implementação mínima, sem thresholds obrigatórios que bloqueiem build.                               | Pequeno (2h): adicionar thresholds + integrar no CI               | `scripts/performance-check.js`          |
| P7  | PWA                   | `FEATURE_FLAGS.enablePWA: true` mas manifest.json e service worker não confirmados em `public/`.                                     | Médio (3–4h): `public/manifest.json`, next-pwa ou similar         | `public/`, `app/layout.tsx`             |
| P8  | Formulário de contato | Toda conversão passa pelo WhatsApp. Não há form de captação de lead alternativo.                                                     | Grande (1–2 dias): form + validação + destino (email ou webhook)  | novo componente                         |

---

## 3. Pendente 🔴

| #   | Item                           | Prioridade | Impacto se ausente                                           | Próximo passo                                                          |
| --- | ------------------------------ | ---------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| R2  | Lighthouse CI                  | **Alta**   | Regressões de performance passam despercebidas               | Adicionar `lhci autorun` no CI após build                              |
| R3  | Testes unitários (Jest/Vitest) | **Alta**   | Lógica de serviços/utils sem cobertura automatizada          | Configurar Vitest + testar WhatsAppService, validators, formatters     |
| R4  | Testes de acessibilidade       | **Alta**   | WCAG compliance não verificado, risco de exclusão digital    | `@axe-core/playwright` nos specs E2E existentes                        |
| R5  | Ambiente prod separado         | **Alta**   | Teste e produção com mesma config, risco de vazamento de env | Azure SWA: criar environment `production` com vars separadas           |
| R6  | Custom domain configurado      | **Alta**   | Deploy em URL da Azure sem domínio personalizado             | Azure Static Web Apps > Custom domains                                 |
| R7  | PR template                    | **Média**  | PRs sem checklist padrão, inconsistência de revisão          | Criar `.github/pull_request_template.md`                               |
| R8  | CODEOWNERS                     | **Média**  | Sem revisores automáticos definidos por área                 | Criar `.github/CODEOWNERS`                                             |
| R9  | CONTRIBUTING.md                | **Média**  | Onboarding sem guia para novos contribuidores                | Criar `CONTRIBUTING.md` com setup, fluxo de branch e commit convention |
| R10 | Structured data por projeto    | **Média**  | Oportunidade SEO perdida para rich results no Google         | JSON-LD `ItemList` ou `CreativeWork` para projetos do portfolio        |
| R11 | Bundle size budget             | **Média**  | Bundle pode crescer sem alertas                              | `next-bundle-analyzer` + CI threshold                                  |
| R12 | Changelog automatizado         | **Baixa**  | Rastreabilidade de versão manual                             | `conventional-changelog` ou `release-please`                           |
| R13 | Semantic versioning            | **Baixa**  | Versão `1.0.0` sem processo de bump                          | Integrar com changelog automatizado                                    |
| R14 | Logs estruturados              | **Baixa**  | Debug em produção dependente de console                      | `pino` ou Winston com nível configurável via env                       |
| R15 | WAF / CDN config               | **Baixa**  | Azure SWA inclui CDN básico, mas sem regras customizadas     | Azure Front Door ou regras de routing no `staticwebapp.config.json`    |

---

## 4. Roadmap Sugerido

### 0–30 dias (Estabilização Operacional)

**Objetivo:** Produção monitorada e segura

- [x] R1: Integrar Sentry (`@sentry/nextjs`) + configurar DSN no Azure
      (concluido em 2026-04-05)
- [ ] R5: Separar env production vs test no Azure SWA
- [ ] R6: Configurar custom domain no Azure SWA
- [ ] P3: Criar/verificar `/og-image.jpg` (1200×630)
- [ ] P5: Ativar branch protection no GitHub (required CI + 1 reviewer)
- [ ] R7: Criar PR template
- [ ] R2: Adicionar Lighthouse CI ao pipeline

### 30–60 dias (Qualidade e Cobertura)

**Objetivo:** Pipeline de qualidade completo

- [ ] R3: Configurar Vitest + cobertura de WhatsAppService, validators,
      formatters
- [ ] R4: Adicionar `@axe-core/playwright` nos specs E2E
- [ ] P1: Ativar GA4 (env var + `next/script` + eventos WhatsApp/portfolio)
- [ ] P6: Completar performance-check.js com thresholds no CI
- [ ] R11: Configurar `@next/bundle-analyzer` + budget
- [ ] P4: Expandir sitemap com seções da landing

### 60–90 dias (Produto e Crescimento)

**Objetivo:** Conversão e escalabilidade

- [ ] P8: Implementar formulário de contato (captação de lead alternativo)
- [ ] P2: Conectar useWebVitals a um endpoint (Sentry Performance ou Analytics)
- [ ] P7: Configurar PWA manifest + install prompt
- [ ] R10: Adicionar JSON-LD por projeto (rich results no Google)
- [ ] R8 + R9: CODEOWNERS + CONTRIBUTING.md
- [ ] R12 + R13: Conventional commits + release automático

---

## Matriz de Risco

| Risco                         | Probabilidade | Impacto | Mitigação                                            |
| ----------------------------- | ------------- | ------- | ---------------------------------------------------- |
| Bug silencioso em produção    | Média         | Alto    | Sentry (R1) integrado; manter DSN/token configurados |
| Regressão de performance      | Média         | Médio   | Lighthouse CI (R2)                                   |
| Perda de lead sem WhatsApp    | Baixa         | Alto    | Formulário de contato (P8)                           |
| Deploy em URL errada          | Baixa         | Alto    | Custom domain + env separado (R5, R6)                |
| PR sem revisão quebrando prod | Média         | Médio   | Branch protection + CODEOWNERS (P5, R8)              |

---

_Diagrama Excalidraw editável:
`docs/architecture/project-complete-status.excalidraw`_
