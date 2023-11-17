const { addLoja } = require("../repository/loja.repository");

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

module.exports = lojaController;
