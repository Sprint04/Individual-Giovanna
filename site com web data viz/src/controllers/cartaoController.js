var cartaoModel = require("../models/cartaoModel");

function recuperarIDCartao(req, res) {
    
    var numero = req.body.numeroServer;

    if (numero == undefined) {
        res.status(400).send("Seu NUMERO está undefined!");
    } else {
        cartaoModel.recuperarIDCartao(numero)
            .then(
                function (resultado) {
                    console.log(`\n Resultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`) //transforma JSON em string
                    if (resultado.length >= 1) {
                        console.log(resultado);
                        res.json(resultado[resultado.length - 1]);
                    } else {
                        res.status(403).send("Cartao não cadastrado!")
                    }
                }
            )
    }
}

function cadastrar(req, res) {

    // dados usuario
    var nome = req.body.nomeServer;
    var numero = req.body.numeroServer;
    var data_expiracao = req.body.data_expiracaoServer;
    var codigo_seguranca = req.body.codigo_segurancaServer;
    var fkTipoCartao = req.body.fkTipoCartaoServer;
    var fkBandeiraCartao = req.body.fkBandeiraCartaoServer;


        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        cartaoModel.cadastrar(nome, numero, data_expiracao, codigo_seguranca, fkTipoCartao,
             fkBandeiraCartao
            )
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

    function updateCartao(req, res) {
    
        var idEmpresa = req.params.idEmpresa;
        var idPlano = req.body.fkPlanoServer;
        var idCartao = req.body.fkCartaoServer;
    
        cartaoModel.updateCartao(idEmpresa, idPlano, idCartao)
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


module.exports = {
    cadastrar,
    recuperarIDCartao,
    updateCartao
}