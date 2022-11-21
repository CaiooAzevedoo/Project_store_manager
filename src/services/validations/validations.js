// const checkSale = Joi.object({
//   name: Joi.number().min(1).required(),
// })
//   .required()
//   .messages({
//     'any.require': '{#label} is required',
//     'number.min': 'Sale not found',
//   });

// const saleIdValidate = async (id) => {
//   const checkId = await salesModel.getById(id);
//   if (checkId.length < 1) return false;
//   return true;
//   const { error } = checkSale.validate({ id });

//   if (error !== undefined) {
//     return error.details[0].type === 'any.required'
//       ? res.status(400).send({ message: error.details[0].message })
//       : res.status(422).send({ message: error.details[0].message });
//   }
//   return next();
// };

// function saleIdValidate(req, res, next) {
//   const { id } = req.params;
//   if (!id) {
//     return res.status(404).json({
//       message: 'Sale not found',
//     });
//   }
//   if (id.length === 0) {
//     return res.status(404).json({
//       message: 'Sale not found',
//     });
//   }
//   return next();
// }

// module.exports = {
//   saleIdValidate,
// };
