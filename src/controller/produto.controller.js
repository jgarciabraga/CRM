const {
  getProdutoById,
  createProduto,
} = require("../repository/produto.repository");

const produtoController = {};

produtoController.createProduto = async (req, res) => {
  try {
    produto = await createProduto(req.body);
    if (produto) {
      res.status(200).send(produto);
    } else {
      res.status(400).send({ erro: "Insercao de produto no banco de dados" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ erro: "Insercao de produto no banco de dados" });
  }
};

produtoController.getProdutoById = async (req, res) => {
  try {
    const produto = await getProdutoById(Number(req.params.id));
    if (produto) {
      res.status(200).send(produto);
    } else {
      res.status(400).send({ erro: "Erro ao buscar produto no campo" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = produtoController;
