const productsModel = require('../models/products.model');

const requiredProductId = async (req, res, next) => {
  const sales = req.body;
  if (sales.some(({ productId }) => !productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  const ids = await productsModel.getAllId();
  const onlyIds = ids.map(({ id }) => id);

  if (sales.some(({ productId }) => !onlyIds.includes(productId))) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return next();
};

const requiredQuantity = (req, res, next) => {
  const sales = req.body;
  if (sales.some(({ quantity }) => quantity <= 0)) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (sales.some(({ quantity }) => !quantity)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  return next();
};

module.exports = {
  requiredQuantity,
  requiredProductId,
};
