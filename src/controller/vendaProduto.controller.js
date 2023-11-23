const { createVendaProduto } = require("../repository/vendaProduto.repository");

const vendaProdutoController = {};

vendaProdutoController.createVendaProduto = async (req, res) => {
  const data = {
    id_produto: req.body.id_produto,
    id_venda: req.body.id_venda,
  };
  try {
    const resp = await createVendaProduto(data);
    if (resp.vendaProduto) {
      res.status(200).send(resp);
    } else {
      res.status(400).send(resp);
    }
  } catch (error) {
    const msg = { status: "erro", vendaProduto: null };
    res.status(400).send(msg);
    return msg;
  }
};

module.exports = vendaProdutoController;
