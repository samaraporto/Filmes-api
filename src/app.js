const express = require('express')
const app = express()
const connectDB = require('./db/conexao');
const Filme = require('./model/Filme');

app.use(express.json())

connectDB();

app.get('/api/filmes', async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.json(filmes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

app.post('/api/filmes', async (req, res) => {
  try {
    const { titulo, diretor, ano } = req.body;

    if (!titulo || !diretor || !ano) {
      return res.status(400).json({
        error: 'Título, diretor e ano são obrigatórios'
      });
    }

    const novoFilme = new Filme({ titulo, diretor, ano });
    await novoFilme.save();

    res.status(201).json(novoFilme);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar filme' });
  }
});

module.exports = app