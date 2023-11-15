var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function recuperarEmpresa(req, res) {
  var cnpj = req.body.cnpjServer;
  if (cnpj == undefined) {
    res.status(400).send("Seu NUMERO está undefined!");
  } else {
    empresaModel.recuperarEmpresa(cnpj)
      .then(
        function (resultado) {
          console.log(`\n Resultados encontrados: ${resultado.length}`);
          console.log(`Resultados: ${JSON.stringify(resultado)}`) //transforma JSON em string
          if (resultado.length >= 1) {
            console.log(resultado);
            res.json(resultado[resultado.length - 1]);
          } else {
            res.status(403).send("Empresa não cadastrado!")
          }
        }
      )
  }
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrarEmpresa(req, res) {
  var nome = req.body.nomeServer;
  var cnpj = req.body.cnpjServer;
  var fkEnderecoComplemento = req.body.fkEnderecoComplementoServer;
  var fkToken = req.body.fkTokenServer;

  if (nome == undefined) {
    res.status(400).send("Seu NOME DA EMPRESA está undefined!");
  } else if (cnpj == undefined) {
    res.status(400).send("Seu CNPJ está undefined!");
  } else if (fkEnderecoComplemento == undefined) {
    res.status(400).send("Seu fkEnderecoComplemento está undefined!");
  } else if (fkToken == undefined) {
    res.status(400).send("Seu fkToken está undefined!");
  } else {
    empresaModel.cadastrarEmpresa(nome, cnpj, fkEnderecoComplemento, fkToken)
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

function criarToken(req, res) {
  var token = req.body.tokenServer;

  if (token == undefined) {
    res.status(400).send("Seu token está undefined!")
  } else {
    empresaModel.criarToken(token)
      .then(
        function (resultado) {
          res.json(resultado)
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar a criação do token! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function recuperarToken(req, res) {
  var token = req.params.token;
  if (token == undefined) {
    res.status(400).send("Seu TOKEN está undefined!");
  } else {
    empresaModel.recuperarToken(token)
      .then(
        function (resultado) {
          res.json(resultado)
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar a recuperação do token! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrarEmpresa,
  recuperarEmpresa,
  criarToken,
  recuperarToken
};
