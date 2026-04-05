# Sentry no Next.js (App Router)

## Objetivo

Capturar erros de client/server/edge e tracing basico do projeto no Sentry.

## Arquivos de integracao

- `instrumentation.ts`
- `instrumentation-client.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- `app/global-error.tsx`
- `next.config.js` (com `withSentryConfig`)

## Variaveis necessarias

Minimo para funcionar:

- `NEXT_PUBLIC_SENTRY_DSN`

Opcional para server/edge separado:

- `SENTRY_DSN`

Opcional para upload de sourcemap no CI/CD:

- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`

## Como validar rapido

1. Rodar local:

```bash
npm run build
npm run dev
```

2. Disparar um erro manual (temporario) em um componente client e confirmar
   evento no Sentry.

3. Em PR/deploy, garantir que:

- `SENTRY_AUTH_TOKEN` esta configurado (se quiser sourcemaps)
- `NEXT_PUBLIC_SENTRY_DSN` esta injetado no ambiente de build

## Observacoes

- O upload de sourcemaps e automaticamente desativado quando `SENTRY_AUTH_TOKEN`
  nao existe.
- O `global-error.tsx` garante captura de erros de renderizacao no App Router.
