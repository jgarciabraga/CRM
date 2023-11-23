const prisma = require("../services/prisma");

const vendaProdutoRepository = {};

vendaProdutoRepository.createVendaProduto = async (data) => {
  try {
    const vendaProduto = await prisma.vendaProduto.create({ data });
    if (vendaProduto) {
      return { status: "criado", vendaProduto };
    }
    return { status: "erro", vendaProduto: null };
  } catch (erro) {
    console.log(erro);
    return { status: "erro", vendaProduto: null };
  }
};

module.exports = vendaProdutoRepository;
