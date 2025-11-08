const mongoose = require('mongoose');

const filmeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  diretor: { type: String, required: true },
  ano: { type: Number, required: true }
});

const Filme = mongoose.model('Filme', filmeSchema);
module.exports = Filme;
