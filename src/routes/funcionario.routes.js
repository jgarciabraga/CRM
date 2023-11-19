const {
  createFuncionario,
  deleteFuncionarioByEmail,
  getFuncionarioByEmail,
  updateFuncionarioByEmail,
  createDiretor,
  createGerente,
  createVendedor,
} = require("../controller/funcionario.controller");

const funcionarioRoutes = {};

funcionarioRoutes.createFuncionario = (app) => {
  app.post("/funcionario", createFuncionario);
};

funcionarioRoutes.deleteFuncionarioById = (app) => {
  app.delete("/funcionario/:email", deleteFuncionarioByEmail);
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

funcionarioRoutes.updateFuncionarioByEmail = (app) => {
  app.patch("/funcionario/:tipo/:email", updateFuncionarioByEmail);
};

module.exports = funcionarioRoutes;
