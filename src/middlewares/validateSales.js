// const productsService = require('../services/products.service');
const productsModel = require('../models/products.model');
// const Joi = require('joi');

// const checkQuantity = Joi.object({
//   quantity: Joi.number().min(1).integer().required(),
// })
//   .required()
//   .messages({
//     'quantity.require': '{#label} is required', // 400
//     'number.min': '{#label} must be greater than or equal to 1', // 422
//   });

// const quantityValidate = (req, res, next) => {
//   const { quantity } = req.body;
//   const { error } = checkQuantity.validate({ quantity });

//   if (error !== undefined) {
//     return error.details[0].type === 'quantity.required'
//       ? res.status(400).send({ message: error.details[0].message })
//       : res.status(422).send({ message: error.details[0].message });
//   }
//   return next();
// };

// const checkSale = Joi.object({
//   productId: Joi.string().required(),
// })
//   .required()
//   .messages({
//     'productId.require': '{#label} is required', // 400
//   });

// const productIdValidate = (req, res, next) => {
//   const { productId } = req.body;
//   const { error } = checkSale.validate({ productId });

//   if (error !== undefined) {
//     return res.status(400).send({ message: error.details[0].message });
//   }
//   return next();
// };
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

// const requiredValidate = (req, res, next) => {
//   const { productId, quantity } = req.body;
//   return requiredProductId(productId, res) || requiredQuantity(quantity, res)
//   || next();
// };

module.exports = {
  // requiredValidate,
  requiredQuantity,
  requiredProductId,
};
