# AGENTS.md

## Projeto
- Nome: Mandure Servicos Landing Page
- Stack: Next.js (App Router), TypeScript strict, Tailwind CSS, Framer Motion, Playwright
- Objetivo: landing institucional com foco em conversao para WhatsApp

## Comandos de desenvolvimento
- Instalar dependencias: `npm install`
- Rodar local: `npm run dev`
- Type-check: `npm run type-check`
- Lint: `npm run lint`
- Formatar: `npm run format`
- Build: `npm run build`
- E2E: `npm run test:e2e`

## Regras de commit
- Nao incluir `Co-Authored-By` em commits
- Mensagens de commit em portugues, curtas e descritivas

## Estrutura e arquitetura
- Separacao de responsabilidades:
  - `lib/types/` para interfaces e enums
  - `lib/data/` para dados e constantes
  - `lib/utils/` para helpers puros
  - `lib/services/` para logica de negocio
  - `components/` para UI
- Usar barrel exports (`index.ts`) nos modulos
- Preferir imports com alias `@/` em vez de relativos profundos
- Evitar arquivos muito grandes (preferir quebrar acima de ~300 linhas)

## Padroes de codigo
- Sem `any` e sem `@ts-ignore` (salvo justificativa forte)
- Props tipadas com interfaces em arquivo separado quando fizer sentido
- `use client` somente quando houver hooks, Framer Motion ou APIs do browser
- Usar `next/image` para imagens e respeitar lazy loading/priority por contexto
- Manter animacoes em `lib/constants/animations.ts` quando reutilizaveis

## Checklist antes de finalizar tarefa
- Rodar `npm run type-check`
- Rodar `npm run lint`
- Rodar `npm run format`
- Rodar `npm run test:e2e` para mudancas com impacto de fluxo/UI

## Agents do projeto
- Architecture Advisor: `.codex/agents/architecture-advisor.agent.md`
- Code Reviewer: `.codex/agents/code-reviewer.agent.md`
- Test Generator: `.codex/agents/test-generator.agent.md`

## Skills do projeto
- `.codex/skills/nextjs-best-practices/SKILL.md`
- `.codex/skills/tailwind-patterns/SKILL.md`
- `.codex/skills/framer-motion-recipes/SKILL.md`
- `.codex/skills/typescript-patterns/SKILL.md`
- `.codex/skills/component-generation/SKILL.md`
- `.codex/skills/refactoring-guide/SKILL.md`
- `.codex/skills/bug-fix/SKILL.md`
- `.codex/skills/troubleshooting/SKILL.md`

## Referencias internas
- Visao do projeto: `.codex/docs/project-overview.md`
- Decisoes arquiteturais: `.codex/docs/architecture-decisions.md`
- Padroes de codigo: `.codex/docs/coding-standards.md`
- Deploy: `.codex/docs/deployment-guide.md`
- Troubleshooting: `.codex/docs/troubleshooting.md`
