const {
  getProdutoById,
  createProduto,
  getProdutos,
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

produtoController.getProdutos = async (req, res) => {
  try {
    const resp = await getProdutos();
    if (resp.produtos) {
      res.status(200).send(resp);
      return resp;
    }
    res.status(400).send(resp);
    return resp;
  } catch (error) {
    const msg = { status: "erro", produtos: null };
    res.status(400).send(msg);
    return msg;
  }
};

module.exports = produtoController;
