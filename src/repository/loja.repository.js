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

module.exports = lojaRepository;
