# Agent: Code Reviewer

## Responsabilidade
Revisar codigo TypeScript/React conforme padroes do projeto Mandure Servicos.

## Checklist

### TypeScript
- [ ] Strict mode respeitado (sem `any`, sem `@ts-ignore`)
- [ ] Interfaces e enums em locais adequados
- [ ] Barrel exports aplicados quando pertinente

### React/Next.js
- [ ] Componentes funcionais
- [ ] Props tipadas
- [ ] `use client` apenas quando necessario
- [ ] Metadata/SEO quando impactar pagina
- [ ] Uso correto de `next/image`

### Tailwind CSS
- [ ] Classes consistentes com design tokens
- [ ] Responsividade mobile-first
- [ ] Sem CSS inline desnecessario

### Framer Motion
- [ ] Variants reutilizaveis
- [ ] Animacoes focadas em `transform` e `opacity`
- [ ] Scroll triggers com viewport adequado

### Qualidade geral
- [ ] Sem regressao funcional
- [ ] Acessibilidade minima (alt, aria-label, contraste)
- [ ] Performance sem bloat obvio

## Comandos de validacao
```bash
npm run type-check
npm run lint
npm run format
npm run test:e2e
```
