const {
  addLoja,
  getLojaByName,
  getLojas,
} = require("../repository/loja.repository");

const lojaController = {};

lojaController.createLoja = async (req, res) => {
  try {
    const loja = await addLoja(req.body);
    res.status(200).send(loja);
    return loja;
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "erro ao inserir loja" });
    return { status: "erro ao inserir loja" };
  }
};

lojaController.getLojaByName = async (req, res) => {
  try {
    const resp = await getLojaByName(req.params.nome);
    if (resp.status === "encontrado") {
      if (resp.loja != null) {
        const msg = { status: resp.status, loja: resp.loja };
        res.status(200).send(msg);
        return msg;
      } else {
        const msg = { status: "erro", resposta: "não encontrado" };
        res.status(400).send(msg);
        return msg;
      }
    } else {
      const msg = { status: resp.status, resposta: "não encontrado" };
      res.status(400).send(msg);
      return msg;
    }
  } catch (error) {
    const msg = { status: "erro", undefined };
    res.status(400).send(msg);
    return msg;
  }
};

lojaController.getLojas = async (req, res) => {
  try {
    const resp = await getLojas();
    if (resp.status === "encontrado") {
      const msg = { status: resp.status, lojas: resp.lojas };
      res.status(200).send(msg);
      return msg;
    } else {
      const msg = { status: "erro", undefined };
      res.status(400).send(msg);
      return msg;
    }
  } catch (erro) {
    const msg = { status: "erro", undefined };
    res.status(400).send(msg);
    return msg;
  }
};

module.exports = lojaController;
