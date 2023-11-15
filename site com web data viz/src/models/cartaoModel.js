var database = require("../database/config")

function recuperarIDCartao(numero) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", numero);
    var instrucao = `
        select * from cartao where numero = '${numero}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, numero, data_expiracao, codigo_seguranca, fkTipoCartao, fkBandeiraCartao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, numero, data_expiracao, codigo_seguranca, fkTipoCartao, fkBandeiraCartao);
    
    var instrucao1 = `
        INSERT INTO Cartao (nomeTitular, numero, dtExpiracao, numSeguranca, fkTipoCartao, fkBandeiraCartao
            ) VALUES ('${nome}', ${numero}, ${data_expiracao},${codigo_seguranca},${fkTipoCartao}, ${fkBandeiraCartao});
    `;
    // console.log("Executando a instrução SQL: \n" + instrucao1, instrucao2);
    return database.executar(instrucao1);
}

function updateCartao(idEmpresa,idPlano,idCartao) {
    console.log("ACESSEI O CARTAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", idCartao);
    var instrucao = `
        update Empresa set fkPlano = ${idPlano} ,fontePagamento = ${idCartao} where idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    recuperarIDCartao,
    updateCartao
};