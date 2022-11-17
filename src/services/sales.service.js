const salesModel = require('../models/sales.model');

const insertSale = async (sales) => {
  const newSaleId = await salesModel.addNewSale(sales);
  if (!newSaleId) {
    return { type: 'SALE_INVALID', message: 'Product not found' };
  }

  return { type: null, id: newSaleId, itemsSold: sales };
};

module.exports = {
  insertSale,
};
