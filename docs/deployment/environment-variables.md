# Variáveis de Ambiente

## Configurar

Copie `.env.example` para `.env.local` na raiz e preencha os valores:

```bash
cp .env.example .env.local
```

> `.env.local` está no `.gitignore`. Nunca commite credenciais.

---

## Variáveis disponíveis

| Variável                                | Recomendada | Descrição                                                 |
| --------------------------------------- | ----------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_COMPANY_NAME`              | Não         | Nome da empresa                                           |
| `NEXT_PUBLIC_COMPANY_TAGLINE`           | Não         | Slogan da empresa                                         |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`           | Sim         | Número WhatsApp (somente dígitos, ex: 5511999999999)      |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE`          | Não         | Mensagem padrão do WhatsApp                               |
| `NEXT_PUBLIC_EMAIL`                     | Não         | E-mail de contato                                         |
| `NEXT_PUBLIC_PHONE`                     | Não         | Telefone formatado                                        |
| `NEXT_PUBLIC_ADDRESS`                   | Não         | Endereço completo                                         |
| `NEXT_PUBLIC_CITY`                      | Não         | Cidade                                                    |
| `NEXT_PUBLIC_STATE`                     | Não         | Estado (sigla)                                            |
| `NEXT_PUBLIC_INSTAGRAM`                 | Não         | URL do Instagram                                          |
| `NEXT_PUBLIC_FACEBOOK`                  | Não         | URL do Facebook                                           |
| `NEXT_PUBLIC_SITE_URL`                  | Sim         | URL pública do site (usada em metadata/sitemap)           |
| `NEXT_PUBLIC_GA_ID`                     | Não         | Google Analytics ID (G-XXXXXXXXXX)                        |
| `NEXT_PUBLIC_SENTRY_DSN`                | Não         | DSN público do Sentry (monitoramento no client)           |
| `SENTRY_DSN`                            | Não         | DSN privado opcional para server/edge                     |
| `SENTRY_ENVIRONMENT`                    | Sim         | Ambiente lógico no Sentry (`development/test/production`) |
| `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` | Não         | Taxa de tracing no client (`0` a `1`)                     |
| `SENTRY_TRACES_SAMPLE_RATE`             | Não         | Taxa de tracing no server/edge (`0` a `1`)                |
| `SENTRY_ORG`                            | Sim         | Organização Sentry para upload de sourcemaps              |
| `SENTRY_PROJECT`                        | Sim         | Projeto Sentry para upload de sourcemaps                  |
| `SENTRY_AUTH_TOKEN`                     | Sim (CI/CD) | Token secreto para upload de sourcemaps                   |

---

## Em produção

- **Docker**: adicione as variáveis no `docker-compose.yml` sob `environment:`
- **Vercel**: Project Settings → Environment Variables
- **GitHub Actions**: Settings → Secrets and variables → Actions

### Recomendacao para Sentry no GitHub Actions

- **Secrets**:
  - `SENTRY_AUTH_TOKEN`
- **Variables**:
  - `SENTRY_ORG`
  - `SENTRY_PROJECT`
  - `NEXT_PUBLIC_SENTRY_DSN`

## Padrão de nomenclatura

- `NEXT_PUBLIC_*` → disponível no browser (bundle do cliente)
- Sem `NEXT_PUBLIC_` → apenas no servidor (seguro para secrets)
