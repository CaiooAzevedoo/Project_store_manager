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
  const newProductId = await productsModel.addNewProduct(productName);
  const newProduct = await productsModel.getById(newProductId);
  if (!newProduct) { return { type: 'PRODUCT_NOT_FOUND', message: 'Invalid name' }; }

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, productName) => {
  const product = await productsModel.getById(productId);
  const productUpdate = await productsModel.updateProduct(productId, productName);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: productUpdate };
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  insertProduct,
  updateProduct,
};
