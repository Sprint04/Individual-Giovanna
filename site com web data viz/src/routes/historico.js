var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");

router.get("/historico/:id", function (req, res) {
    historicoController.historico(req, res);
})
router.get("/funcionario/:id", function (req, res) {
    historicoController.funcionario(req, res);
})
router.get("/removerFuncionario/:id/:id2", function (req, res) {
    historicoController.remover(req, res);
})
router.get("/cargo/:id", function (req, res) {
    historicoController.cargo(req, res);
})

module.exports = router;