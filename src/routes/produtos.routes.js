const {
  getProdutoById,
  createProduto,
} = require("../controller/produto.controller");

const produtoRoutes = {};

produtoRoutes.createProduto = (app) => {
  app.post("/produto", createProduto);
};

produtoRoutes.getProduto = (app) => {
  app.get("/produto/:id", getProdutoById);
};

module.exports = produtoRoutes;
