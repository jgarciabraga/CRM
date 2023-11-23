const {
  getProdutoById,
  createProduto,
  getProdutos,
} = require("../controller/produto.controller");

const produtoRoutes = {};

produtoRoutes.createProduto = (app) => {
  app.post("/produto", createProduto);
};

produtoRoutes.getProdutoById = (app) => {
  app.get("/produto/:id", getProdutoById);
};

produtoRoutes.getProdutos = (app) => {
  app.get("/produto", getProdutos);
};

module.exports = produtoRoutes;
