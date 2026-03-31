# Getting Started

## Pre-requisitos

- Node.js 20+
- npm 9+
- Git

## Instalacao

```bash
git clone https://github.com/bieltrue95/mandure-servicos.git
cd mandure-servicos
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:3000

## Configuracao antes do deploy

Copie `.env.example` para `.env.local` e personalize:

```bash
cp .env.example .env.local
```

Variaveis mais importantes:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_EMAIL`

## Adicionar/atualizar imagens

Assets ficam em `public/images/`:

```text
public/images/
├── hero/                # Hero principal
├── projects/            # Pastas por projeto (ex.: 01.svg ... 10.svg)
├── logo/                # Variacoes da logo
└── certifications/      # Logos e selos
```

## Scripts disponiveis

| Script | Descricao |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de producao |
| `npm run start` | Run local do build standalone |
| `npm run type-check` | Verificar tipos TypeScript |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run build:azure` | Build para Azure Static Web Apps (`out/`) |
