var express = require("express");
var router = express.Router();

var enderecoController = require("../controllers/enderecoController");

router.post("/cadastroEndereco", function (req, res){
    enderecoController.cadastroEndereco(req, res);
});

router.post("/recuperarEndereco", function (req, res){
    enderecoController.recuperarEndereco(req, res);
});

router.post("/cadastrarComplemento", function (req, res){
    enderecoController.cadastrarComplemento(req, res);
});

router.post("/recuperarComplemento", function (req, res){
    enderecoController.recuperarComplemento(req, res);
});
module.exports = router;