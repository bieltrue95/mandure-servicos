# Claude AI - Mandure Serviços Landing Page

Ponto central de orquestração do Claude AI para o projeto.

## 📋 Visão Geral

**Projeto**: Landing page institucional para empreiteira
**Stack**: Next.js 15 + TypeScript + Tailwind + Framer Motion
**Arquitetura**: Modular, type-safe, production-ready

## 🤖 Agents Disponíveis

### 1. Code Reviewer → `agents/code-reviewer.md`
Revisão de código seguindo os padrões do projeto.

### 2. Architecture Advisor → `agents/architecture-advisor.md`
Decisões arquiteturais, patterns, refatorações.

### 3. Test Generator → `agents/test-generator.md`
Geração de testes E2E com Playwright.

## 🎯 Skills Disponíveis

### 1. Next.js Best Practices → `skills/nextjs-best-practices.md`
### 2. Tailwind Patterns → `skills/tailwind-patterns.md`
### 3. Framer Motion Recipes → `skills/framer-motion-recipes.md`
### 4. TypeScript Patterns → `skills/typescript-patterns.md`

## 📚 Cenários de Uso

### Criar novo componente
1. Consultar: `skills/nextjs-best-practices.md` + `skills/typescript-patterns.md`
2. Usar: `prompts/component-generation.md`
3. Validar: `agents/code-reviewer.md`
4. Gerar testes: `agents/test-generator.md`

### Refatorar código
1. Consultar: `agents/architecture-advisor.md`
2. Usar: `prompts/refactoring-guide.md`
3. Revisar: `agents/code-reviewer.md`

### Fix de bug
1. Usar: `prompts/bug-fix-template.md`
2. Consultar: `docs/troubleshooting.md`
3. Validar: `agents/test-generator.md`

## 🎨 Design System

- **Primary**: Bronze `#b8876d` — CTAs, acentos
- **Slate**: `#1e293b`, `#334155` — Estrutura, textos
- **Accent**: Deep blue `#2563eb` — Profissionalismo
- **Animações**: `lib/constants/animations.ts`

## 📦 Estrutura de Código

- **Barrel Exports**: Todos os módulos usam `index.ts`
- **Separação**: Types → Constants → Utils → Services → Components
- **Aliases**: `@/` configurado em `tsconfig.json`

## ⚙️ Configurações

- **Prettier**: Plugin Tailwind CSS ativo
- **TypeScript**: Strict mode
- **Formatação**: `npm run format`
- **Type-check**: `npm run type-check`
