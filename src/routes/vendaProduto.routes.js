const { createVendaProduto } = require("../controller/vendaProduto.controller");

const vendaProdutoRoutes = {};

vendaProdutoRoutes.createVendaProduto = async (app) => {
  app.post("/vendaProduto", createVendaProduto);
};

module.exports = vendaProdutoRoutes;
