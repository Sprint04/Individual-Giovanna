var database = require("../database/config")

function recuperarUsuario(cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cpf)
    var instrucao = `
        SELECT * FROM usuario WHERE cpf = "${cpf}";
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarUsuario(nome, sobrenome, cpf, email, senha, fkEmpresa, cargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, cpf, email, senha, fkEmpresa);
    var instrucao = `
    insert into usuario values
    (null, "${nome}", "${sobrenome}", "${cpf}", "${email}", "${senha}", ${cargo}, ${fkEmpresa});    
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarCargo(nome, hist, add, adm, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",);
    var instrucao = `
    insert into cargo values
    (null, ${fkEmpresa}, '${nome}', 'Um cargo adicionado pela empresa')   
    `
    var instrucao2 = `
    insert into permissionamento values
    (null, (select idCargo from cargo where nome = ${nome} and fkEmpresa = ${fkEmpresa} order by idCargo desc limit 1;), 1, ${hist})
    (null, (select idCargo from cargo where nome = ${nome} and fkEmpresa = ${fkEmpresa} order by idCargo desc limit 1;), 2, ${add})
    (null, (select idCargo from cargo where nome = ${nome} and fkEmpresa = ${fkEmpresa} order by idCargo desc limit 1;), 3, ${adm})
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    database.executar(instrucao);
    return database.executar(instrucao2);
}

function cadastrarTelefone(telCel, telFixo, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", telCel, telFixo, fkUsuario);
    var instrucao = `
    insert into telefone values
    (null, ${fkUsuario}, 1,'${telCel}'),
    (null, ${fkUsuario}, 2,'${telFixo}');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function usuarioLogin(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT 
u.idUsuario,
u.nome AS nomeUsuario,
u.email_Corporativo,
e.idEmpresa,
e.nome AS nomeEmpresa,
c.idCargo,
c.nome AS nomeCargo FROM usuario as u JOIN empresa as e ON u.fkEmpresa = e.idEmpresa
	JOIN cargo as c ON c.idCargo = u.fkCargo
		WHERE email_Corporativo = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
// nas instruções havia o idempresa, mas como não dava para comentar, apaguei 
module.exports = {
    recuperarUsuario,
    cadastrarUsuario,
    cadastrarCargo,
    cadastrarTelefone,
    usuarioLogin
};