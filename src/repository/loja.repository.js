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
    return { status: "encontrado", loja };
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

lojaRepository.updateLojaByName = async (data) => {};

module.exports = lojaRepository;
