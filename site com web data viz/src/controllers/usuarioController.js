var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function recuperarUsuario(req, res) {
    var cpf = req.body.cpfServer;
    if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else {
        usuarioModel.recuperarUsuario(cpf)
            .then(
                function (resultado) {
                    console.log(`\n Resultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`) //transforma JSON em string
                    if (resultado.length >= 1) {
                        console.log(resultado);
                        res.json(resultado[resultado.length - 1]);
                    } else {
                        res.status(403).send("Usuario não cadastrado!")
                    }
                }
            )
    }
}

function cadastrarUsuario(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var cargo = req.body.cargoServer

    if (nome == undefined) {
        res.status(400).send("Seu NOME está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu SOBRENOME está undefined!")
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined!")
    } else if (email == undefined) {
        res.status(400).send("Seu EMAIL está undefined!")
    } else if (senha == undefined) {
        res.status(400).send("Sua SENHA está undefined!")
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!")
    } else {
        if(cargo == undefined){
            cargo = 1
        }
        usuarioModel.cadastrarUsuario(nome, sobrenome, cpf, email, senha, fkEmpresa, cargo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarCargo(req, res) {
    var nome = req.body.nomeServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var hist = req.body.cargoServer;
    var add = req.body.addServer;
    var adm = req.body.admServer;

    usuarioModel.cadastrarCargo(nome, hist, add, adm, fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

function cadastrarTelefone(req, res) {
    var telFixo = req.body.telFixoServer;
    var telCel = req.body.telCelServer;
    var fkUsuario = req.body.fkUsuarioServer;

    if (telFixo == undefined) {
        res.status(400).send("Seu TELEFONE FIXO está undefined!");
    } else if (telCel == undefined) {
        res.status(400).send("Seu TELEFONE CELULAR está undefined!");
    } else {
        usuarioModel.cadastrarTelefone(telCel, telFixo, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function usuarioLogin(req, res){
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if(email == undefined){
        res.status(400).send("Seu EMAIL está undefined!")
    } else if (senha == undefined){
        res.status(400).send("Sua SENHA está undefined!")
    } else {
        usuarioModel.usuarioLogin(email, senha)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length == 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    recuperarUsuario,
    cadastrarUsuario,
    cadastrarCargo,
    cadastrarTelefone,
    usuarioLogin
}