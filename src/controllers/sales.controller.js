const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const postSale = async (req, res) => {
  const newSales = req.body;
  const { type, message, id, itemsSold } = await salesService.insertSale(newSales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json({ id, itemsSold });
};

const getListSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();

  if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getByIdSales(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  postSale,
  getListSales,
  getSale,
};
