var database = require("../database/config")

function recuperarHistorico(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function recuperarHistorico()", id);
    var instrucao = `
    select idAcesso, concat('O usuario ', u.nome, ' ', descricao, ' no dispostivo ', IFNULL(d.ip, 'Site Institucional Online'), ' as ' ,DATE_FORMAT(dtHora,'%Hh%i'),' do dia ', DATE_FORMAT(dtHora,'%d/%m/%Y')) as texto from acesso 
	join logs on fklog = idLog join Usuario as u on fkUsuario = idUsuario 
		join Empresa on fkEmpresa = idEmpresa
			left join dispositivo as d on idDispositivo = fkDispositivo
				where idEmpresa = (select fkEmpresa from usuario where idUsuario = ${id}) order by idAcesso desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function recuperarCargo(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function recuperarHistorico()", id);
    var instrucao = `
    select idCargo as id, nome from cargo where fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function recuperarFuncionario(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function recuperarHistorico()", id);
    var instrucao = `
    select idUsuario, concat(u.nome, ' ', sobrenome) as nome, c.nome as cargo, (select count(idUsuario) from usuario where fkEmpresa = (select fkEmpresa from usuario where idUsuario = 1)) as qtdFuncionario from usuario as u 
        join cargo as c on fkCargo = idCargo where u.fkEmpresa = (select fkEmpresa from usuario where idUsuario = ${id});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function removerFuncionario(id,id2) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function recuperarHistorico()", id);
    var instrucao = `
        delete from usuario where idUsuario = ${id}
    `;
    var instrucao2 = `insert into acesso(fkUsuario, fkDispositivo, fkLog) values(${id2}, null, ${4})`
    console.log("Executando a instrução SQL: \n" + instrucao);
    database.executar(instrucao2)
    return database.executar(instrucao);
}

module.exports = {
    recuperarHistorico,
    recuperarFuncionario,
    removerFuncionario,
    recuperarCargo
}