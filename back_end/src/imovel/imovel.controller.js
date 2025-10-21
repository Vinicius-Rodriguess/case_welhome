// src/imovel/imovel.controller.js
import * as ImovelService from "./imovel.service.js";

export const getAll = async (req, res) => {
  try {
    const imoveis = await ImovelService.getAll();
    res.json(imoveis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching properties" });
  }
};

export const create = async (req, res) => {
  try {
    const { title, address, status } = req.body;
    const imovel = await ImovelService.create({ title, address, status });
    res.status(201).json(imovel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating property" });
  }
};

export const update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, address, status } = req.body;
    const imovel = await ImovelService.update(id, { title, address, status });
    res.json(imovel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating property" });
  }
};

export const remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await ImovelService.remove(id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting property" });
  }
};
