const prisma = require("../services/prisma");

const funcionarioRepository = {};

funcionarioRepository.addFuncionario = async (data) => {
  try {
    const funcionario = await prisma.funcionario.create({ data });
    return funcionario;
  } catch (error) {
    console.log(error);
    return null;
  }
};

funcionarioRepository.eraserFuncionarioById = async (id) => {
  try {
    console.log(id);
    const result = await prisma.funcionario.delete({ where: { id } });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

funcionarioRepository.addDiretor = async (data) => {
  try {
    const diretor = await prisma.diretor.create({ data });
    return diretor;
  } catch (error) {
    console.log(error);
    return null;
  }
};

funcionarioRepository.addGerente = async (data) => {
  try {
    const gerente = await prisma.gerente.create({ data });
    return gerente;
  } catch (error) {
    console.log(error);
    return null;
  }
};

funcionarioRepository.addVendedor = async (data) => {
  try {
    const vendedor = await prisma.vendedor.create({ data });
    return vendedor;
  } catch (error) {
    console.log(error);
    return null;
  }
};

funcionarioRepository.changeFuncionarioByEmail = async (email, data) => {};

funcionarioRepository.selectFuncionarioByEmail = async (email) => {
  try {
    const funcionario = await prisma.funcionario.findUnique({
      where: { email },
    });
    if (funcionario != null) {
      const deletado = funcionario.deletedAt;
      if (deletado == null) {
        funcionario.senha = undefined;
        const id_func = Number(funcionario.id);
        if (funcionario.tipo === "Diretor") {
          const diretor = await prisma.diretor.findUnique({
            where: { id_func },
          });
          const id_diretor = diretor.id;
          funcionario.telefone_trabalho = diretor.telefone_trabalho;
          const lojas = await prisma.loja.findMany({ where: { id_diretor } });
          funcionario.lojas = lojas;
        } else if (funcionario.tipo === "Gerente") {
          const gerente = await prisma.gerente.findUnique({
            where: { id_func },
          });
          funcionario.telefone_trabalho = gerente.telefone_trabalho;
          const id_loja = Number(gerente.id_loja);
          const loja = await prisma.loja.findUnique({ where: { id: id_loja } });
          funcionario.lojas = loja;
        } else {
          const vendedor = await prisma.vendedor.findUnique({
            where: { id_func },
          });
          const id_loja = Number(vendedor.id_loja);
          const loja = await prisma.loja.findUnique({ where: { id: id_loja } });
          funcionario.loja = loja;
        }
        return { status: "ativo", funcionario };
      } else {
        return { status: "deletado", funcionario };
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = funcionarioRepository;
