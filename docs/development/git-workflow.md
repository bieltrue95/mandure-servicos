# Git Workflow

## Branch Strategy

```
main          → production-ready code
develop       → integration branch
feature/*     → new features
fix/*         → bug fixes
chore/*       → maintenance tasks
```

## Environment Mapping

```
feature/* PR → preview environment on Azure Static Web Apps
develop      → test / homolog environment on Azure Static Web Apps
main         → reserved for production release
```

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
git checkout main
git checkout -b fix/whatsapp-url-encoding

# ... fix bug, add test ...

git commit -m "fix: encode special chars in WhatsApp message"
git push origin fix/whatsapp-url-encoding

# Open PR to main (hotfix) or develop
```

## Pull Request Checklist

- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Lint passes (`npm run lint`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] No console.log left in code
- [ ] PR description explains the change and why

## Release

```bash
git checkout main
git merge develop --no-ff
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
```

After `develop` is merged into `main`, production can be published by a separate
workflow or Azure app dedicated to production.
