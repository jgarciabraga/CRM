const {
  createFuncionario,
  deleteFuncionarioById,
  getFuncionarioByEmail,
  createDiretor,
  createGerente,
  createVendedor,
} = require("./funcionario.routes");
const { getProduto, createProduto } = require("./produtos.routes");
const { createLoja } = require("./loja.routes");
const { createClientePf } = require("./pfpj.routes");

const routes = {};

routes.routes = (app) => {
  //Cliente
  createClientePf(app);
  //loja;
  createLoja(app);
  //funcionario
  createFuncionario(app);
  deleteFuncionarioById(app);
  getFuncionarioByEmail(app);
  createGerente(app);
  createDiretor(app);
  createVendedor(app);
  //produtos
  getProduto(app);
  createProduto(app);
};

module.exports = routes;
