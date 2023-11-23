const {
  addLoja,
  getLojaByName,
  getLojas,
  updateLojaByName,
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

lojaController.updateLojaByName = async (req, res) => {
  try {
    let data = {};
    data = {
      nome: req.body.nome || undefined,
      endereco: req.body.endereco || undefined,
      cep: req.body.cep || undefined,
      municipio: req.body.municipio || undefined,
      estado: req.body.estado || undefined,
      id_diretor: undefined,
      telefone: req.body.telefone || undefined,
    };
    const resp = await updateLojaByName(req.params.tipo, req.params.nome, data);
    if (resp.loja != null) {
      res.status(200).send(resp);
      return resp;
    } else {
      if (resp.tipo != null) {
        res.status(200).send(resp);
        return resp;
      } else {
        res.status(400).send(resp);
        return resp;
      }
    }
  } catch (erro) {
    const msg = { status: "erro" };
    res.status(400).send(msg);
    return msg;
  }
};

module.exports = lojaController;
