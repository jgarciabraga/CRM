const {
  addPfPj,
  addClientePf,
  addClientePj,
  getClienteByDocument,
  getClientes,
  updateClienteByDocument,
} = require("../repository/pfpj.repository");

const pfpjController = {};

pfpjController.createClientePf = async (req, res) => {
  const data = req.body;
  const data_pfpj = {
    tipo_cliente: data.tipo_cliente,
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
        cep: data.cep,
      };
      try {
        const clientePf = await addClientePf(data_clientePf);
        console.log(clientePf);
        if (clientePf != null) {
          const msg = { status: "sucesso", clientePf };
          res.status(200).send(msg);
          return msg;
        } else {
          const msg = { status: "erro", clientePf: undefined };
          res.status(400).send(msg);
          return msg;
        }
      } catch (error) {
        const msg = { status: "erro", clientePf: undefined };
        res.status(400).send(msg);
        return msg;
      }
    } else {
      const msg = { status: "erro", clientePf: undefined };
      res.status(400).send(msg);
      return msg;
    }
  } catch (error) {
    const msg = { status: "erro", clientePf: undefined };
    res.status(400).send(msg);
    return msg;
  }
};

pfpjController.createClientePj = async (req, res) => {
  const data = req.body;
  const data_pfpj = {
    tipo_cliente: data.tipo_cliente,
  };
  try {
    const pfpj = await addPfPj(data_pfpj);
    if (pfpj != null) {
      const data_clientePj = {
        id_pfpj: pfpj.id,
        cnpj: data.cnpj,
        nome: data.nome,
        nome_fantasia: data.nome_fantasia,
        nome_contato: data.nome_contato,
        email: data.email,
        endereco: data.endereco,
        cep: data.cep,
        municipio: data.municipio,
        estado: data.estado,
        telefone: data.telefone,
      };
      try {
        const clientePj = await addClientePj(data_clientePj);
        if (clientePj != null) {
          const msg = { status: "sucesso", clientePj };
          res.status(200).send(msg);
          return msg;
        } else {
          const msg = { status: "erro", clientePj: undefined };
          res.status(400).send(msg);
          return msg;
        }
      } catch (error) {
        const msg = { status: "erro", clientePj: undefined };
        res.status(400).send(msg);
        return msg;
      }
    } else {
      const msg = { status: "erro", clientePj: undefined };
      res.status(400).send(msg);
      return msg;
    }
  } catch (error) {
    const msg = { status: "erro", clientePj: undefined };
    res.status(400).send(msg);
    return msg;
  }
};

pfpjController.getClienteByDocument = async (req, res) => {
  try {
    const tipo = req.params.tipo;
    const document = req.params.document;
    const resp = await getClienteByDocument(tipo, document);
    if (resp.status === "encontrado") {
      const msg = { status: resp.status, cliente: resp.cliente };
      res.status(200).send(msg);
      return msg;
    } else if (resp.status === "deletado") {
      const msg = { staus: resp.status, cliente: resp.cliente };
      res.status(200).send(msg);
      return msg;
    } else {
      const msg = { status: "erro", cliente: null };
      res.status(400).send(msg);
      return msg;
    }
  } catch (erro) {
    const msg = { status: "erro", cliente: null };
    res.status(400).send(msg);
    return msg;
  }
};

pfpjController.getClientes = async (req, res) => {
  try {
    const tipo = req.params.tipo;
    const resp = await getClientes(tipo);
    if (resp.status === "encontrado") {
      res.status(200).send(resp);
      return resp;
    }
    res.status(400).send(resp);
    return resp;
  } catch (erro) {
    const msg = { status: "erro", cliente: null };
    res.status(400).send(msg);
    return msg;
  }
};

pfpjController.updateClienteByDocument = async (req, res) => {
  try {
    const tipo = req.params.tipo;
    const data = req.body;

    if (tipo === "cpf") {
      let data_pf = {
        cpf: data.cpf | undefined,
        tipo_cliente: undefined,
        email: data.email | undefined,
        cep: data.cep | undefined,
        endereco: data.endereco | undefined,
        estado: data.estado | undefined,
        municipio: data.municipio | undefined,
        nome: data.nome | undefined,
        telefone: data.telefone | undefined,
      };
      const resp = await updateClienteByDocument(tipo, data_pf);
      if (resp.status === "atualizado") {
        res.status(200).send(resp);
        return resp;
      }
      res.status(400).send(resp);
      return resp;
    } else if (tipo === "cnpj") {
      let data_pj = {
        cnpj: data.cnpj | undefined,
        tipo_cliente: undefined,
        email: data.email | undefined,
        cep: data.cep | undefined,
        endereco: data.endereco | undefined,
        estado: data.estado | undefined,
        municipio: data.municipio | undefined,
        nome_contato: data.nome_contato | undefined,
        nome: data.nome_fantasia | undefined,
        nome_fantasia: data.nome_fantasia | undefined,
        telefone: data.telefone | undefined,
      };
      const resp = await updateClienteByDocument(tipo, data_pj);
      if (resp.status === "atualizado") {
        res.status(200).send(resp);
        return resp;
      }
      res.status(400).send(resp);
      return resp;
    }
  } catch (erro) {
    const msg = { status: "erro", cliente: undefined };
    res.status(400).send(msg);
    return msg;
  }
};

module.exports = pfpjController;
