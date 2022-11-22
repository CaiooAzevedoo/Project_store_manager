const salesModel = require('../models/sales.model');

const insertSale = async (sales) => {
  const newSaleId = await salesModel.addNewSale(sales);
  if (!newSaleId) {
    return { type: 'SALE_INVALID', message: 'Product not found' };
  }

  return { type: null, id: newSaleId, itemsSold: sales };
};

const getAllSales = async () => {
  const sales = await salesModel.getAll();
   if (!sales) {
     return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
   }
  return { type: null, message: sales };
};

const getByIdSales = async (productId) => {
  const sale = await salesModel.getById(productId);
   if (!sale || sale.length === 0) {
     return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
   }

   return { type: null, message: sale };
};

module.exports = {
  insertSale,
  getAllSales,
  getByIdSales,
};
