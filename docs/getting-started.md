# Getting Started

## Pre-requisitos

- Node.js 20+
- npm 9+
- Git

## Instalacao

```bash
git clone https://github.com/seu-usuario/mandure-servicos.git
cd mandure-servicos
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:3000

## Configuracao obrigatoria antes do deploy

Edite `lib/constants/config.ts`:

```typescript
export const PAGE_CONFIG: PageConfig = {
  companyName: 'Mandure Servicos',        // Nome real
  whatsappNumber: '5511999999999',         // WhatsApp real (somente digitos)
  email: 'contato@mandureservicos.com.br', // E-mail real
  phone: '(11) 9 9999-9999',              // Telefone real
  address: 'Av. Paulista, 1000',          // Endereco real
};
```

## Adicionar imagens reais

Substitua os placeholders em `public/images/`:

```
public/images/
├── hero/construction-hero.jpg    # Foto de obra (1920x1080+)
├── projects/                     # 6 fotos de projetos (800x600)
├── testimonials/                 # Fotos opcionais de clientes
└── certifications/               # Logos (SVG preferivel)
```

## Scripts disponiveis

| Script | Descricao |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de producao |
| `npm run type-check` | Verificar tipos TypeScript |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run test:e2e` | Testes Playwright |
