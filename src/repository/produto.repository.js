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

produtoRepository.getProdutos = async () => {
  try {
    const produtos = await prisma.produto.findMany({
      where: { deletedAt: null },
    });
    return { status: "encontrado", produtos };
  } catch {
    return { status: "erro", produtos: null };
  }
};

module.exports = produtoRepository;
