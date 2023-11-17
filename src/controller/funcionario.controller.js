const {
  addFuncionario,
  eraserFuncionarioById,
  selectFuncionarioByEmail,
  addDiretor,
  addGerente,
  addVendedor,
} = require("../repository/funcionario.repository");
const bcrypt = require("bcrypt");
const { funcionario } = require("../services/prisma");

async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, 10);
  return hash;
}

async function comparePassword(plainPassword, hash) {
  const result = await bcrypt.compare(plainPassword, hash);
  return result;
}

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

const deleteFuncionarioById = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await eraserFuncionarioById(Number(req.params.id));
    if (result) {
      console.log(result);
      const msg = { status: "sucesso ao deletar funcionario" };
      res.status(200).send(msg);
      return result;
    } else {
      const msg = { status: "erro ao deletar funcionario" };
      res.status(400).send(msg);
      return result;
    }
  } catch (error) {
    const msg = { status: "erro ao deletar funcionario" };
    console.log(error);
    return result;
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

module.exports = {
  createFuncionario,
  deleteFuncionarioById,
  getFuncionarioByEmail,
  createDiretor,
  createGerente,
  createVendedor,
};
