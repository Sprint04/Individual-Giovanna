var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/obterDadosGraficoCPU/", function (req, res) {
    dashboardController.buscarUltimasMedidasCPU(req, res);
})

router.get("/obterDadosGraficoRAM/", function (req, res) {
    dashboardController.buscarUltimasMedidasRAM(req, res);
})

router.get("/obterDadosGraficoDISCO/", function (req, res) {
    dashboardController.buscarUltimasMedidasDISCO(req, res);
})

module.exports = router;