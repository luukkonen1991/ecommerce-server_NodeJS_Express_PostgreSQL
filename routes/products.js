const express = require('express');
const { getProducts, getProduct, createProduct } = require('../controllers/products');

// Model
const Product = require('../models/product');

// Include other resources
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/')
  .get(advancedResults(Product), getProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProduct);

module.exports = router;