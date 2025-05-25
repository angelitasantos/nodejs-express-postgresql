# 📚 Git Workflow e Convenções

Este documento descreve as boas práticas para uso de Git neste projeto, incluindo convenções para branches, mensagens de commit e Pull Requests (PRs).

---

## 🌱 Branches

Utilizamos uma estrutura simplificada:
- main – Sempre estável e pronta para produção.
- dev – Integração de funcionalidades em desenvolvimento.
- feature/nome-do-recurso – Para desenvolver uma nova funcionalidade.
- fix/descricao-do-bug – Para corrigir bugs.
- docs/nome-da-doc – Alterações apenas de documentação.
- hotfix/descricao – Correções críticas em produção.

---

## ✏️ Mensagens de Commit

Utilize mensagens claras e no tempo verbal do imperativo (ex: “Corrige bug”, “Adiciona filtro”).

Formato:
- tipo: resumo da alteração

Tipos recomendados:
- feat: nova funcionalidade
- fix: correção de bug
- docs: documentação
- refactor: refatoração de código (sem alteração de funcionalidade)
- style: ajustes visuais ou de formatação (sem lógica)
- test: testes adicionados ou corrigidos
- chore: tarefas diversas (build, configs, etc)

---

## 🌀 Pull Requests (PRs)

Regras:
- Sempre crie PRs da sua branch (feature/*, fix/*, etc) para dev
- Inclua um resumo claro do que foi alterado
- Marque os responsáveis ou revise você mesma antes de mergear
- Após revisão e testes, o PR pode ser aprovado e integrado à dev
