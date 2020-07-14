const express = require('express');
const { getProducts, getProduct, createProduct } = require('../controllers/products');

// Model
const Product = require('../models/product');

// Include other resources
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(advancedResults(Product), getProducts)
  .post(protect, authorize('publisher', 'admin'), createProduct);

router.route('/:id')
  .get(getProduct);

module.exports = router;