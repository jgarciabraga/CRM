const { createClientePf } = require("../controller/pfpj.controller");

const pfpjRoutes = {};

pfpjRoutes.createClientePf = async (app) => {
  app.post("/pfpjClientePf", createClientePf);
};

module.exports = pfpjRoutes;
