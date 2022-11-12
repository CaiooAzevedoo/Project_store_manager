const express = require('express');
const productsController = require('../controllers/products.controller');
const validateProducts = require('../middlewares/validateProducts');

const router = express.Router();

router.get('/', productsController.productsList);
router.get('/:id', productsController.getProduct);
router.post('/', validateProducts.fildNameValidate, productsController.postProduct);

module.exports = router;
