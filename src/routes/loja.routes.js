const {
  createLoja,
  getLojaByName,
  getLojas,
} = require("../controller/loja.controller");

const lojaRoutes = {};

lojaRoutes.createLoja = (app) => {
  app.post("/loja", createLoja);
};

lojaRoutes.getLojaByName = (app) => {
  app.get("/loja/:nome", getLojaByName);
};

lojaRoutes.getLojas = (app) => {
  app.get("/loja", getLojas);
};

module.exports = lojaRoutes;
