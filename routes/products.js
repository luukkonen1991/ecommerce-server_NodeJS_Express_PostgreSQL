const express = require('express');
const { getProducts, createProduct } = require('../controllers/products');

// Model
const Product = require('../models/product');

// Include other resources
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/')
  .get(advancedResults(Product), getProducts)
  .post(createProduct);


module.exports = router;