const prisma = require("../services/prisma");

const vendaRepository = {};

vendaRepository.createVenda = async (data) => {
  try {
    const venda = await prisma.venda.create({ data });
    if (venda) {
      return { status: "criado", venda };
    }
    return { status: "erro", venda: null };
  } catch (erro) {
    console.log(erro);
    return { status: "erro", venda: null };
  }
};

module.exports = vendaRepository;
