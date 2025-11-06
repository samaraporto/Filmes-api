const express = require('express')
const app = express()

app.use(express.json())

let filmes = [
  { id: 1, titulo: 'O Poderoso Chefão', diretor: 'Francis Ford Coppola', ano: 1972 },
  { id: 2, titulo: 'Pulp Fiction', diretor: 'Quentin Tarantino', ano: 1994 }
];

app.get('/api/filmes', (req,res)=>{
    res.json(filmes)
})

module.exports = app