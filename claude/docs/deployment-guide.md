# Guia de Deploy

## Local (Desenvolvimento)
```bash
npm install
npm run dev
# http://localhost:3000
```

## Docker
```bash
# Build e subir
docker-compose up --build

# Produção
docker-compose up -d app
```

## Vercel
1. Conectar repositório no vercel.com
2. Framework: Next.js (detectado automaticamente)
3. Variáveis de ambiente: não necessárias para versão básica
4. Deploy automático em push para `main`

## Variáveis de Ambiente
```env
# Opcional - Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Opcional - Verificação Google Search Console
NEXT_PUBLIC_GOOGLE_VERIFICATION=xxxxx
```

## Pré-deploy Checklist
- [ ] `npm run type-check` — 0 erros
- [ ] `npm run lint` — 0 warnings críticos
- [ ] `npm run format:check` — formatado
- [ ] `npm run build` — build OK
- [ ] Atualizar número WhatsApp em `lib/constants/config.ts`
- [ ] Atualizar URL do site em `app/layout.tsx` e `app/sitemap.ts`
- [ ] Validar URLs de imagens remotas e `images.remotePatterns` em `next.config.js`
- [ ] Adicionar assets locais em `public/images/` apenas se não usar imagens remotas
