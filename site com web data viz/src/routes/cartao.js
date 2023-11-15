var express = require("express");
var router = express.Router();

var cartaoController = require("../controllers/cartaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
  cartaoController.cadastrar(req, res);
})

router.post("/recuperarIDCartao", function (req, res) {
  cartaoController.recuperarIDCartao(req, res);
});

router.get("/updateCartao/:idEmpresa", function (req, res) {
  cartaoController.updateCartao(req, res);
});

module.exports = router;