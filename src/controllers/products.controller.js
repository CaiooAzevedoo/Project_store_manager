const { productsService } = require('../services/index');
const errorMap = require('../utils/errorMap');

const productsList = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  productsList,
  getProduct,
};
