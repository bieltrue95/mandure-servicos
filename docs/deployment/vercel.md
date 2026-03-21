# Deploy na Vercel

## Setup inicial

1. Acesse [vercel.com](https://vercel.com)
2. "Add New Project" → Import repositorio GitHub
3. Framework: **Next.js** (detectado automaticamente)
4. Build Command: `npm run build` (padrao)
5. Output Directory: `.next` (padrao)
6. Deploy

## Dominio customizado

Em Project → Settings → Domains → Add Domain

## Variaveis de Ambiente

Em Project → Settings → Environment Variables:

```
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX (opcional)
```

## Preview deployments

Cada PR gera um ambiente de preview automatico.

## Performance

A Vercel otimiza automaticamente:
- Edge Network (CDN global)
- Image Optimization (AVIF/WebP)
- Core Web Vitals monitoring
