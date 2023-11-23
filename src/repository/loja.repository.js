const prisma = require("../services/prisma");

const lojaRepository = {};

lojaRepository.addLoja = async (data) => {
  try {
    const loja = await prisma.loja.create({ data });
    return loja;
  } catch (error) {
    console.log(error);
    return null;
  }
};

lojaRepository.getLojaByName = async (nome) => {
  try {
    const loja = await prisma.loja.findUnique({ where: { nome } });
    if (loja.deletedAt === null) {
      return { status: "encontrado", loja };
    } else {
      return { status: "deletado", loja };
    }
  } catch (error) {
    console.log(error);
    return { status: "erro", loja: null };
  }
};

lojaRepository.getLojas = async () => {
  try {
    const lojas = await prisma.loja.findMany({ where: { deletedAt: null } });
    return { status: "encontrado", lojas };
  } catch (error) {
    console.log(error);
    return { status: "erro", lojas: null };
  }
};

lojaRepository.updateLojaByName = async (tipo, nome, data) => {
  try {
    if (checkLojaOn(nome)) {
      if (tipo === "alteracao") {
        console.log(nome);
        console.log(data);
        const loja = await prisma.loja.update({ where: { nome }, data });
        return { status: "atualizado", loja };
      } else if (tipo === "remocao") {
        data.deletedAt = new Date();
        const loja = await prisma.loja.update({ where: { nome }, data });
        return { status: "removido", loja };
      } else {
        return { status: "erro", tipo: "requisição inexistente", loja: null };
      }
    } else {
      return { status: "erro", tipo: "loja já removida", loja: null };
    }
  } catch (error) {
    console.log(error);
    return { status: "erro", tipo: null, loja: null };
  }
};

async function checkLojaOn(nome) {
  try {
    const loja = await prisma.loja.findUnique({ where: { nome } });
    if (loja.deletedAt === null) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return { status: "erro", lojas: null };
  }
}

module.exports = lojaRepository;
