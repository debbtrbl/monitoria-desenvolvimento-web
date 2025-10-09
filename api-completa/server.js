const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
let pessoas = [
    {id: 1, nome: "Ana Beatriz", idade: 28, profissao: "Designer Gráfica", salario: 4200},
    {id: 2, nome: "Carlos Eduardo", idade: 35, profissao: "Engenheiro Civil", salario: 8500},
    {id: 3, nome: "Fernanda Lima", idade: 42, profissao: "Professora de História", salario: 5200},
    {id: 4, nome: "João Pedro", idade: 30, profissao: "Desenvolvedor Web", salario: 7000},
    {id: 5, nome: "Mariana Alves", idade: 25, profissao: "Fotógrafa", salario: 3800},
    {id: 6, nome: "Rafael Torres", idade: 38, profissao: "Advogado", salario: 9500},
    {id: 7, nome: "Luciana Rocha", idade: 33, profissao: "Psicóloga", salario: 6200},
    {id: 8, nome: "Tiago Martins", idade: 29, profissao: "Chef de Cozinha", salario: 4800},
    {id: 9, nome: "Júlia Santana", idade: 17, profissao: "Estudante", salario: 0},
    {id: 10, nome: "Miguel Costa", idade: 65, profissao: "Aposentado", salario: 3200},
    {id: 11, nome: "Bruna Ribeiro", idade: 22, profissao: "Assistente Administrativa", salario: 3100},
    {id: 12, nome: "Samuel Oliveira", idade: 55, profissao: "Contador", salario: 7800},
    {id: 13, nome: "Isabela Nunes", idade: 19, profissao: "Estagiária de Marketing", salario: 1500},
    {id: 14, nome: "Roberto Mendes", idade: 72, profissao: "Aposentado", salario: 2900},
    {id: 15, nome: "Larissa Cunha", idade: 46, profissao: "Gerente de RH", salario: 8800}
];

app.get('/pessoas', (req, res) => { // lista todas as pessoas
    res.json(pessoas)
})

app.get('/pessoas/maisVelhas', (req, res) => { // retorna pessoas com mais de 50 anos
    const maisVelhas = [];
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].idade > 50){
            maisVelhas.push(pessoas[i]);
        }
    }
    if (maisVelhas.length === 0) {
        return res.status(404).json( {error: 'Nenhuma pessoa com mais de 50 anos encontrada'})
    }
    res.json(maisVelhas);
})

app.get('/pessoas/total', (req, res) => {
    if (pessoas.length === 0) {
        return res.status(404).json({ error: "Lista de pessoas está vazia." });
    }
    res.json( {total: pessoas.length} ); // retorna o total de pessoas na lista
})

app.get('/pessoas/primeira', (req,res) =>{
    if (pessoas.length === 0) {
        return res.status(404).json({ error: "Lista de pessoas está vazia." });
    }
    res.json(pessoas[0]); // retorna a primeira pessoa da lista
})

app.get('/pessoas/ultima', (req,res) =>{
    if (pessoas.length === 0) {
        return res.status(404).json({ error: "Lista de pessoas está vazia." });
    }
    res.json(pessoas[pessoas.length - 1]); // retorna a primeira pessoa da lista
})

app.get('/pessoas/mediaSalarios', (req,res) =>{
    if (pessoas.length === 0) {
        return res.status(404).json({ error: "Lista de pessoas está vazia." });
    }
    let total = 0;
    for (let i = 0; i < pessoas.length; i++) {
        total += pessoas[i].salario;
    }
    const media = total / pessoas.length;
    res.json( {mediaSalarial: media} ); // retorna a media dos salários
})

app.get('/pessoas/mediaIdade', (req, res) => {
    if (pessoas.length === 0) {
        return res.status(404).json({ error: "Lista de pessoas está vazia." });
    }

    let totalIdade = 0;
    for (let i = 0; i < pessoas.length; i++) {
        totalIdade += pessoas[i].idade;
    }

    const media = totalIdade / pessoas.length;
    res.json({ mediaIdade: media });
});

app.get('/pessoas/profissao/:nome', (req, res) => { // retorna pessoas por profissão
    const nome = req.params.nome.toLowerCase();
    const resultado = [];

    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].profissao.toLowerCase() === nome) {
            resultado.push(pessoas[i]);
        }
    }

    if (resultado.length === 0) {
        return res.status(404).json({ error: "Nenhuma pessoa com essa profissão encontrada." });
    }

    res.json(resultado);
});


app.get('/pessoas/salarioAte/:valor', (req, res) => { // retorna pessoas com salário até o valor especificado
    const valor = parseInt(req.params.valor);
    const resultado = [];

    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].salario <= valor) {
            resultado.push(pessoas[i]);
        }
    }

    if (resultado.length === 0) {
        return res.status(404).json({ error: "Nenhuma pessoa com salário até R$ " + valor });
    }

    res.json(resultado);
});


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

app.post('/pessoas/lote', (req, res) => {
    const novasPessoas = req.body; // espera um array de pessoas no corpo da requisição
    if (!Array.isArray(novasPessoas)) {
        return res.status(400).json({ error: "Envie um array com pelo menos uma pessoa" });
    }
    for (let i = 0; i < novasPessoas.length; i++) {
        const p = novasPessoas[i];
        const novaPessoa = {
            id: pessoas.length + 1,
            nome: p.nome || "Sem nome",
            idade: p.idade || 0,
            profissao: p.profissao || "Não informada",
            salario: p.salario || 0
        };
        pessoas.push(novaPessoa);
    }
    res.status(201).json({ message: `${novasPessoas.length} pessoas adicionadas com sucesso.` });
})

app.put('/pessoas/:id', (req, res) => { // edita pessoa
    const id = parseInt(req.params.id);
    const { nome, idade, profissao, salario } = req.body;
    const pessoa = pessoas.find(p => p.id === id);
    if(pessoa) {
        pessoa.nome= nome;
        pessoa.idade = idade;
        pessoa.profissao = profissao;
        pessoa.salario = salario;
        res.json(pessoa);

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