const { productsService } = require('../services/index');

const producsList = async (_req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

module.exports = {
  producsList,
  getProduct,
};
