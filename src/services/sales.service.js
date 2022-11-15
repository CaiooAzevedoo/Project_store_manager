const salesModel = require('../models/sales.model');

const newSale = async (sale) => {
  const newSaleId = await salesModel.insertSale(sale);
  if (!newSaleId) {
    return { type: 'SALE_INVALID', message: 'Sale invalid' };
  }

  return { id: newSaleId, itemsSold: sale };
};

module.exports = {
  newSale,
};
