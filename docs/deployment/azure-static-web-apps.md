# Deploy de Teste na Azure Static Web Apps

## Objetivo

Publicar a branch `develop` como ambiente de teste/homologacao na Azure,
mantendo o fluxo GitFlow:

```
feature/* -> pull request para develop -> preview environment
develop   -> ambiente de teste/homologacao
```

## Estrategia adotada

- O projeto continua suportando `output: standalone` para Docker e runtime
  Node.js.
- O deploy da Azure usa um build especifico com `NEXT_OUTPUT_MODE=export`.
- O workflow `.github/workflows/azure-static-web-apps-test.yml`:
  - faz lint e type-check
  - gera `out/` com `npm run build:azure`
  - publica o artefato na Azure Static Web Apps
  - fecha previews automaticamente quando o PR para `develop` e encerrado

## Recursos Azure necessarios

1. Criar um recurso **Azure Static Web Apps** no plano **Free**.
2. Associar o repositório GitHub ou usar apenas o deployment token.
3. Em `Manage deployment token`, copiar o token do ambiente de teste.

## Configuracao no GitHub

Adicionar os seguintes itens no repositorio:

### Secrets

```bash
AZURE_STATIC_WEB_APPS_API_TOKEN_TEST
SENTRY_AUTH_TOKEN            # opcional, para upload de sourcemaps
```

### Variables

```bash
AZURE_TEST_SITE_URL
AZURE_TEST_GA_ID   # opcional
AZURE_TEST_SENTRY_DSN  # opcional
SENTRY_ORG             # opcional (default: gabriel-db)
SENTRY_PROJECT         # opcional (default: javascript-nextjs)
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

### 3. Cadastrar segredo e variavel no GitHub

No repositorio do GitHub:

1. `Settings` -> `Secrets and variables` -> `Actions`
2. Em `Secrets`, criar:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_TEST`
3. Em `Variables`, criar:
   - `AZURE_TEST_SITE_URL`
   - `AZURE_TEST_SENTRY_DSN` (opcional)
   - `SENTRY_ORG` (opcional)
   - `SENTRY_PROJECT` (opcional)

Valor sugerido para `AZURE_TEST_SITE_URL`:

```text
https://<default-hostname-da-static-web-app>
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
- Se `SENTRY_AUTH_TOKEN` estiver configurado, sourcemaps tambem sao enviados
  para o Sentry durante o build

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

- executa lint
- executa type-check
- gera export estatico
- publica a versao de teste na Azure

### Pull request para `develop`

- executa o mesmo build de deploy
- publica um preview environment temporario vinculado ao PR
- fecha o preview quando o PR for encerrado

## Observacoes de SEO e ambiente

- `NEXT_PUBLIC_SITE_URL` e injetada no workflow com base em
  `AZURE_TEST_SITE_URL`.
- `metadata`, `robots.txt` e `sitemap.xml` passam a usar a URL do ambiente
  atual.
- Se no futuro houver ambiente de producao separado, criar um segundo workflow
  para a branch de producao escolhida (por exemplo `main`) e outra Static Web
  App/ambiente dedicado.

## Comandos uteis

```bash
npm run build
npm run build:azure
```

- `npm run build`: build normal para Docker / Node.js
- `npm run build:azure`: export estatico para Azure Static Web Apps
