const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');

const caminhoArquivo = './filmes.json'; 

const dadosIniciaisMock = [
  {
    "id": 1,
    "titulo": "Filme Mock 1",
    "diretor": "Diretor A",
    "ano": 2001
  },
  {
    "id": 2,
    "titulo": "Filme Mock 2",
    "diretor": "Diretor B",
    "ano": 2002
  }
];


beforeEach(() => {
  try {
    fs.writeFileSync(caminhoArquivo, JSON.stringify(dadosIniciaisMock, null, 2));
  } catch (erro) {
    console.error('Erro ao configurar o mock de filmes:', erro);
  }
});

afterAll(() => {
  try {
    fs.writeFileSync(caminhoArquivo, JSON.stringify([], null, 2));
  } catch (erro) {
    console.error('Erro ao limpar após os testes:', erro);
  }
});

describe('GET /api/filmes', () => {
  it('Deve retornar a lista de filmes mock com status 200', async () => {
    const res = await request(app).get('/api/filmes');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
  });

  it('Deve conter o "Filme Mock 1" na lista', async () => {
    const res = await request(app).get('/api/filmes');
    const filmes = res.body.map(f => f.titulo);
    
    expect(filmes).toContain('Filme Mock 1');
    expect(filmes).not.toContain('Interestelar'); 
  });
});


describe('DELETE /api/filmes/:id', () => {

  it('deve retornar 204 e deletar um filme existente', async () => {
    const idParaDeletar = 1;

    const response = await request(app)
      .delete(`/api/filmes/${idParaDeletar}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});

    const getRes = await request(app).get('/api/filmes');
    const titulosRestantes = getRes.body.map(f => f.titulo);
    
    expect(getRes.body.length).toBe(1); 
    expect(titulosRestantes).toContain('Filme Mock 2');
    expect(titulosRestantes).not.toContain('Filme Mock 1');
  });

  
  it('deve retornar 404 ao tentar deletar um filme inexistente', async () => {
    const idInexistente = 999;

    const response = await request(app)
      .delete(`/api/filmes/${idInexistente}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Filme não encontrado');
  });


  it('deve retornar 400 ao usar um ID inválido (não numérico)', async () => {
    const idInvalido = 'um-id-invalido'; 
    const response = await request(app)
      .delete(`/api/filmes/${idInvalido}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'ID inválido. Forneça um número.');
  });
});