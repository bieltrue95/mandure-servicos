# Estrutura de Pastas

```text
mandure-servicos/
│
├── .github/workflows/      # GitHub Actions CI/CD
│   ├── ci.yml              # Lint + type-check + format-check + build
│   ├── playwright.yml      # E2E smoke (auto) + full (manual)
│   ├── azure-static-web-apps-test.yml  # Deploy homolog + preview PR
│   └── azure-static-web-apps-prod.yml  # Deploy producao (main)
│
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Home (Client Component)
│   ├── globals.css         # Tailwind + CSS vars
│   ├── robots.ts           # SEO robots
│   └── sitemap.ts          # Sitemap XML
│
├── components/
│   ├── sections/           # Seções da landing page
│   │   ├── SiteHeader/     # Header fixo + drawer responsivo
│   │   ├── Hero/           # .tsx + .types.ts + index.ts
│   │   ├── Stats/          # + AnimatedCounter.tsx
│   │   ├── Services/       # + ServiceCard.tsx
│   │   ├── Portfolio/      # + ProjectCard + CategoryFilter
│   │   ├── Process/        # + ProcessStepCard.tsx
│   │   ├── Testimonials/   # + TestimonialCard.tsx
│   │   ├── Certifications/
│   │   ├── CTAFinal/
│   │   ├── Footer/
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
├── scripts/
│   ├── build-azure.js      # Build para Azure Static Web Apps (export)
│   └── performance-check.js
│
├── playwright-report/      # Artefatos de execucoes anteriores (quando existir)
└── test-results/           # Artefatos de execucoes anteriores (quando existir)
```
