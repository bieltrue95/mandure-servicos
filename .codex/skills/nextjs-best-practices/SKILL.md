---
name: nextjs-best-practices
description: Use quando precisar implementar ou revisar padroes Next.js App Router, Server/Client Components, metadata e otimizacao de imagens.
---

# Next.js Best Practices

## Server vs Client Components

Server por padrao:
```typescript
export default async function Page() {
  return <Section />;
}
```

Client quando houver interatividade:
```typescript
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
```

## Otimizacao de imagens
```typescript
<Image src="/hero.jpg" alt="..." fill priority sizes="100vw" quality={90} />
<Image src="/project.jpg" alt="..." width={800} height={600} loading="lazy" />
```

## Metadata
```typescript
export const metadata: Metadata = {
  title: { default: 'Titulo', template: '%s | Empresa' },
  description: '...',
};
```

## Imports
Preferir alias:
```typescript
import { cn } from '@/lib/utils/cn';
```
