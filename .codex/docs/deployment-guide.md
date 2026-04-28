# Guia de Deploy

## Desenvolvimento local
```bash
npm install
npm run dev
```

## Docker
```bash
docker-compose up --build
docker-compose up -d app
```

## Vercel
1. Conectar repositorio
2. Framework Next.js detectado automaticamente
3. Configurar env vars quando necessario
4. Deploy em push para branch alvo

## Variaveis opcionais
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=xxxxx
```

## Checklist pre-deploy
- [ ] `npm run type-check`
- [ ] `npm run lint`
- [ ] `npm run format:check`
- [ ] `npm run build`
- [ ] Validar links, imagens e configuracoes de SEO
