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

const getByIdSales = async (saleId) => {
  const sale = await salesModel.getById(saleId);
   if (!sale || sale.length === 0) {
     return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
   }

   return { type: null, message: sale };
};

const deleteByIdSale = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  const saleDelete = await salesModel.deleteSale(saleId);
  if (!sale || sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: saleDelete };
};

module.exports = {
  insertSale,
  getAllSales,
  getByIdSales,
  deleteByIdSale,
};
