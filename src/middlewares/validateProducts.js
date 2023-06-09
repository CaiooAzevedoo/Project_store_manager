const Joi = require('joi');

const checkProduct = Joi.object({
  name: Joi.string().min(5).required(),
})
  .required()
  .messages({
    'any.require': '{#label} is required', // 400
    'string.min': '{#label} length must be at least 5 characters long', // 422
  });

const fildNameValidate = (req, res, next) => {
  const { name } = req.body;
  const { error } = checkProduct.validate({ name });

  if (error !== undefined) {
   return error.details[0].type === 'any.required'
     ? res.status(400).send({ message: error.details[0].message })
      : res.status(422).send({ message: error.details[0].message });
  }
  return next();
};

module.exports = {
  fildNameValidate,
};
