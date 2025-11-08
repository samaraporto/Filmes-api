const express = require('express')
const app = express()
const fs = require('fs');


app.use(express.json())
const caminhoArquivo = './filmes.json';

function carregarFilmes() {
  try {
    const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
  } catch (erro) {
    console.error('Erro ao ler o arquivo de filmes:', erro);
    return [];
  }
}

function salvarFilmes(filmes) {
  try {
    fs.writeFileSync(caminhoArquivo, JSON.stringify(filmes, null, 2));
  } catch (erro) {
    console.error('Erro ao salvar os filmes:', erro);
  }
}

app.get('/api/filmes', (req, res) => {
  const filmes = carregarFilmes();
  res.json(filmes);
});

app.post('/api/filmes', (req, res) => {
  const { titulo, diretor, ano } = req.body;

  if (!titulo || !diretor || !ano) {
    return res.status(400).json({
      error: 'Título, diretor e ano são obrigatórios'
    });
  }

  const filmes = carregarFilmes();

  const novoFilme = {
    id: filmes.length > 0 ? filmes[filmes.length - 1].id + 1 : 1,
    titulo,
    diretor,
    ano
  };

  filmes.push(novoFilme);
  salvarFilmes(filmes);

  res.status(201).json(novoFilme);
});

app.delete('/api/filmes/:id', (req, res) => {
  const idParaDeletar = parseInt(req.params.id, 10);

  if (isNaN(idParaDeletar)) {
    return res.status(400).json({ error: 'ID inválido. Forneça um número.' });
  }

  let filmes = carregarFilmes();

  const filmeIndex = filmes.findIndex(f => f.id === idParaDeletar);

  if (filmeIndex === -1) {
    return res.status(404).json({ error: 'Filme não encontrado' });
  }

  filmes.splice(filmeIndex, 1);
  salvarFilmes(filmes);

  return res.status(204).send();
});

module.exports = app