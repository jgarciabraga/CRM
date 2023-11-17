const { createLoja } = require("../controller/loja.controller");

const lojaRoutes = {};

lojaRoutes.createLoja = (app) => {
  app.post("/loja", createLoja);
};

module.exports = lojaRoutes;
