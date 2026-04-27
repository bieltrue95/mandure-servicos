# Deploy na Azure Static Web Apps (Teste e Producao)

## Objetivo

Publicar as branches `develop` (teste/homologacao) e `main` (producao) na
Azure Static Web Apps, mantendo o fluxo GitFlow:

```
feature/* -> pull request para develop -> preview environment
develop   -> ambiente de teste/homologacao
main      -> ambiente de producao
```

Ambientes hospedados atualmente no Azure Static Web Apps (plano Free):

- Producao: `https://www.mandureservicos.com.br`
- Teste/Homologacao: `https://gray-grass-0c073cb1e.2.azurestaticapps.net/`

## Estrategia adotada

- O projeto continua suportando `output: standalone` para Docker e runtime
  Node.js.
- O deploy da Azure usa um build especifico com `NEXT_OUTPUT_MODE=export`.
- O workflow `.github/workflows/azure-static-web-apps-test.yml`:
  - instala dependencias e gera `out/` com `npm run build:azure`
  - publica homologacao para `develop`
  - publica preview por PR em `develop`
  - fecha preview automaticamente quando o PR e encerrado
- O workflow `.github/workflows/azure-static-web-apps-prod.yml`:
  - gera `out/` com `npm run build:azure`
  - publica producao para `main`

## Workflows ativos

- `.github/workflows/ci.yml`
  - quality gate (lint, type-check, format-check) + build
  - executa em push/PR para `develop`
- `.github/workflows/playwright.yml`
  - E2E smoke em push/PR para `develop`
  - suite full manual com `workflow_dispatch`
- `.github/workflows/azure-static-web-apps-test.yml`
  - deploy de homologacao (`develop`) + preview por PR para `develop`
- `.github/workflows/azure-static-web-apps-prod.yml`
  - deploy de producao (`main`)

## Recursos Azure necessarios

1. Criar recursos **Azure Static Web Apps** no plano **Free** para:
   - homologacao (`develop`)
   - producao (`main`)
2. Associar o repositório GitHub ou usar apenas deployment tokens.
3. Em `Manage deployment token`, copiar:
   - token de homologacao
   - token de producao

## Configuracao no GitHub

Adicionar os seguintes itens no repositorio:

### Secrets

```bash
AZURE_STATIC_WEB_APPS_API_TOKEN_TEST
AZURE_STATIC_WEB_APPS_API_TOKEN_PROD
SENTRY_AUTH_TOKEN            # opcional, para upload de sourcemaps
```

### Variables

```bash
AZURE_TEST_SITE_URL
AZURE_TEST_GA_ID   # opcional
AZURE_TEST_SENTRY_DSN  # opcional
AZURE_PROD_SITE_URL
AZURE_PROD_GA_ID   # opcional
AZURE_PROD_SENTRY_DSN  # opcional
SENTRY_ORG             # opcional (default: gabriel-db)
SENTRY_PROJECT         # opcional (default: mandure-servicos)
```

`AZURE_TEST_SITE_URL` deve conter a URL publica da app de teste, por exemplo:

```bash
https://agreeable-coast-012345678.5.azurestaticapps.net
```

## Ativacao recomendada

Inferencia nossa com base no repositorio atual: como ja existe um workflow
customizado em `.github/workflows/azure-static-web-apps-test.yml`, o caminho
mais limpo e criar o recurso na Azure primeiro e depois conectar o token no
GitHub. Isso evita a criacao de um segundo workflow automatico em paralelo.

### 1. Criar o recurso na Azure via PowerShell

```powershell
az login
az account set --subscription "<SUBSCRIPTION_ID_OU_NOME>"

$ResourceGroup = "rg-mandure-test"
$Location = "brazilsouth"
$StaticWebAppName = "mandure-servicos-test"

az group create `
  --name $ResourceGroup `
  --location $Location

az staticwebapp create `
  --name $StaticWebAppName `
  --resource-group $ResourceGroup `
  --location $Location `
  --sku Free
```

### 2. Obter a URL publica e o deployment token

```powershell
$DefaultHostname = az staticwebapp show `
  --name $StaticWebAppName `
  --resource-group $ResourceGroup `
  --query "defaultHostname" `
  -o tsv

$DeploymentToken = az staticwebapp secrets list `
  --name $StaticWebAppName `
  --query "properties.apiKey" `
  -o tsv

$DefaultHostname
$DeploymentToken
```

Repita o mesmo processo para a Static Web App de producao e salve os valores
equivalentes.

### 3. Cadastrar segredo e variavel no GitHub

No repositorio do GitHub:

1. `Settings` -> `Secrets and variables` -> `Actions`
2. Em `Secrets`, criar:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_TEST`
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD`
3. Em `Variables`, criar:
   - `AZURE_TEST_SITE_URL`
   - `AZURE_PROD_SITE_URL`
   - `AZURE_TEST_SENTRY_DSN` (opcional)
   - `AZURE_PROD_SENTRY_DSN` (opcional)
   - `SENTRY_ORG` (opcional)
   - `SENTRY_PROJECT` (opcional)

Valor sugerido para `AZURE_TEST_SITE_URL`:

```text
https://<default-hostname-da-static-web-app>
```

Valor sugerido para `AZURE_PROD_SITE_URL`:

```text
https://www.mandureservicos.com.br
```

### 4. Subir o fluxo GitFlow

```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/<sua-feature>
git push origin develop
```

Com isso:

- `develop` publica a homologacao
- PRs para `develop` geram preview environments temporarios
- `main` publica a producao
- Se `SENTRY_AUTH_TOKEN` estiver configurado, sourcemaps tambem sao enviados
  para o Sentry durante o build

Promocao para producao (quando `develop` estiver aprovado):

```bash
git checkout main
git pull origin main
git merge --no-ff develop
git push origin main
```

### 5. Confirmar o deploy

No GitHub:

1. Abra `Actions`
2. Execute ou acompanhe o workflow `Azure Static Web Apps Test`
3. Ao final, abra a URL de teste

No portal da Azure:

1. Abra a Static Web App
2. Va em `Overview`
3. Confirme o `Default hostname`
4. Va em `Environments` para acompanhar previews de PR

### 6. Se o token expirar ou ficar invalido

No portal da Azure:

1. Static Web App -> `Overview`
2. `Manage deployment token`
3. `Reset token`
4. Atualize o secret `AZURE_STATIC_WEB_APPS_API_TOKEN_TEST` no GitHub

## Como o fluxo funciona

### Push em `develop`

- instala dependencias
- gera export estatico com `npm run build:azure`
- publica a versao de teste na Azure

### Pull request para `develop`

- executa o mesmo build de deploy
- publica um preview environment temporario vinculado ao PR
- fecha o preview quando o PR for encerrado

### Push em `main`

- instala dependencias
- gera export estatico com `npm run build:azure`
- publica a versao de producao na Azure

## Observacoes de SEO e ambiente

- `NEXT_PUBLIC_SITE_URL` e injetada no workflow com base em
  `AZURE_TEST_SITE_URL` (homolog) ou `AZURE_PROD_SITE_URL` (producao).
- `metadata`, `robots.txt` e `sitemap.xml` passam a usar a URL do ambiente
  atual.
- O arquivo `.github/workflows/azure-static-web-apps-witty-beach-0e91aae1e.yml`
  e um workflow legado (gerado automaticamente pela Azure) e pode causar deploy
  duplicado em `main` se permanecer habilitado.

## Comandos uteis

```bash
npm run build
npm run build:azure
```

- `npm run build`: build normal para Docker / Node.js
- `npm run build:azure`: export estatico para Azure Static Web Apps
