# Git Workflow

## Branch Strategy

```
main          → production branch (Azure SWA production deploy)
develop       → active/default integration branch (test/homolog)
feature/*     → new features
fix/*         → bug fixes
chore/*       → maintenance tasks
hotfix/*      → urgent fixes
```

## Environment Mapping

```
feature/* PR → preview environment on Azure Static Web Apps
develop      → test / homolog environment on Azure Static Web Apps
main         → production environment on Azure Static Web Apps
```

Both production and test environments are hosted on Azure Static Web Apps
(Free plan):

- Production URL: `https://www.mandureservicos.com.br`
- Test/Homolog URL: `https://gray-grass-0c073cb1e.2.azurestaticapps.net/`

## Workflow Mapping (GitHub Actions)

- `.github/workflows/ci.yml`
  - `push`/`pull_request` em `develop`
  - jobs obrigatorios: `quality` e `build`
- `.github/workflows/playwright.yml`
  - `push`/`pull_request` em `develop` + `workflow_dispatch`
  - check obrigatorio: `e2e`
- `.github/workflows/azure-static-web-apps-test.yml`
  - `push` em `develop`
  - `pull_request` para `develop` (inclui fechamento de preview quando PR fecha)
  - `workflow_dispatch`
- `.github/workflows/azure-static-web-apps-prod.yml`
  - `push` em `main`
  - `workflow_dispatch`

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add portfolio filter animation
fix: correct WhatsApp URL encoding for special characters
chore: update dependencies
docs: add component usage examples
style: fix button hover state on mobile
refactor: extract WhatsApp URL builder to service
test: add E2E tests for portfolio filtering
```

## Workflow

### New Feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/portfolio-lightbox

# ... make changes, test locally ...

git add -p                          # stage hunks selectively
git commit -m "feat: add portfolio lightbox"
git push origin feature/portfolio-lightbox

# Open PR to develop
```

After the PR is opened against `develop`, GitHub Actions creates or updates the
Azure preview environment for review.

### Bug Fix

```bash
git checkout develop
git pull origin develop
git checkout -b fix/whatsapp-url-encoding

# ... fix bug, add test ...

git commit -m "fix: encode special chars in WhatsApp message"
git push origin fix/whatsapp-url-encoding

# Open PR to develop
```

## Pull Request Checklist

- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build passes (`npm run build`)
- [ ] Formatting check passes (`npm run format:check`)
- [ ] No console.log left in code
- [ ] PR description explains the change and why

## Branch Protection (`develop`)

Current protection rules in GitHub:

- Changes must go through Pull Request (direct push blocked)
- Required status checks: `quality`, `build`, `e2e`
- Required approvals: `0` (single-maintainer mode)
- Stale reviews are dismissed on new commits
- Conversation resolution is required before merge

## Release

```bash
git checkout main
git pull origin main
git merge --no-ff develop
git push origin main
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
```

Current long-lived branches are `develop` (integration/test) and `main`
(production).
