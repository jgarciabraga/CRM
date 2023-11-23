const {
  createLoja,
  getLojaByName,
  getLojas,
  updateLojaByName,
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

lojaRoutes.updateLojaByName = (app) => {
  app.patch("/loja/:tipo/:nome", updateLojaByName);
};

module.exports = lojaRoutes;
