const express = require('express');
const app = express();
const port = 3000;
const dbOng = require("./db_con/dbOng.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"))

app.get("/", (req, res) => {
    res.render("login.ejs");
});

app.get("/cadastro", (req, res) => {
    res.render("cadastro.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/home", (req, res) => {
    res.render("index.ejs");
});

app.post("/cadastro", (req, res) => {
    const { usuario, senha, telefone, email } = req.body;
    console.log('Dados do formulário recebidos:');
    console.log('Usuário:', usuario);
    console.log('Senha:', senha);
    console.log('Telefone:', telefone);
    console.log('Email:', email);
    const insertUser = `INSERT INTO users (usuario, senha, email, telefone) VALUES (?,?,?,?)`
    const values = [usuario, senha, email, telefone]
    try {
        dbOng.query(insertUser, values, (err, result) => {
            if(err) {
                console.log(`Error inserting a new user function=controllers/addUser message=${err}`)
                return res.send({message: err.sqlStatus})
            }
            return res.send({message: "new user created"})
        })
    } catch (error) {
        console.log(`Internal error function=controllers/addUser message=${error}`)
    }
});

app.post('/adocao-cachorro', (req, res) => {
    const { nome, idade, porte, saude } = req.body;
    console.log('Dados do formulário recebidos:');
    console.log('Nome:', nome);
    console.log('Idade:', idade);
    console.log('Porte:', porte);
    console.log('Saúde:', saude);
    res.send('Formulário recebido com sucesso!');
});

app.post('/login', (req, res) => {
    const {usuario, senha} = req.body
    console.log(usuario)
    console.log(senha)

})

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
