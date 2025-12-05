require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 3000; 

// conexão com o MongoDB Atlas
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
  /* istanbul ignore next */
  .catch(err => console.error('Erro ao conectar no Mongo:', err));

const Filme = mongoose.model('Filme', {
  titulo: { type: String, required: true },
  diretor: { type: String, required: true },
  ano: { type: Number, required: true }
});


app.get('/api/filmes', async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.json(filmes);
  } catch (error) {
    /* istanbul ignore next */
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/filmes', async (req, res) => {
  const { titulo, diretor, ano } = req.body;

  if (!titulo || !diretor || !ano) {
    return res.status(400).json({ error: 'Título, diretor e ano são obrigatórios' });
  }

  try {
    const novoFilme = new Filme({ titulo, diretor, ano });
    await novoFilme.save();
    res.status(201).json(novoFilme);
  } catch (error) {
    /* istanbul ignore next */
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/filmes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const filmeDeletado = await Filme.findByIdAndDelete(id);
    if (!filmeDeletado) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }
    return res.status(204).send();
  } catch {
    /* istanbul ignore next */
    res.status(400).json({ error: 'ID inválido ou erro na operação' });
  }
});


if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

module.exports = app;