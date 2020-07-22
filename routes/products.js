const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  productPhotoUpload
} = require('../controllers/products');

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
  .get(getProduct)
  .delete(protect, authorize('publisher', 'admin'), deleteProduct)
  .put(protect, authorize('publisher', 'admin'), updateProduct);

router.route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), productPhotoUpload);

module.exports = router;