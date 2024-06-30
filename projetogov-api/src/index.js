require("dotenv").config();
const express = require("express");
const db = require("./db.js");
const app = express();

app.use(express.json());

app.get("/user/:id", async (request, response)=>{
    const id = request.params.id;
    const results = await db.selectUser(id);
    return response.json(results);
    
});
app.get("/validacao/:cpf", async (request, response)=>{
    const cpf = request.params.cpf;
    const results = await db.valRegister(cpf);
    return response.json(results)
});
app.get("/users", async (request, response)=>{
    const results = await db.selectUsers();
    response.json(results);
});

app.post("/login", async (req, res) => {
    const { cpf, senha } = req.body;
    const user = await db.loginUser(cpf, senha);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(401).json({ message: "Credenciais inválidas" });
    }
});

app.post("/user", async(request,response)=>{
    const customer = request.body;
    await db.insertUser(customer);
    response.sendStatus(201);
});

app.post("/endereco", async(request,response)=>{
    const end = request.body;
    await db.insertEndereco(end);
    response.sendStatus(201);

});
app.post("/economia", async(request,response)=>{
    const end = request.body;
    await db.insertEconomia(end);
    response.sendStatus(201);

});

app.patch("/user", async (request,response)=>{
    const status = request.body;
    await db.updadeStatus(status);
    response.sendStatus(201)
});
app.patch("/situacao", async (request,response)=>{
    const situacao = request.body;
    await db.updateSituacao(situacao);
    response.sendStatus(201)
});

app.listen(process.env.PORT, ()=>{
    console.log("Servidor rodando na porta 3000");
});