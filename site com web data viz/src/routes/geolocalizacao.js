var express = require("express");
var router = express.Router();

var geolocalizacaoController = require("../controllers/geolocalizacaoController");

router.get("/obterDadosGraficoGEO/", function (req, res) {
    geolocalizacaoController.buscarUltimasMedidasGEO(req, res);
})

router.get("/obterDadosGraficoCPU/", function (req, res) {
    geolocalizacaoController.buscarUltimasMedidasCPU(req, res);
})

router.get("/obterDadosGraficoRAM/", function (req, res) {
    geolocalizacaoController.buscarUltimasMedidasRAM(req, res);
})

router.get("/obterDadosGraficoDISCO/", function (req, res) {
    geolocalizacaoController.buscarUltimasMedidasDISCO(req, res);
})

module.exports = router;