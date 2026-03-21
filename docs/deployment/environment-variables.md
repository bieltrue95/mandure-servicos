# Variáveis de Ambiente

## Configurar

Copie `.env.example` para `.env.local` na raiz e preencha os valores:

```bash
cp .env.example .env.local
```

> `.env.local` está no `.gitignore`. Nunca commite credenciais.

---

## Variáveis disponíveis

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_COMPANY_NAME` | Não | Nome da empresa |
| `NEXT_PUBLIC_COMPANY_TAGLINE` | Não | Slogan da empresa |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sim | Número WhatsApp (somente dígitos, ex: 5511999999999) |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | Não | Mensagem padrão do WhatsApp |
| `NEXT_PUBLIC_EMAIL` | Não | E-mail de contato |
| `NEXT_PUBLIC_PHONE` | Não | Telefone formatado |
| `NEXT_PUBLIC_ADDRESS` | Não | Endereço completo |
| `NEXT_PUBLIC_CITY` | Não | Cidade |
| `NEXT_PUBLIC_STATE` | Não | Estado (sigla) |
| `NEXT_PUBLIC_INSTAGRAM` | Não | URL do Instagram |
| `NEXT_PUBLIC_FACEBOOK` | Não | URL do Facebook |
| `NEXT_PUBLIC_SITE_URL` | Sim | URL de produção do site |
| `NEXT_PUBLIC_GA_ID` | Não | Google Analytics ID (G-XXXXXXXXXX) |

---

## Em produção

- **Docker**: adicione as variáveis no `docker-compose.yml` sob `environment:`
- **Vercel**: Project Settings → Environment Variables
- **GitHub Actions**: Settings → Secrets and variables → Actions

## Padrão de nomenclatura

- `NEXT_PUBLIC_*` → disponível no browser (bundle do cliente)
- Sem `NEXT_PUBLIC_` → apenas no servidor (seguro para secrets)
