# API REST de Filmes

![Docker Image Size](https://img.shields.io/docker/image-size/samaraporto/filmes-api/latest)


<p align="left">

  <img src="https://img.shields.io/badge/Coverage-90%25-brightgreen" alt="Coverage">

  <a href="https://hub.docker.com/r/samaraporto/filmes-api">
    <img src="https://img.shields.io/docker/pulls/samaraporto/filmes-api" alt="Docker Pulls">
  </a>

  <a href="https://hub.docker.com/r/samaraporto/filmes-api">
    <img src="https://img.shields.io/docker/v/samaraporto/filmes-api?sort=semver" alt="Docker Image Version">
  </a>

</p>


[🐳 Acesse a Imagem oficial no Docker Hub](https://hub.docker.com/r/samaraporto/filmes-api)

Esta é uma API REST para gerenciamento de filmes, integrada com MongoDB e Dockerizada.


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

### CI/CD com GitHub Actions

O workflow está em: .github/workflows/ci-cd.yaml

Ele é executado a cada push na branch main e possui 4 jobs sequenciais:

linter — Verifica estilo do código com ESLint

test-and-coverage — Executa testes e valida 90% de cobertura

build-image — Constrói a imagem Docker da aplicação

publish-image — Publica no Docker Hub

Repositório: samaraporto/filmes-api

### Infraestrutura como Código (Ansible)

Scripts localizados em: /ansible

Principais arquivos:

configura-node.yaml — Instala Node.js, copia arquivos, instala dependências e inicia com PM2

hosts — Inventário de servidores (por padrão configurado para localhost)

Como executar o provisionamento:

```bash
cd ansible
ansible-playbook -i hosts configura-node.yaml -K
```
