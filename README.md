# Mandure Servicos - Landing Page Institucional

Landing page moderna e performática para empreiteira com foco em conversão e
showcase premium de projetos.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=for-the-badge)

[![CI](https://github.com/bieltrue95/mandure-servicos/actions/workflows/ci.yml/badge.svg)](https://github.com/bieltrue95/mandure-servicos/actions/workflows/ci.yml)
[![Playwright Tests](https://github.com/bieltrue95/mandure-servicos/actions/workflows/playwright.yml/badge.svg)](https://github.com/bieltrue95/mandure-servicos/actions/workflows/playwright.yml)

</div>

## Documentacao

| Secao              | Link                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| Instalacao e Setup | [docs/getting-started.md](docs/getting-started.md)                       |
| Arquitetura        | [docs/architecture/overview.md](docs/architecture/overview.md)           |
| Testes             | [docs/development/testing.md](docs/development/testing.md)               |
| Componentes        | [docs/components/component-guide.md](docs/components/component-guide.md) |
| Deploy Docker      | [docs/deployment/docker.md](docs/deployment/docker.md)                   |
| Claude AI          | [claude/claude.md](claude/claude.md)                                     |

## Quick Start

```bash
# Instalar dependencias
npm install

# Desenvolvimento
npm run dev

# Build producao
npm run build

# Docker
docker-compose up
```

Acesse: **http://localhost:3000**

## Design System

**Conceito**: Solidez, Confianca, Modernidade **Inspiracao**: Aco escovado,
concreto arquitetonico, acabamento premium

| Token         | Valor     | Uso                  |
| ------------- | --------- | -------------------- |
| `primary-500` | `#b8876d` | CTAs, acentos Bronze |
| `slate-900`   | `#0f172a` | Fundos escuros       |
| `slate-800`   | `#1e293b` | Textos principais    |
| `slate-50`    | `#f8fafc` | Fundos claros        |

### Animacoes (Framer Motion)

- **Build-In**: Elementos surgem de baixo como construcao
- **Curtain Reveal**: Mascara deslizante nos titulos
- **Stagger Gallery**: Portfolio em cascata diagonal
- **Parallax**: Imagens com profundidade no scroll
- **Counter**: Numeros animados nas estatisticas

## Stack Tecnica

| Tecnologia    | Versao | Uso                          |
| ------------- | ------ | ---------------------------- |
| Next.js       | 15     | Framework React (App Router) |
| TypeScript    | 5.3    | Type safety strict mode      |
| Tailwind CSS  | 3.4    | Estilizacao utility-first    |
| Framer Motion | 11     | Animacoes imersivas          |
| Radix UI      | latest | Componentes acessiveis       |
| Playwright    | 1.40   | Testes E2E                   |
| Docker        | latest | Containerizacao              |

## Estrutura do Projeto

```
/
├── claude/              # Documentacao Claude AI
│   ├── claude.md        # Arquivo de orquestracao
│   ├── agents/          # Code reviewer, architecture, tests
│   ├── skills/          # Next.js, Tailwind, Framer, TypeScript
│   ├── docs/            # Visao geral, decisoes, padroes
│   └── prompts/         # Templates de prompts
│
├── docs/                # Documentacao modular
│   ├── architecture/    # Visao geral e patterns
│   ├── development/     # Setup e padroes de codigo
│   ├── components/      # Guia de componentes
│   ├── deployment/      # Docker e Vercel
│   └── maintenance/     # Manutencao e troubleshooting
│
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout (SEO, JSON-LD, fonts)
│   ├── page.tsx         # Home page (9 secoes)
│   ├── globals.css      # Estilos globais
│   ├── robots.ts        # SEO robots
│   └── sitemap.ts       # Sitemap XML
│
├── components/
│   ├── sections/        # 10 secoes da landing page
│   │   ├── SiteHeader/  # Navbar responsiva com drawer mobile
│   │   ├── Hero/        # Hero com background imersivo
│   │   ├── Stats/       # Contadores animados
│   │   ├── Services/    # Cards de servicos
│   │   ├── Portfolio/   # Galeria filtravel
│   │   ├── Process/     # Timeline de 4 etapas
│   │   ├── Testimonials/# Depoimentos
│   │   ├── Certifications/# Logos de certificacoes
│   │   ├── CTAFinal/    # CTA bronze
│   │   ├── Footer/      # Rodape institucional
│   │   └── WhatsAppButton/# Botao flutuante
│   └── ui/              # Button, Badge, Card, Tabs
│
├── lib/
│   ├── types/           # Interfaces e Enums TypeScript
│   ├── constants/       # Config, routes, animations
│   ├── data/            # Mock data das secoes
│   ├── utils/           # cn, format, validation, image
│   ├── services/        # WhatsAppService, AnalyticsService
│   └── errors/          # AppError, ErrorBoundary
│
├── styles/
│   ├── themes/          # Colors, typography, spacing, shadows
│   └── tokens/          # Breakpoints, transitions, z-index
│
├── tests/
│   ├── e2e/             # Playwright test suites
│   ├── helpers/         # Utilitarios de teste
│   └── fixtures/        # Dados de teste
│
└── public/
    ├── images/          # Imagens do projeto
    └── manifest.json    # PWA manifest
```

## Testes

```bash
npm run test:e2e           # Todos os testes
npm run test:e2e:ui        # Modo interativo
npm run test:e2e:debug     # Debug
npm run test:e2e:codegen   # Gerar novos testes
npm run test:e2e:report    # Ver relatorio HTML
npm run test:e2e:consolidated # Relatório consolidado completo
```

**Relatório Consolidado**: `npm run test:e2e:consolidated`

- Executa todos os testes em todos os navegadores/dispositivos
- Gera relatório detalhado no terminal com estatísticas
- Cria relatórios HTML, JSON e JUnit
- Mostra falhas específicas e cobertura por navegador

**Navegadores/Devices**: Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5),
Mobile Safari (iPhone 12)

**Artifacts**: videos gravados para cada teste, screenshots em falhas e trace no
primeiro retry

**Suites**: home, portfolio-filter, whatsapp-cta, performance, accessibility

## Docker

```bash
# Desenvolvimento
docker-compose up

# Producao
docker-compose up -d app

# Logs
docker-compose logs -f
```

## Performance Targets

| Metrica                | Meta    |
| ---------------------- | ------- |
| Lighthouse Performance | > 90    |
| LCP                    | < 2.5s  |
| CLS                    | < 0.1   |
| Acessibilidade         | WCAG AA |

## Git Flow

```
main (producao)
  └── develop (desenvolvimento)
      ├── feature/hero-animations
      ├── feature/portfolio-gallery
      └── hotfix/mobile-menu
```

**Commits**: [Conventional Commits](https://www.conventionalcommits.org/)

## Para Desenvolvedores

1. Ler [Setup do Ambiente](docs/development/setup.md)
2. Consultar [Padroes de Codigo](docs/development/coding-standards.md)
3. Configurar Prettier no editor
4. Usar [Claude AI](claude/claude.md) para guidance

## Claude AI

Este projeto inclui documentacao completa para desenvolvimento assistido por IA:

- **[Agents](claude/agents/)**: Code Reviewer, Architecture Advisor, Test
  Generator
- **[Skills](claude/skills/)**: Next.js, Tailwind, Framer Motion, TypeScript
- **[Prompts](claude/prompts/)**: Templates para geracao de componentes,
  refactoring, bug fix

## Licenca

MIT (c) 2026 Gabriel Santos - Mandure Servicos

---

<div align="center">
Desenvolvido com dedicacao e café
</div>
