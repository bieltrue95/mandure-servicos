# Design Patterns

## 1. Barrel Exports por modulo

Cada dominio expoe um `index.ts` para reduzir acoplamento com caminhos internos:

```typescript
// lib/services/index.ts
export * from './whatsapp.service';
export * from './analytics.service';

// uso
import { WhatsAppService } from '@/lib/services';
```

## 2. Colocation de componente + tipos

Cada secao mantém implementacao e contrato no mesmo diretorio:

```text
Hero/
├── Hero.tsx
├── Hero.types.ts
└── index.ts
```

## 3. Service Layer com classes estaticas

Integracoes e utilitarios de dominio ficam em `lib/services/` sem necessidade de
instancia:

```typescript
const whatsappUrl = WhatsAppService.generateUrl();
AnalyticsService.trackEvent('portfolio_filter', { category: 'Residencial' });
```

## 4. Animacoes reutilizaveis centralizadas

Variantes e configs compartilhadas ficam em `lib/constants/animations.ts`.
Animacoes pequenas e locais (ex.: hover pontual) podem ficar inline no
componente.

```typescript
import {
  FADE_IN_UP,
  GALLERY_STAGGER_CONTAINER,
} from '@/lib/constants/animations';
```

## 5. Sincronizacao de estado com URL

No portfolio, o estado do modal e da imagem ativa e sincronizado com query
params:

```text
?projeto=<slug>&imagem=<src-da-imagem>
```

Isso permite compartilhamento de link e restauracao de estado via `popstate`.

## 6. Design tokens como fonte de verdade

Tokens semanticos e primitivos ficam em `styles/themes/*` e `styles/tokens/*`, e
sao injetados no Tailwind em `tailwind.config.ts`.
