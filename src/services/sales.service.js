const salesModel = require('../models/sales.model');

const insertSale = async (sale) => {
  const newSaleId = await salesModel.addNewSale(sale);
  if (!newSaleId) {
    return { type: 'SALE_INVALID', message: 'Product not found' };
  }

  return { type: null, id: newSaleId, itemsSold: sale };
};

module.exports = {
  insertSale,
};
