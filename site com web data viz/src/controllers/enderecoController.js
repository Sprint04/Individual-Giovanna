var enderecoModel = require("../models/enderecoModel");

function cadastroEndereco(req, res) {
    var cep = req.body.cepServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var rua = req.body.ruaServer;

    if (cep == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu ESTADO está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua CIDADE está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu BAIRRO está undefined!");
    } else if (rua == undefined) {
        res.status(400).send("Sua RUA está undefined!");
    } else {
        enderecoModel.cadastrarEndereco(cep, estado, cidade, bairro, rua)
            .then(
                function (resultado) {
                    res.json(resultado);
                    console.log(resultado)
                }
            )
            .catch(
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

function recuperarEndereco(req, res) {
    var cep = req.body.cepServer;
    if (cep == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } else {
        enderecoModel.recuperarEndereco(cep)
            .then(
                function (resultado) {
                    console.log(`\n Resultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`) //transforma JSON em string
                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length > 1) {
                        res.status(403).send("Endereço com o mesmo CEP já foi cadastrado!")
                    }
                }
            )
    }
}

function cadastrarComplemento(req, res) {
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var fkEndereco = req.body.fkEnderecoServer;

    if (numero == undefined) {
        res.status(400).send("Seu NUMERO está undefined!");
    } else if (fkEndereco == undefined) {
        res.status(400).send("Sua fkEndereco está undefined!");
    } else {
        enderecoModel.cadastrarComplemento(numero, complemento, fkEndereco)
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

function recuperarComplemento(req, res) {
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    if (numero == undefined) {
        res.status(400).send("Seu NUMERO está undefined!");
    } else {
        enderecoModel.recuperarComplemento(numero, complemento)
            .then(
                function (resultado) {
                    console.log(`\n Resultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`) //transforma JSON em string
                    if (resultado.length >= 1) {
                        console.log(resultado);
                        res.json(resultado[resultado.length - 1]);
                    } else {
                        res.status(403).send("Complemento não cadastrado!")
                    }
                }
            )
    }
}

module.exports = {
    cadastroEndereco,
    recuperarEndereco,
    cadastrarComplemento,
    recuperarComplemento
}