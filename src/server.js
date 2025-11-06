const app = require('./app')
const PORTA = 8080
app.listen(PORTA, ()=>{
    console.log(`servidor rodando na porta ${PORTA}`);
})