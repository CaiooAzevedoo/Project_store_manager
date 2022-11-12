const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const productsList = async (_req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getByIdProducts(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const postProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.insertProduct(name);

  // if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(product);
};

module.exports = {
  productsList,
  getProduct,
  postProduct,
};
