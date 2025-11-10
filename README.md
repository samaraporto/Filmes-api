# API REST de Filmes

Uma **API REST simples** para gerenciar um catálogo de filmes, criada como atividade acadêmica da disciplina Gestão de Configuração II.  
O projeto inclui um **workflow de CI/CD (GitHub Actions)** que força a **verificação de estilo (Lint)** e uma **cobertura mínima de testes de 90%**.

---

### Feature 1: Rota GET  
**GET /api/filmes** - Retorna todos os filmes.  
Implementada na branch: `feature/rota-get`

### Feature 2: Rota POST  
**POST /api/filmes** - Adiciona um novo filme.  
Implementada na branch: `feature/rota-post`

### Feature 3: Rota DELETE  
**DELETE /api/filmes/:id** - Remove um filme específico por ID.  
Implementada na branch: `feature/rota-delete`
- Retorna **404** se o filme não for encontrado.  
- Retorna **204** em caso de sucesso.  

---


### Pré-requisitos
- Node
- npm

### Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/samaraporto/Filmes-api.git

# Entre na pasta
cd Filmes-api

# Instalar dependências
npm install

# Executar API em modo de produção
npm start

# Ou para desenvolvimento (com auto-reload)
npm run dev
```

A API estará acessível em:
-> http://localhost:8080/api/filmes

###  Executando Testes

Este projeto usa Jest para testes e verificação de cobertura.
```bash
# Rodar os testes de unidade
npm test

# Rodar os testes e ver a cobertura de 90%
npm run test:coverage

# Rodar o linter para verificar o estilo do código
npm run lint
```

### CI/CD (Qualidade de Código)

Este projeto utiliza GitHub Actions (.github/workflows/ci.yml) para garantir a qualidade do código antes do merge para a branch main.

O workflow é disparado em todo push ou pull_request para a main e executa dois jobs:

verificar-estilo → Garante que o código segue os padrões do ESLint (npm run lint).

verificar-cobertura → Garante que os testes de unidade cobrem no mínimo 90% do código (npm run test:coverage).

A branch main é protegida e só permite o merge se ambos os jobs passarem 

## Por que GitHub Flow?

Simplicidade: Perfeito para projetos acadêmicos e equipes pequenas.

Desenvolvimento incremental: Foco em adicionar uma feature por vez.

Histórico limpo: A branch main sempre reflete o código em produção.

### Resumo do Fluxo Correto

main inicial: Apenas estrutura do projeto.

feature/rota-get: Desenvolve somente a rota GET.

Merge para main: agora main tem GET.

feature/rota-post: Desenvolve somente a rota POST.

Merge para main: agora main tem GET + POST.

feature/rota-delete: Desenvolve somente a rota DELETE e seus testes.

eslint: Adiciona o Lint e a cobertura mínima de 90%.

Merge para main: agora main tem a API completa e os workflows de qualidade.