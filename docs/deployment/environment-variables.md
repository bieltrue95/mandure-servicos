# Variaveis de Ambiente

## Variaveis disponiveis

| Variavel | Obrigatoria | Descricao |
|----------|-------------|-----------|
| `NEXT_PUBLIC_GA_ID` | Nao | Google Analytics ID (G-XXXXXXXXXX) |

## Configurar

Criar `.env.local` na raiz:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> `.env.local` esta no `.gitignore`. Nunca commite credenciais.

## Em producao

- **Vercel**: Project Settings → Environment Variables
- **Docker**: variavel `environment` no `docker-compose.yml`

## Padrao de nomenclatura

- `NEXT_PUBLIC_*` → Disponivel no browser (bundle do cliente)
- Sem `NEXT_PUBLIC_` → Apenas no servidor (seguro para secrets)
