const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSales = require('../middlewares/validateSales');

const router = express.Router();

router.post(
  '/',
  validateSales.requiredQuantity,
  validateSales.requiredProductId,
  salesController.postSale,
);
router.get('/', salesController.getListSales);
router.get('/:id', salesController.getSale);

module.exports = router;
