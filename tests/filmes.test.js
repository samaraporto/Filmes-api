const request = require('supertest');
const app = require('../src/app');

describe('Testes da API de Filmes', () => {
  it('Deve retornar a lista de filmes com status 200', async () => {
    const res = await request(app).get('/api/filmes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve conter o filme "Interestelar" na lista', async () => {
    const res = await request(app).get('/api/filmes');
    const filmes = res.body.map(f => f.titulo);
    expect(filmes).toContain('Interestelar');
  });
});
