const {
  createFuncionario,
  deleteFuncionarioById,
  getFuncionarioByEmail,
  updateFuncionarioByEmail,
  createDiretor,
  createGerente,
  createVendedor,
} = require("./funcionario.routes");
const { getProduto, createProduto } = require("./produtos.routes");
const { createLoja, getLojaByName, getLojas } = require("./loja.routes");
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
  updateFuncionarioByEmail(app);
  createGerente(app);
  createDiretor(app);
  createVendedor(app);
  //produtos
  getProduto(app);
  createProduto(app);
};

module.exports = routes;
