var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.post("/recuperarEmpresa", function (req, res) {
  empresaController.recuperarEmpresa(req, res);
});

router.post("/criarToken", function (req, res) {
  empresaController.criarToken(req, res);
});

router.get("/recuperarToken/:token", function (req, res) {
  empresaController.recuperarToken(req, res);
});



module.exports = router;