var database = require("../database/config")

function buscarUltimasMedidasGEO() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    SELECT 
	SUBSTRING_INDEX(endereco, ",", 1) as cidade,
	TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(endereco, ",", -2), ",", 1)) as estado,
	SUBSTRING_INDEX(endereco, ",", -1) as Pais,
	latitude,
	longitude
		FROM geolocalizacao 
        WHERE fkDispositivo = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUltimasMedidasQTD() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    SELECT endereco, COUNT(fkDispositivo) AS quantidade_de_computadores FROM geolocalizacao GROUP BY endereco;
    ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUltimasMedidasCPU() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    SELECT FORMAT(porcentagemUsoCPU, 2) as porcentagemUsoCPU, DATE_FORMAT(dataHoraCaptura, '%d/%m/%Y às %HH') as dataHoraCaptura FROM dados_cpu;
    ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUltimasMedidasRAM() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    SELECT dadoCapturado, DATE_FORMAT(dtHora, '%d/%m/%Y às %HH') as dtHora FROM Monitoramento where fkComponente = 2;
    ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUltimasMedidasDISCO() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    SELECT dadoCapturado, DATE_FORMAT(dtHora, '%d/%m/%Y às %HH') as dtHora FROM Monitoramento where fkComponente = 3;
    ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarUltimasMedidasGEO,
    buscarUltimasMedidasQTD,
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasRAM,
    buscarUltimasMedidasDISCO
};