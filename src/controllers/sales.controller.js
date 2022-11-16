const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const postSale = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await salesService.insertSale(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  postSale,
};
