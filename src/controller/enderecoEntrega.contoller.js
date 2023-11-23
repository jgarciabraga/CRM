const {
  createEderecoEntrega,
} = require("../repository/enderecoEntrega.repository");

const enderecoEntregaController = {};

enderecoEntregaController.createEderecoEntrega = async (req, res) => {
  let data = {};
  data = {
    id_cliente: req.body.id_cliente,
    cep: req.body.cep,
    endereco: req.body.endereco,
    estado: req.body.estado,
    municipio: req.body.municipio,
    telefone: req.body.telefone,
  };
  try {
    const resp = await createEderecoEntrega(data);
    if (resp) {
      res.status(200).send(resp);
      return resp;
    } else {
      res.status(400).send(resp);
      return resp;
    }
  } catch (erro) {
    const msg = { status: "erro", endEntrega: null };
    res.status(200).send(msg);
    return msg;
  }
};

module.exports = enderecoEntregaController;
