const {
  createFuncionario,
  deleteFuncionarioById,
  getFuncionarioByEmail,
  createDiretor,
  createGerente,
  createVendedor,
} = require("../controller/funcionario.controller");

const funcionarioRoutes = {};

funcionarioRoutes.createFuncionario = (app) => {
  app.post("/funcionario", createFuncionario);
};

funcionarioRoutes.deleteFuncionarioById = (app) => {
  app.delete("/funcionario/:id", deleteFuncionarioById);
};

funcionarioRoutes.createDiretor = (app) => {
  app.post("/diretor", createDiretor);
};

funcionarioRoutes.createGerente = (app) => {
  app.post("/gerente", createGerente);
};

funcionarioRoutes.createVendedor = (app) => {
  app.post("/vendedor", createVendedor);
};

funcionarioRoutes.getFuncionarioByEmail = (app) => {
  app.get("/funcionario/:email", getFuncionarioByEmail);
};

module.exports = funcionarioRoutes;
