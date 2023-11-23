const prisma = require("../services/prisma");

const pfpjRepository = {};

pfpjRepository.addPfPj = async (data) => {
  try {
    const pfpj = await prisma.pfPj.create({ data });
    return pfpj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

pfpjRepository.addClientePf = async (data) => {
  try {
    console.log(data);
    const clientePf = await prisma.clientePF.create({ data });
    return clientePf;
  } catch (error) {
    console.log(error);
    return null;
  }
};

pfpjRepository.addClientePj = async (data) => {
  console.log(data);
  try {
    const clientePj = await prisma.clientePJ.create({ data });
    return clientePj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

pfpjRepository.getClienteByDocument = async (tipo, document) => {
  try {
    const controle = await checkClienteIsOn(tipo, document);
    if (controle.check) {
      if (tipo === "cnpj") {
        let clientePj = await prisma.clientePJ.findUnique({
          where: { cnpj: document },
        });
        if (clientePj) {
          const pfPj = await prisma.pfPj.findUnique({
            where: { id: clientePj.id_pfpj },
          });
          if (pfPj) {
            clientePj.tipo_cliente = pfPj.tipo_cliente;
            if (controle.status === "on") {
              return { status: "encontrado", cliente: clientePj };
            } else if (controle.status == "off") {
              return { status: "deletado", cliente: clientePj };
            } else {
              return { status: "erro", cliente: null };
            }
          } else {
            return { status: "erro", cliente: null };
          }
        } else {
          return { status: "erro", cliente: null };
        }
      } else if (tipo === "cpf") {
        let clientePf = await prisma.clientePF.findUnique({
          where: { cpf: document },
        });
        if (clientePf) {
          const pfPj = await prisma.pfPj.findUnique({
            where: { id: clientePf.id_pfpj },
          });
          if (pfPj) {
            clientePf.tipo_cliente = pfPj.tipo_cliente;
            if (controle.status === "on") {
              return { status: "encontrado", cliente: clientePf };
            } else if (controle.status == "off") {
              return { status: "deletado", cliente: clientePf };
            }
          } else {
            return { status: "erro", cliente: null };
          }
        } else {
          return { status: "erro", cliente: null };
        }
      } else {
        return { status: "erro", cliente: null };
      }
    }
  } catch (error) {
    return { status: "erro", cliente: null };
  }
};

pfpjRepository.getClientes = async (tipo) => {
  try {
    if (tipo === "pf") {
      const clientes = await prisma.clientePF.findMany({
        where: { deletedAt: null },
      });
      if (clientes) {
        return { status: "encontrado", clientes };
      } else {
        return { status: "erro", clientes: null };
      }
    } else if (tipo === "pj") {
      const clientes = await prisma.clientePJ.findMany({
        where: { deletedAt: null },
      });
      if (clientes) {
        return { status: "encontrado", clientes };
      } else {
        return { status: "erro", clientes: null };
      }
    } else {
      return { status: "erro", clientes: null };
    }
  } catch (error) {
    return { status: "erro", clientes: null };
  }
};

pfpjRepository.updateClienteByDocument = async (tipo, document, data) => {
  try {
    const resp = await checkClienteIsOn(tipo, document);
    if (resp.status === "on") {
      if (tipo === "cnpj") {
        const cliente = await prisma.clientePJ.update({
          where: { cnpj: document },
          data,
        });
        if (cliente) {
          await prisma.pfPj.update({
            where: { id: cliente.id_pfpj },
            tipo_cliente: "PJ",
          });
          return { status: "atualizado", cliente };
        }
        return { status: "erro", cliente: null };
      } else if (tipo === "cpf") {
        const cliente = await prisma.clientePF.update({
          where: { cpf: document },
          data,
        });
        if (cliente) {
          await prisma.pfPj.update({
            where: { id: cliente.id_pfpj },
            tipo_cliente: "PF",
          });
          return { status: "atualizado", cliente };
        }
        return { status: "erro", cliente: null };
      }
    }
    return { status: "erro", cliente: null };
  } catch (error) {
    return { status: "erro", cliente: null };
  }
};

async function checkClienteIsOn(tipo, document) {
  try {
    if (tipo === "cnpj") {
      const clientePJ = await prisma.clientePJ.findUnique({
        where: { cnpj: document },
      });
      if (clientePJ) {
        if (clientePJ.deletedAt == null) {
          return { status: "on", check: true };
        } else {
          return { status: "off", check: true };
        }
      } else {
        return { status: "none", check: false };
      }
    } else if (tipo === "cpf") {
      const clientePF = await prisma.clientePF.findUnique({
        where: { cpf: document },
      });
      if (clientePF) {
        if (clientePF.deletedAt == null) {
          return { status: "on", check: true };
        } else {
          return { status: "off", check: true };
        }
      } else {
        return { status: "none", check: false };
      }
    }
  } catch (error) {
    return { status: "none", check: false };
  }
}

module.exports = pfpjRepository;
