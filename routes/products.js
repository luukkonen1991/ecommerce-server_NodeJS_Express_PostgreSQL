const express = require('express');
const { createProduct } = require('../controllers/products');


const router = express.Router();

router.route('/')
  .post(createProduct);


module.exports = router;