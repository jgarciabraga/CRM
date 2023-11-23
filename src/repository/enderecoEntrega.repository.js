const prisma = require("../services/prisma");

const enederecoEntregaRepository = {};

enederecoEntregaRepository.createEderecoEntrega = async (data) => {
  try {
    console.log(data);
    const endEntrega = await prisma.enderecoEntrega.create({ data });
    if (endEntrega) {
      return { status: "criado", endEntrega };
    }
    return { status: "erro", endEntrega: null };
  } catch (erro) {
    console.log(erro);
    return { status: "erro", endEntrega: null };
  }
};

module.exports = enederecoEntregaRepository;
