const express = require('express');
const exphb = require('express-handlebars');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', exphb.engine({defaultLayout: false}))
app.set('view engine', 'handlebars')

let pessoas = [
  { id: 1, nome: 'pessoa 1' },
  { id: 2, nome: 'pessoa 2' },
  { id: 3, nome: 'pessoa 3' },
  { id: 4, nome: 'pessoa 4' }
];

app.get('/', (req, res) => {res.render('home')}); // mostra view de tela principal

app.get('/pessoas', (req, res) => {res.render('listarPessoas', {pessoas})}); // mostra view de listarPessoas

app.get('/pessoas/nova', (req, res) => {res.render('cadastrarPessoa')}); // mostra a tela de cadastro

app.post('/pessoas', (req,res) => {
    const nome = req.body.nome;

    const novaPessoa = {
        id: pessoas.length + 1,
        nome: nome
    }

    pessoas.push(novaPessoa);

    res.render('listarPessoas', {pessoas})
});

app.get('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const pessoa = pessoas.find(p => p.id === id)

    if(pessoa){
        res.render('detalharPessoa', {pessoa})
    } else {
        res.status(404).send('Pessoa não encontrada :(')
    }

});



app.listen(port, () => {
  console.log(`Servidor em execução: http://localhost:${port}`);
});