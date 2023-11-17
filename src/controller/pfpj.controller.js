const {
  addPfPj,
  addClientePf,
  addClientePj,
} = require("../repository/pfpj.repository");

const createClientePf = async (req, res) => {
  const data = req.body;
  const data_pfpj = {
    tipo: data.tipo,
  };
  try {
    const pfpj = await addPfPj(data_pfpj);
    if (pfpj != null) {
      const data_clientePf = {
        id_pfpj: pfpj.id,
        cpf: data.cpf,
        nome: data.nome,
        email: data.email,
        endereco: data.endereco,
        municipio: data.municipio,
        estado: data.estado,
        telefone: data.telefone,
      };
      try {
        const clientePf = await addClientePf(data_clientePf);
        if (clientePf != null) {
          res.status(200).send(clientePf);
          return { status: "sucesso ao inserir Cliente PF" };
        } else {
          const msg = { status: "erro ao inserir Cliente PF" };
          res.status(400).send(msg);
          return msg;
        }
      } catch (error) {
        const msg = { status: "erro ao inserir Cliente PF" };
        res.status(400).send(error);
        return msg;
      }
    } else {
      const msg = { status: "erro ao inserir Cliente PF" };
      res.status(400).send(error);
      return msg;
    }
  } catch (error) {
    const msg = { status: "erro ao inserir Cliente PF" };
    res.status(400).send(error);
    return msg;
  }
};

module.exports = {
  createClientePf,
};
