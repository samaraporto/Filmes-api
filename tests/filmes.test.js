const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); 

require('dotenv').config();

describe('API de Filmes com MongoDB', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let filmeIdTeste;

  it('Deve criar um novo filme', async () => {
    const res = await request(app)
      .post('/api/filmes')
      .send({
        titulo: "Filme de Teste Jest",
        diretor: "QA Automation",
        ano: 2025
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id'); // Mongo usa _id, não id
    expect(res.body.titulo).toEqual("Filme de Teste Jest");
    
    filmeIdTeste = res.body._id; 
  });

  it('Deve listar os filmes', async () => {
    const res = await request(app).get('/api/filmes');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    const titulos = res.body.map(f => f.titulo);
    expect(titulos).toContain("Filme de Teste Jest");
  });

  it('Deve deletar o filme criado', async () => {
    const res = await request(app).delete(`/api/filmes/${filmeIdTeste}`);
    
    expect(res.statusCode).toEqual(204);
  });

  it('Deve retornar 404 ao tentar deletar um ID inexistente', async () => {
    
    const idFalso = new mongoose.Types.ObjectId(); 
    
    const res = await request(app).delete(`/api/filmes/${idFalso}`);
    expect(res.statusCode).toEqual(404);
  });
});