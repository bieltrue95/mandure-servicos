---
name: refactoring-guide
description: Use quando refatorar componentes/arquivos sem mudar comportamento funcional, aplicando separacao de responsabilidades e padroes da base.
---

# Refactoring Guide

## Objetivos comuns
- Mover logica de negocio para `lib/services/`
- Extrair tipos para `lib/types/`
- Usar barrel exports
- Otimizar animacoes Framer Motion
- Garantir TypeScript strict

## Nao alterar
- Comportamento visual/funcional existente
- Estrutura de dados de `lib/data/` sem necessidade
- Design tokens

## Verificacao
```bash
npm run type-check && npm run lint
```
