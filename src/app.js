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

let filmes = [
  { id: 1, titulo: 'Interestelar', diretor: 'Francis Ford Coppola', ano: 1972 },
  { id: 2, titulo: 'A Origem', diretor: 'Quentin Tarantino', ano: 1994 }
];

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

module.exports = app