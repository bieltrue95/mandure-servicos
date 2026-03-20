# Skill: Next.js Best Practices

## Server vs Client Components

**Server (padrão)**:
```typescript
// app/page.tsx - sem 'use client'
export default async function Page() {
  return <Section />;
}
```

**Client (com interatividade)**:
```typescript
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Portfolio() {
  const [category, setCategory] = useState('Todos');
}
```

## Otimização de Imagens
```typescript
// Hero - priority
<Image src="/hero.jpg" alt="..." fill priority sizes="100vw" quality={90} />

// Portfolio - lazy
<Image src="/project.jpg" alt="..." width={800} height={600}
  loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" />
```

## Metadata
```typescript
export const metadata: Metadata = {
  title: { default: 'Título', template: '%s | Empresa' },
  description: '...',
  openGraph: { ... },
};
```

## Path Alias
```typescript
// ✅ BOM
import { cn } from '@/lib/utils/cn';

// ❌ EVITAR
import { cn } from '../../../lib/utils/cn';
```
