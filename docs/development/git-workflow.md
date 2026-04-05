# Git Workflow

## Branch Strategy

```
develop       → active/default integration branch
feature/*     → new features
fix/*         → bug fixes
chore/*       → maintenance tasks
hotfix/*      → urgent fixes
```

## Environment Mapping

```
feature/* PR → preview environment on Azure Static Web Apps
develop      → test / homolog environment on Azure Static Web Apps
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
git checkout develop
git pull origin develop
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin develop --tags
```

`develop` is currently the only long-lived active branch. If a dedicated
production branch is introduced in the future (for example `main`), this
document must be updated with the release flow and CI/CD mapping.
