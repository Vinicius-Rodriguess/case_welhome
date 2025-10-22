import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const getAll = async () => {
  return await prisma.imovel.findMany();
};

export const create = async (data) => {
  return await prisma.imovel.create({
    data: {
      title: data.title,
      address: data.address,
      status: data.status || "active",
    },
  });
};

export const update = async (id, data) => {
  return await prisma.imovel.update({
    where: { id },
    data,
  });
};

export const remove = async (id) => {
  return await prisma.imovel.delete({
    where: { id },
  });
};
