# Estrutura de Pastas

```
mandure-servicos/
│
├── .github/workflows/      # GitHub Actions CI/CD
│   ├── ci.yml              # Lint + type-check + build
│   └── playwright.yml      # E2E tests
│
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Home (Server Component)
│   ├── globals.css         # Tailwind + CSS vars
│   ├── robots.ts           # SEO robots
│   └── sitemap.ts          # Sitemap XML
│
├── claude/                 # Claude AI documentation
│   ├── claude.md           # Orquestracao central
│   ├── agents/             # Code review, architecture, tests
│   ├── skills/             # Next.js, Tailwind, Framer, TS
│   ├── docs/               # Project overview, decisions
│   └── prompts/            # Prompt templates
│
├── components/
│   ├── sections/           # 9 page sections
│   │   ├── Hero/           # .tsx + .types.ts + index.ts
│   │   ├── Stats/          # + AnimatedCounter.tsx
│   │   ├── Services/       # + ServiceCard.tsx
│   │   ├── Portfolio/      # + ProjectCard + CategoryFilter
│   │   ├── Process/        # + ProcessStepCard.tsx
│   │   ├── Testimonials/   # + TestimonialCard.tsx
│   │   ├── Certifications/
│   │   ├── CTAFinal/
│   │   └── WhatsAppButton/
│   └── ui/                 # Button, Badge, Card, Tabs
│
├── docs/                   # Project documentation
├── lib/
│   ├── constants/          # config, routes, animations
│   ├── data/               # hero, stats, services, projects...
│   ├── errors/             # AppError, ErrorBoundary
│   ├── services/           # WhatsAppService, AnalyticsService
│   ├── types/              # Interfaces e Enums
│   └── utils/              # cn, format, validation, image
│
├── public/
│   ├── images/             # hero/, projects/, certifications/
│   └── manifest.json       # PWA manifest
│
├── styles/
│   ├── themes/             # colors, typography, spacing, shadows
│   └── tokens/             # breakpoints, transitions, z-index
│
└── tests/
    ├── e2e/                # Playwright specs
    ├── fixtures/           # Test data
    └── helpers/            # Utilities
```
