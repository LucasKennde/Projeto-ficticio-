const mysql = require("mysql2/promise");
const client = mysql.createPool(process.env.CONNECTION_STRING);
const bcrypt = require("bcryptjs");
const { query } = require("express");




async function loginUser(cpf, senha) {
    const [rows] = await client.query("SELECT * FROM caduser WHERE cpf = ?", cpf);
    if (rows.length === 0) {
        return false; // Usuário não encontrado
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (passwordMatch) {
        return {
            id: user.id_user,
            nome: user.nome,
            email: user.email,
            status: user.status // Adicione o status do usuário aos detalhes do usuário
        };
    } else {
        return false; // Senha incorreta
    }
}

//Função para mostrar todos os usuarios
async function  selectUsers(){
    const results = await client.query("SELECT * FROM caduser WHERE status = 2");
    return results[0];
};

async function selectUser(id){
    const results = await client.query("SELECT * FROM `caduser` JOIN `economia` ON `caduser`.`id_user` = `economia`.`id_user` JOIN `endereco` ON `caduser`.`id_user` = `endereco`.`id_user` WHERE `caduser`.`id_user` = ? ",id);
    return results[0];
};
async function valRegister(cpf){
    const results = await client.query("SELECT * FROM caduser WHERE cpf = ?",cpf);
    return results[0];
};

//função para cadastro de usuario
async function insertUser(newUser) {
    
    const status = 'user';
    const situacao = 'Analise';
    const hashedPassword = await bcrypt.hash(newUser.senha, 10); // 10 é o custo de processamento, pode ser ajustado conforme necessário
    const values = [newUser.nome, newUser.cpf, newUser.email, hashedPassword, status, situacao];
    const results = await client.query("INSERT INTO caduser (nome,cpf,email,senha,status,situacao) VALUES (?, ?, ?, ?, ?, ?)", values);
}

//função para cadastro de endereço do usuario
async function insertEndereco(newEnd){
    // Aqui estamos usando newEnd em vez de newUser
    const values = [newEnd.rua, newEnd.cep, newEnd.cidade, newEnd.estado,newEnd.telefone, newEnd.id_user];
    const results = await client.query("INSERT INTO endereco (rua,cep,cidade,estado,telefone,id_user) VALUES (?, ?, ?,?,?,?)", values);
}
//função para cadastro de situação socioeconomica do usuario
async function insertEconomia(newEco){
    // Aqui estamos usando newEnd em vez de newUser
    const values = [newEco.escolaridade, newEco.emprego, newEco.renda, newEco.beneficio, newEco.id_user];
    const results = await client.query("INSERT INTO economia (escolaridade,emprego,renda,beneficio,id_user) VALUES (?, ?, ?,?,?)", values);
}
async function updadeStatus(status){
    const values = [status.status, status.id_user];
    const results = await client.query("UPDATE caduser SET status = ? WHERE id_user = ?;",values);
};
async function updateSituacao(status){
    const values = [status.situacao,status.id_user];
    const results = await client.query("UPDATE caduser SET situacao = ? WHERE id_user = ?;",values);
};
async function deleteUser(){};

module.exports = {
    loginUser,
    selectUsers,
    selectUser,
    insertUser,
    updadeStatus,
    deleteUser,
    insertEndereco,
    insertEconomia,
    valRegister,
    updateSituacao
}