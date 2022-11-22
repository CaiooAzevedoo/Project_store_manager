const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSales = require('../middlewares/validateSales');
const validateProducts = require('../middlewares/validateProducts');

const router = express.Router();

router.get(
  '/',
  salesController.getListSales,
);
router.get(
  '/:id',
  salesController.getSale,
);
router.post(
  '/',
  validateSales.requiredQuantity,
  validateSales.requiredProductId,
  salesController.postSale,
);
router.delete(
  '/:id',
  salesController.deleteSale,
);
router.put(
  '/id',
  validateProducts.fildNameValidate,
  salesController.updateSale,
);

module.exports = router;
