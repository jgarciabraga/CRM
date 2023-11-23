const prisma = require("../services/prisma");

const funcionarioRepository = {};

funcionarioRepository.login = async (email) => {
  try {
    if (verificaFuncionarioOn(email)) {
      const funcionario = await prisma.funcionario.findUnique({
        where: { email },
      });
      return funcionario;
    }
    return null;
  } catch (erro) {
    console.log(erro);
    return null;
  }
};

funcionarioRepository.addFuncionario = async (data) => {
  try {
    const funcionario = await prisma.funcionario.create({ data });
    return funcionario;
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

funcionarioRepository.changeFuncionarioByEmail = async (tipo, email, data) => {
  if (verificaFuncionarioOn(email)) {
    if (tipo === "alteracao") {
      try {
        const funcionario = prisma.funcionario.update({
          where: { email },
          data,
        });
        if (funcionario.tipo === "Diretor") {
          if (data.telefone_trabalho) {
            const diretor = prisma.diretor.update({
              where: { id_func: Number(diretor.id) },
              data: {
                telefone_trabalho: data.telefone_trabalho,
                id_func: undefined,
              },
            });
            funcionario.telefone_trabalho = diretor.telefone_trabalho;
          }
        } else if (funcionario.tipo === "Gerente") {
          if (data.telefone_trabalho) {
            const gerente = prisma.gerente.update({
              where: { id_func: Number(gerente.id) },
              data: {
                telefone_trabalho: data.telefone_trabalho,
                id_loja: undefined,
              },
            });
            funcionario.telefone_trabalho = gerente.telefone_trabalho;
          }
        } else {
          return funcionario;
        }
        return funcionario;
      } catch (error) {
        return null;
      }
    } else if (tipo === "desligamento") {
      if (data.data_desligamento) {
        try {
          const funcionario = prisma.funcionario.update({
            where: { email },
            data,
          });
          if (funcionario.tipo === "Diretor") {
            const diretor = prisma.diretor.update({
              where: { id_func: Number(funcionario.id) },
              data,
            });
            funcionario.data_desligamento = data_desligamento;
          } else if (funcionario.tipo === "Gerente") {
            const gerente = prisma.gerente.update({
              where: { id_func: Number(funcionario.id) },
              data,
            });
            funcionario.data_desligamento = data_desligamento;
          } else {
            const vendedor = prisma.vendedor.update({
              where: { id_func: Number(funcionario.id) },
              data,
            });
            funcionario.data_desligamento = data_desligamento;
          }
          return funcionario;
        } catch (error) {
          console.log(error);
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

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

funcionarioRepository.eraserFuncionarioByEmail = async (email, data) => {
  if (await verificaFuncionarioOn(email)) {
    if (data.deletedAt) {
      try {
        const funcionario = await prisma.funcionario.update({
          where: { email },
          data,
        });
        if (funcionario.tipo === "Diretor") {
          const diretor = await prisma.diretor.update({
            where: { id_func: Number(funcionario.id) },
            data: {
              deletedAt: data.deletedAt,
              telefone_trabalho: undefined,
            },
          });
          funcionario.data_desligamento = diretor.deletedAt;
        } else if (funcionario.tipo === "Gerente") {
          const gerente = await prisma.gerente.update({
            where: { id_func: Number(funcionario.id) },
            data: {
              deletedAt: data.deletedAt,
              telefone_trabalho: undefined,
              id_loja: undefined,
            },
          });
          funcionario.data_desligamento = gerente.deletedAt;
        } else {
          const vendedor = await prisma.vendedor.update({
            where: { id_func: Number(funcionario.id) },
            data: { deletedAt: data.deletedAt },
          });
          funcionario.data_desligamento = vendedor.deletedAt;
        }
        return { status: "deletado", funcionario };
      } catch (error) {
        console.log(error);
        return null;
      }
    } else {
      return null;
    }
  } else {
    return { status: "deletado", funcionario: null };
  }
};

async function verificaFuncionarioOn(email) {
  try {
    const funcionario = await prisma.funcionario.findUnique({
      where: { email },
    });
    if (funcionario.deletedAt === null) {
      return true;
    } else {
      if (funcionario.tipo === "Diretor") {
        const diretor = await prisma.diretor.findUnique({
          where: { id_func: Number(funcionario.id) },
        });
        if (diretor.deletedAt != funcionario.deletedAt) {
          await prisma.diretor.update({
            where: { id: Number(diretor.id) },
            data: { deletedAt: funcionario.deletedAt },
          });
        }
      } else if (funcionario.tipo === "Gerente") {
        const gerente = await prisma.gerente.findUnique({
          where: { id_func: Number(funcionario.id) },
        });
        if (gerente.deletedAt != funcionario.deletedAt) {
          await prisma.gerente.update({
            where: { id: gerente.id },
            data: { deletedAt: funcionario.deletedAt },
          });
        }
      } else {
        const vendedor = await prisma.vendedor.findUnique({
          where: { id_func: Number(funcionario.id) },
        });
        if (vendedor.deletedAt != funcionario.deletedAt) {
          await prisma.vendedor.update({
            where: { id: vendedor.id },
            data: { deletedAt: funcionario.deletedAt },
          });
        }
      }
      return false;
    }
  } catch (error) {
    return false;
  }
}

module.exports = funcionarioRepository;
