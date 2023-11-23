const { createVenda } = require("../controller/venda.controller");

const vendaRoutes = {};

vendaRoutes.createVenda = async (app) => {
  app.post("/venda", createVenda);
};

module.exports = vendaRoutes;
