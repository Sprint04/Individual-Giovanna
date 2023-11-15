var historicoModel = require("../models/historicoModel");

function historico(req, res) {
    
    var id = req.params.id;
    
        historicoModel.recuperarHistorico(id)
            .then(
                function (resultado) {
                    console.log(`\n Resultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`) //transforma JSON em string
                    if (resultado.length >= 1) {
                        console.log(resultado);
                        res.json(resultado);
                    } else {
                        res.status(403).send("historico não existe!")
                    }
                }
            )
    }
function cargo(req, res) {

    var id = req.params.id;
    
        historicoModel.recuperarCargo(id)
            .then(
                function (resultado) {
                    console.log(`\n Resultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`) //transforma JSON em string
                    if (resultado.length >= 1) {
                        console.log(resultado);
                        res.json(resultado);
                    } else {
                        res.status(403).send("historico não existe!")
                    }
                }
            )
    }
function funcionario(req, res) {
    
    var id = req.params.id;
        
        historicoModel.recuperarFuncionario(id)
            .then(
                function (resultado) {
                    console.log(`\n Resultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`) //transforma JSON em string
                    if (resultado.length >= 1) {
                        console.log(resultado);
                        res.json(resultado);
                    } else {
                        res.status(403).send("historico não existe!")
                    }
                }
            )
    }
function remover(req, res) {

var id = req.params.id;
var id2 = req.params.id2
    
    historicoModel.removerFuncionario(id,id2)
        .then(
            function (resultado) {
                console.log(`\n Resultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`) //transforma JSON em string
                res.json(resultado);
            }
        )
}

    module.exports = {
        historico,
        funcionario,
        remover,
        cargo
    }