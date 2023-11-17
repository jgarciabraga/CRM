const prisma = require("../services/prisma");

const pfpjRepository = {};

pfpjRepository.addPfPj = async (data) => {
  try {
    const pfpj = prisma.pfPj.create({ data });
    return pfpj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

pfpjRepository.addClientePj = async (data) => {
  try {
    const clientePj = prisma.clientePJ.create({ data });
    return clientePj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

pfpjRepository.addClientePf = async (data) => {
  try {
    const clientePf = prisma.clientePJ.create({ data });
    return clientePf;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = pfpjRepository;
