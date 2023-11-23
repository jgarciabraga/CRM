const {
  createClientePf,
  createClientePj,
  getClienteByDocument,
  getClientes,
  updateClienteByDocument,
} = require("../controller/pfpj.controller");

const pfpjRoutes = {};

pfpjRoutes.createClientePf = async (app) => {
  app.post("/pfpjClientePf", createClientePf);
};

pfpjRoutes.createClientePj = async (app) => {
  app.post("/pfpjClientePj", createClientePj);
};

pfpjRoutes.getClienteByDocument = async (app) => {
  app.get("/pfpjCliente/:tipo/:document", getClienteByDocument);
};

pfpjRoutes.getClientes = async (app) => {
  app.get("/pfpjCliente/:tipo", getClientes);
};

pfpjRoutes.updateClienteByDocument = async (app) => {
  app.patch("/pfpjCliente/:tipo/:document", updateClienteByDocument);
};

module.exports = pfpjRoutes;
