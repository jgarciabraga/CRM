const {
  login,
  eraserFuncionarioByEmail,
  selectFuncionarioByEmail,
  changeFuncionarioByEmail,
  addFuncionario,
  addDiretor,
  addGerente,
  addVendedor,
} = require("../repository/funcionario.repository");
const bcrypt = require("bcrypt");

async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, 10);
  return hash;
}

async function comparePassword(plainPassword, hash) {
  const result = await bcrypt.compare(plainPassword, hash);
  return result;
}

const singIn = async (req, res) => {
  const data = req.body;
  try {
    let funcionario = await login(data.email);
    if (funcionario != null) {
      const result = await comparePassword(data.senha, funcionario.senha);
      if (result) {
        funcionario.senha = undefined;
        const msg = { status: "sucesso", funcionario };
        res.status(200).send(msg);
        return msg;
      }
      res
        .status(200)
        .send({ stattus: "erro", resposta: "login ou senha incorretos" });
      return { stattus: "erro", resposta: "login ou senha incorretos" };
    }
    res
      .status(200)
      .send({ stattus: "erro", resposta: "login ou senha incorretos" });
    return { stattus: "erro", resposta: "login ou senha incorretos" };
  } catch (erro) {
    console.log(erro);
    res
      .status(200)
      .send({ stattus: "erro", resposta: "login ou senha incorretos" });
    return { stattus: "erro", resposta: "login ou senha incorretos" };
  }
};

const createFuncionario = async (req, res) => {
  try {
    const funcionario = await addFuncionario(req.body);
    res.status(200).send(funcionario);
    return { status: "sucesso ao inserir funionario" };
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    return { status: "erro ao inserir funcionario" };
  }
};

const createDiretor = async (req, res) => {
  data = req.body;
  const hash = await hashPassword(data.senha);
  const data_funcionario = {
    cpf: data.cpf,
    permissao: "admin",
    salario: data.salario,
    email: data.email,
    senha: hash,
    endereco: data.endereco,
    estado: data.estado,
    municipio: data.municipio,
    nome: data.nome,
    telefone: data.telefone,
    tipo: "Diretor",
    cep: data.cep,
  };
  const funcionario = await addFuncionario(data_funcionario);
  if (funcionario != null) {
    const data_diretor = {
      id_func: funcionario.id,
      telefone_trabalho: data.telefone_trabalho,
    };
    try {
      const diretor = await addDiretor(data_diretor);
      if (diretor != null) {
        res.status(200).send(diretor);
        return { status: "sucesso ao inserir diretor" };
      }
      res.status(400).send({ status: "erro ao inserir diretor" });
      return { status: "erro ao inserir diretor" };
    } catch (error) {
      res.status(400).send(error);
      return { status: "erro ao inserir diretor" };
    }
  }
  return { status: "erro ao inserir funcionario" };
};

const createGerente = async (req, res) => {
  data = req.body;
  const hash = await hashPassword(data.senha);
  const data_funcionario = {
    cpf: data.cpf,
    permissao: data.permissao,
    salario: data.salario,
    email: data.email,
    senha: hash,
    endereco: data.endereco,
    estado: data.estado,
    municipio: data.municipio,
    nome: data.nome,
    telefone: data.telefone,
    tipo: data.tipo,
    cep: data.cep,
  };

  const funcionario = await addFuncionario(data_funcionario);
  if (funcionario != null) {
    const data_gerente = {
      id_func: funcionario.id,
      id_loja: data.id_loja,
      telefone_trabalho: data.telefone_trabalho,
    };
    try {
      const gerente = await addGerente(data_gerente);
      if (gerente != null) {
        res.status(200).send(gerente);
        return { status: "sucesso ao inserir gerente" };
      }
      res.status(400).send({ status: "erro ao inserir gerente" });
      return { status: "erro ao inserir gerente" };
    } catch (error) {
      res.status(400).send(error);
      return { status: "erro ao inserir gerente" };
    }
  }
  return { status: "erro ao inserir funcionario" };
};

const createVendedor = async (req, res) => {
  const data = req.body;
  const hash = await hashPassword(data.senha);
  const data_funcionario = {
    cpf: data.cpf,
    permissao: data.permissao,
    salario: data.salario,
    email: data.email,
    senha: hash,
    endereco: data.endereco,
    estado: data.estado,
    municipio: data.municipio,
    nome: data.nome,
    telefone: data.telefone,
    tipo: data.tipo,
    cep: data.cep,
  };

  const funcionario = await addFuncionario(data_funcionario);
  if (funcionario != null) {
    const data_vendedor = {
      id_func: funcionario.id,
      id_loja: data.id_loja,
    };
    try {
      const vendedor = await addVendedor(data_vendedor);
      if (vendedor != null) {
        res.status(200).send(vendedor);
        return { status: "sucesso", vendedor };
      }
      res.status(400).send({ status: "erro", undefined });
      return { status: "erro", undefined };
    } catch (error) {
      res.status(400).send(error);
      return { status: "erro", undefined };
    }
  }
  return { status: "erro ao inserir funcionario" };
};

const getFuncionarioByEmail = async (req, res) => {
  try {
    const resp = await selectFuncionarioByEmail(String(req.params.email));
    if (resp != null) {
      if (resp.status === "ativo") {
        res
          .status(200)
          .send({ status: "sucesso", funcionario: resp.funcionario });
        return { status: "sucesso", funcionario: resp.funcionario };
      } else {
        res
          .status(200)
          .send({ status: "deletado", email: resp.funcionario.email });
        return { status: "deletado", email: resp.funcionario.email };
      }
    } else {
      res.status(400).send({ status: "erro", undefined });
      return { status: "erro", undefined };
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "erro", undefined });
    return { status: "erro", undefined };
  }
};

const updateFuncionarioByEmail = async (req, res) => {
  try {
    let data = {};
    if (req.params.tipo === "alteracao") {
      data = {
        email: req.body.email || undefined,
        cpf: req.body.cpf || undefined,
        permissao: undefined,
        salario: req.body.salario || undefined,
        email: req.body.email || undefined,
        senha: undefined,
        endereco: req.body.endereco || undefined,
        estado: req.body.estado || undefined,
        municipio: req.body.municipio || undefined,
        nome: req.body.nome || undefined,
        telefone: req.body.telefone || undefined,
        tipo: undefined,
        cep: req.body.cep || undefined,
        telefone_trabalho: req.body.telefone_trabalho || undefined,
      };
    } else if (req.params.tipo === "desligamento") {
      data = {
        email: req.body.email || undefined,
        cpf: req.body.cpf || undefined,
        permissao: "blocked",
        salario: req.body.salario || undefined,
        email: req.body.email || undefined,
        senha: undefined,
        endereco: req.body.endereco || undefined,
        estado: req.body.estado || undefined,
        municipio: req.body.municipio || undefined,
        nome: req.body.nome || undefined,
        telefone: req.body.telefone || undefined,
        tipo: undefined,
        cep: req.body.cep || undefined,
        telefone_trabalho: req.body.telefone_trabalho || undefined,
        deletedAt: new Date(),
      };
    } else {
      const msg = { status: "erro", tipo: "operacao invalida" };
      res.status(400).send(msg);
      return msg;
    }

    const funcionario = await changeFuncionarioByEmail(
      req.params.tipo,
      req.params.email,
      data
    );
    if (funcionario != null) {
      res.status(200).send({ status: "updated", funcionario });
      return { status: "updated", funcionario };
    } else {
      return { status: "erro", undefined };
    }
  } catch (error) {
    console.log(error);
    return { status: "erro", undefined };
  }
};

const deleteFuncionarioByEmail = async (req, res) => {
  try {
    let data = {};
    data = {
      email: req.body.email || undefined,
      cpf: req.body.cpf || undefined,
      permissao: "blocked",
      salario: req.body.salario || undefined,
      email: req.body.email || undefined,
      senha: undefined,
      endereco: req.body.endereco || undefined,
      estado: req.body.estado || undefined,
      municipio: req.body.municipio || undefined,
      nome: req.body.nome || undefined,
      telefone: req.body.telefone || undefined,
      tipo: undefined,
      cep: req.body.cep || undefined,
      telefone_trabalho: req.body.telefone_trabalho || undefined,
      deletedAt: new Date(),
    };
    const resp = await eraserFuncionarioByEmail(req.params.email, data);
    if (resp != null) {
      if (resp.funcionario != null) {
        const msg = { status: "deletado", funcionario: resp.funcionario };
        res.status(200).send(msg);
        return msg;
      } else {
        const msg = { status: "erro", message: "funcionário já deletado" };
        res.status(200).send(msg);
        return msg;
      }
    }
  } catch (error) {
    console.log(error);
    const msg = { status: "erro", message: "erro ao deltar funcionário" };
    res.status(400).send(msg);
    return msg;
  }
};

module.exports = {
  singIn,
  createFuncionario,
  deleteFuncionarioByEmail,
  getFuncionarioByEmail,
  updateFuncionarioByEmail,
  createDiretor,
  createGerente,
  createVendedor,
};
