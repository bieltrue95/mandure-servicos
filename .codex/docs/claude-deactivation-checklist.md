# Checklist de Desativacao do Legado Claude

Objetivo: encerrar dependencias de Claude Code sem perder contexto util para o time.

## 1) Contexto e instrucoes
- [ ] Confirmar que `AGENTS.md` cobre stack, comandos, padroes e checklist de validacao
- [ ] Confirmar que `AGENT.md` aponta para `AGENTS.md` como fonte de verdade
- [ ] Validar se regras de commit e convencoes estao completas no novo contexto

## 2) Agents e Skills
- [ ] Revisar `.codex/agents/*.agent.md` com o time
- [ ] Revisar `.codex/skills/*/SKILL.md` e ajustar gatilhos de uso
- [ ] Garantir que workflows de bugfix, refactor e geracao de componente estao cobertos

## 3) Legado Claude no repositorio
- [ ] Decidir se `CLAUDE.md` sera removido, arquivado ou mantido temporariamente
- [ ] Confirmar que `claude/` e `.claude/` permanecem fora do versionamento (`.gitignore`)
- [ ] Verificar se ainda existe referencia ativa a caminhos locais `C:\\Users\\...\\.claude\\`

## 4) Fluxo operacional
- [ ] Definir processo de update para `AGENTS.md` e skills (quem atualiza e quando)
- [ ] Incluir revisao de agentes/skills no checklist de PR para mudancas estruturais
- [ ] Registrar no onboarding onde ficam `AGENTS.md` e `.codex/`

## 5) Validacao final
- [ ] Rodar `npm run type-check`
- [ ] Rodar `npm run lint`
- [ ] Rodar `npm run build`
- [ ] (Opcional) Rodar `npm run test:e2e` para alteracoes com impacto de UX/fluxo

## 6) Limpeza opcional apos estabilizacao
- [ ] Remover definitivamente artefatos Claude que nao serao mais usados
- [ ] Atualizar documentacao externa (README/Contributing) para referenciar apenas Codex
- [ ] Registrar data da migracao e responsavel
