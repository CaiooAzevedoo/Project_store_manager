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

const insertProduct = async (productName) => {
  const newProductId = await productsModel.insert(productName);
  const newProduct = await productsModel.getAll(newProductId);

  // if (!newProductId || !newProduct) { return { type: 'INVALID_VALUE', message: 'Invalid value' }; }
  // return { type: null, message: newProduct };

  return newProduct;
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  insertProduct,
};
