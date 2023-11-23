const {
  singIn,
  createFuncionario,
  deleteFuncionarioById,
  getFuncionarioByEmail,
  updateFuncionarioByEmail,
  createDiretor,
  createGerente,
  createVendedor,
} = require("./funcionario.routes");
const {
  getProdutoById,
  createProduto,
  getProdutos,
} = require("./produtos.routes");
const {
  createLoja,
  getLojaByName,
  getLojas,
  updateLojaByName,
} = require("./loja.routes");
const {
  createClientePf,
  createClientePj,
  getClienteByDocument,
  getClientes,
  updateClienteByDocument,
} = require("./pfpj.routes");
const { createEnderecoEntrega } = require("./enderecoEntrega.routes");
const { createVenda } = require("./venda.routes");
const { createVendaProduto } = require("./vendaProduto.routes");

const routes = {};

routes.routes = (app) => {
  //Cliente
  createClientePf(app);
  createClientePj(app);
  getClienteByDocument(app);
  getClientes(app);
  updateClienteByDocument(app);
  //loja;
  createLoja(app);
  getLojaByName(app);
  getLojas(app);
  updateLojaByName(app);
  //funcionario
  singIn(app);
  createFuncionario(app);
  deleteFuncionarioById(app);
  getFuncionarioByEmail(app);
  updateFuncionarioByEmail(app);
  createGerente(app);
  createDiretor(app);
  createVendedor(app);
  //produtos
  getProdutos(app);
  getProdutoById(app);
  createProduto(app);
  //EnderecoEntrega
  createEnderecoEntrega(app);
  //venda
  createVenda(app);
  createVendaProduto(app);
};

module.exports = routes;
