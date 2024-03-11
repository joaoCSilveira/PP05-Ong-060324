const express = require("express");
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
    res.render("home.ejs")
})

app.get("/registro-cachorro", (req, res) => {
    res.render("registroCachorro.ejs");
});

app.get("/lista-cachorros", async (req, res) => {
    try {
        const cachorros = await obterCachorrosDoBanco();
        res.render("listaCachorros.ejs", { cachorros });
    } catch (error) {
        console.error("Erro ao obter cachorros:", error);
        res.status(500).send("Erro interno do servidor");
    }
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

app.post('/registro-cachorro', async (req, res) => {
    const { nome, idade, porte, saude } = req.body;
    console.log('Dados do formulário recebidos:');
    console.log('Nome:', nome);
    console.log('Idade:', idade);
    console.log('Porte:', porte);
    console.log('Saúde:', saude);

    const addDog = await (await dbOng).execute("INSERT INTO paciente (nome, idade, saude, porte) VALUES (?,?,?,?)", [nome, idade, saude, porte])
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Usuário:", username);
    console.log("Senha:", password);

    try {
        if (username && password) {
            const selectPassword = await (await dbOng).execute("SELECT senha FROM users WHERE usuario = ?", [username]);

                if (selectPassword[0][0].senha == password) {
                    console.log("Login bem-sucedido");
                    res.redirect("/home");
                } else {
                    console.log("Senha incorreta. Redirecionando para /login");
                    res.redirect("/login");
                }
            } else {
                console.log("Usuário não encontrado. Redirecionando para /login");
                res.redirect("/login");
            }
    } catch (error) {
        console.error("Erro ao executar consulta SQL:", error);
        res.redirect("/login");
    }
});

async function obterCachorrosDoBanco() {
    try {
        const [rows, fields] = await (await dbOng).execute("SELECT * FROM paciente");
        return rows;
    } catch (error) {
        console.error("Erro ao obter cachorros do banco de dados:", error);
        throw error;
    }
}

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
