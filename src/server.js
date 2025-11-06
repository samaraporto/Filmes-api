const express = require('express')
const app = express()

app.use(express.json())
const PORTA = 8080
app.listen(PORTA, ()=>{
    console.log(`servidor rodando na porta ${PORTA}`);

})