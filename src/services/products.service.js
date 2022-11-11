const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (productId) => {
  const product = await productsModel.getById(productId);

  return product;
};

module.exports = {
  getAll,
  getById,
};
