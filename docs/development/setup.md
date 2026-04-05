# Setup do Ambiente

## Pre-requisitos

- **Node.js** 20+ ([download](https://nodejs.org))
- **npm** 9+
- **Git**

## Clone e Install

```bash
git clone https://github.com/bieltrue95/mandure-servicos.git
cd mandure-servicos
npm install
```

## Configurar Editor (VS Code)

Instalar extensoes recomendadas:

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript + JavaScript

Configurar `settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Variaveis de Ambiente

```bash
cp .env.example .env.local
```

## Verificar Setup

```bash
npm run dev          # Deve abrir em localhost:3000
npm run type-check   # Deve passar sem erros
npm run lint         # Deve passar sem erros criticos
npm run build        # Deve gerar .next sem erros
```
