const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
let pessoas = [
    {id: 1, nome: "Pessoa 1"},
    {id: 2, nome: "Pessoa 2"},
    {id: 3, nome: "Pessoa 3"}
]
app.get('/pessoas', (req, res) => { // lista todas as pessoas
    res.json(pessoas)
})

app.get('/pessoas/:id', (req, res) => { // lista pessoa específica por id
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (pessoa) {
        res.json(pessoa);
    } else {
        res.status(404).json( {error: 'Pessoa não encontrada'})
    }
})

app.post('/pessoas', (req, res) => { // cria uma nova pessoa 
    const nome = req.body.nome;
    const novaPessoa = {
        id: pessoas.length + 1,
        nome: nome
    }
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa)
})

app.put('/pessoas/:id', (req, res) => { // edita pessoa
    const id = parseInt(req.params.id);
    const { nome } = req.body;
    const pessoa = pessoas.find(p => p.id === id);
    if(pessoa) {
        pessoa.nome= nome;
        res.json(pessoa)

    } else {
        res.status(404).json( {error: 'Pessoa não encontrada'})
    }
})

app.delete('/pessoas/:id', (req, res) => { // exclui pessoa
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);

    if(index !== -1){
        const pessoaDeletada = pessoas.splice(index, 1);
        res.json("Pessoa deletada com sucesso")
    } else {
        res.status(404).json( {error: 'Pessoa não encontrada'})
    }
})

app.listen(port, () => {
    console.log(`Servidor sendo executado em: http://localhost:${port}`)
})