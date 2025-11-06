# API REST de Filmes

## Funcionalidades Implementadas

### Feature 1: Rota GET
- `GET /api/filmes` - Retorna todos os filmes
- Implementada na branch `feature/rota-get`

### Feature 2: Rota POST  
- `POST /api/filmes` - Adiciona novo filme
- Implementada na branch `feature/rota-post`

## Pré-requisitos
Node.js

npm

## Como executar


```bash

# clone o repositório:
git clone https://github.com/samaraporto/Filmes-api.git

cd Filmes-api

# instalar dependencias
npm install

# executar api
npm start

# ou para desenvolvimento
npm run dev
```

acesse: http://localhost:8080/api/filmes

## Por que GitHub Flow?

* Simplicidade para projeto acadêmico

* Desenvolvimento incremental de features

* Histórico limpo e compreensível

* Ideal para APIs REST simples como a atividade proposta

## RESUMO DO FLUXO CORRETO

1. **main inicial**: Apenas estrutura do projeto
2. **feature/rota-get**: Desenvolve SOMENTE a rota GET  
3. **merge para main**: Agora main tem GET funcionando
4. **feature/rota-post**: Desenvolve SOMENTE a rota POST
5. **merge para main**: Agora main tem GET + POST funcionando