# Otimizacao de Performance

## Images

```typescript
// Hero: sempre priority
<Image src="..." fill priority quality={90} />

// Portfolio: lazy loading com sizes correto
<Image src="..." loading="lazy"
  sizes="(max-width: 768px) 100vw, 33vw" />
```

Formatos suportados: AVIF (melhor), WebP, JPG Configurado em `next.config.js`.

## Framer Motion

- Animar `transform` e `opacity` (GPU)
- Nao animar `width`, `height`, `top`, `left` (CPU)
- `viewport: { once: true }` evita re-trigger

## Bundle

```bash
npm run build
# Verificar output: First Load JS shared
# Meta: < 100KB gzipped
```

## Core Web Vitals targets

| Metrica | Meta    | Como melhorar                        |
| ------- | ------- | ------------------------------------ |
| LCP     | < 2.5s  | `priority` no Hero image             |
| CLS     | < 0.1   | Definir `width`/`height` nas imagens |
| FID     | < 100ms | Menos JS bloqueante                  |

## Lighthouse local

```bash
npm run build && npm start
# Abrir Chrome DevTools → Lighthouse
```
