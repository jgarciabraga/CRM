const {
  createEderecoEntrega,
} = require("../controller/enderecoEntrega.contoller");

const enderecoEntregaRoutes = {};

enderecoEntregaRoutes.createEnderecoEntrega = async (app) => {
  app.post("/enderecoEntrega", createEderecoEntrega);
};

module.exports = enderecoEntregaRoutes;
