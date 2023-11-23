const { createVenda } = require("../repository/venda.repository");

const vendaController = {};

vendaController.createVenda = async (req, res) => {
  const data = {
    id_vendedor: req.body.id_vendedor,
    id_cliente: req.body.id_cliente,
    id_endereco_entrega: req.body.id_endereco_entrega,
    total: req.body.total,
  };
  try {
    const resp = await createVenda(data);
    if (resp.venda) {
      res.status(200).send(resp);
    } else {
      res.status(400).send(resp);
    }
  } catch (error) {
    const msg = { status: "erro", venda: null };
    res.status(400).send(msg);
    return msg;
  }
};

module.exports = vendaController;
