const prisma = require("../services/prisma");

const produtoRepository = {};

produtoRepository.createProduto = async (data) => {
  try {
    const produto = await prisma.produto.create({ data });
    return produto;
  } catch (error) {
    console.log(error);
    return null;
  }
};

produtoRepository.getProdutoById = async (id) => {
  try {
    const produto = await prisma.produto.findUnique({ where: { id } });
    return produto;
  } catch {
    console.log(error);
    return null;
  }
};

module.exports = produtoRepository;
