const salesModel = require('../models/sales.model');
// const validateSales = require('../middlewares/validateSales');

const insertSale = async (sales) => {
  const newSaleId = await salesModel.addNewSale(sales);
  if (!newSaleId) {
    return { type: 'SALE_INVALID', message: 'Product not found' };
  }

  return { type: null, id: newSaleId, itemsSold: sales };
};

const getAllsales = async () => {
  const sales = await salesModel.getAll();
  //  if (!sale) {
  //    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  //  }
  // return { type: null, message: sale };
  return sales;
};

const getByIdSales = async (productId) => {
  const sale = await salesModel.getById(productId);

   return { type: null, message: sale };
};

module.exports = {
  insertSale,
  getAllsales,
  getByIdSales,
};
