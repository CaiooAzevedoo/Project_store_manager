const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getByIdProducts = async (productId) => {
  const product = await productsModel.getById(productId);
  if (!product) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }

  return { type: null, message: product };
};
// const getAll = async () => {
//   const products = await productsModel.getAll();
//   return products;
// };

// const getById = async (productId) => {
//   const product = await productsModel.getById(productId);
//   if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

//   return { type: null, message: product };
// };

module.exports = {
  getAllProducts,
  getByIdProducts,
};
